"use client";

import { useEffect, useRef } from "react";

const CELL = 60;
const RADIUS = 80;
const LERP = 0.08;
const FADE_OUT = 0.12;
const TRAIL_MAX = 12;
const TRAIL_MS = 300;

type TrailPt = { x: number; y: number; t: number };

export default function HeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const OFF = RADIUS * 5;
    let rawX = -OFF, rawY = -OFF;
    let smoothX = -OFF, smoothY = -OFF;
    let glowTarget = 0, glowCurrent = 0;
    let raf: number;
    let lastThrottle = 0;
    const trail: TrailPt[] = [];

    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      W = canvas.width = p.offsetWidth;
      H = canvas.height = p.offsetHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastThrottle < 16) return;
      lastThrottle = now;
      const rect = canvas.getBoundingClientRect();
      rawX = e.clientX - rect.left;
      rawY = e.clientY - rect.top;
      glowTarget = 1;
      trail.push({ x: rawX, y: rawY, t: now });
      if (trail.length > TRAIL_MAX) trail.shift();
    };

    const onMouseLeave = () => { glowTarget = 0; };

    const drawGlowSegment = (
      x1: number, y1: number,
      x2: number, y2: number,
      peak: number
    ) => {
      const p = peak.toFixed(3);
      const p5 = (peak * 0.5).toFixed(3);

      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(0.25, `rgba(108,99,255,${p5})`);
      grad.addColorStop(0.5, `rgba(255,255,255,${p})`);
      grad.addColorStop(0.75, `rgba(108,99,255,${p5})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");

      ctx.shadowBlur = 22 * peak;
      ctx.shadowColor = `rgba(108,99,255,${p})`;
      ctx.strokeStyle = grad;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      const core = ctx.createLinearGradient(x1, y1, x2, y2);
      const pc = (peak * 0.95).toFixed(3);
      const pm = (peak * 0.65).toFixed(3);
      core.addColorStop(0, "rgba(0,0,0,0)");
      core.addColorStop(0.3, `rgba(180,170,255,${pm})`);
      core.addColorStop(0.5, `rgba(255,255,255,${pc})`);
      core.addColorStop(0.7, `rgba(180,170,255,${pm})`);
      core.addColorStop(1, "rgba(0,0,0,0)");

      ctx.shadowBlur = 8 * peak;
      ctx.shadowColor = "#9B97FF";
      ctx.strokeStyle = core;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const glowAt = (cx: number, cy: number, alphaMul: number) => {
      for (let x = 0; x <= W; x += CELL) {
        const pd = Math.abs(cx - x);
        if (pd >= RADIUS) continue;
        const peak = (1 - pd / RADIUS) * alphaMul;
        if (peak < 0.008) continue;
        const spread = Math.sqrt(RADIUS * RADIUS - pd * pd);
        const y1 = Math.max(0, cy - spread);
        const y2 = Math.min(H, cy + spread);
        if (y2 - y1 < 1) continue;
        drawGlowSegment(x + 0.5, y1, x + 0.5, y2, peak);
      }
      for (let y = 0; y <= H; y += CELL) {
        const pd = Math.abs(cy - y);
        if (pd >= RADIUS) continue;
        const peak = (1 - pd / RADIUS) * alphaMul;
        if (peak < 0.008) continue;
        const spread = Math.sqrt(RADIUS * RADIUS - pd * pd);
        const x1 = Math.max(0, cx - spread);
        const x2 = Math.min(W, cx + spread);
        if (x2 - x1 < 1) continue;
        drawGlowSegment(x1, y + 0.5, x2, y + 0.5, peak);
      }
    };

    const draw = () => {
      const now = performance.now();

      smoothX += (rawX - smoothX) * LERP;
      smoothY += (rawY - smoothY) * LERP;
      const lf = glowTarget > glowCurrent ? LERP : FADE_OUT;
      glowCurrent += (glowTarget - glowCurrent) * lf;

      // Prune expired trail entries
      while (trail.length > 0 && now - trail[0].t > TRAIL_MS) trail.shift();

      ctx.clearRect(0, 0, W, H);

      // Base grid
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(108,99,255,0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= W; x += CELL) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, H);
      }
      for (let y = 0; y <= H; y += CELL) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(W, y + 0.5);
      }
      ctx.stroke();

      if (glowCurrent > 0.005 || trail.length > 0) {
        ctx.globalCompositeOperation = "screen";

        // Trail — oldest first so newest renders on top
        for (let i = 0; i < trail.length; i++) {
          const { x: tx, y: ty, t } = trail[i];
          const age = now - t;
          const ageFactor = Math.max(0, 1 - age / TRAIL_MS);
          const trailAlpha = 0.6 * ageFactor * glowCurrent;
          if (trailAlpha < 0.008) continue;
          glowAt(tx, ty, trailAlpha);
        }

        // Current cursor glow
        if (glowCurrent > 0.005) {
          glowAt(smoothX, smoothY, glowCurrent);
        }

        ctx.globalCompositeOperation = "source-over";
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    };

    const parent = canvas.parentElement!;
    parent.addEventListener("mousemove", onMouseMove);
    parent.addEventListener("mouseleave", onMouseLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("mousemove", onMouseMove);
      parent.removeEventListener("mouseleave", onMouseLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at center, transparent 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.95) 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
