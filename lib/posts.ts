export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  isoDate: string;
  readingTime: number;
  excerpt: string;
  image: string;
  imageAlt: string;
  gradient: string;
  accentColor: string;
  blocks: ContentBlock[];
}

function calcReadingTime(blocks: ContentBlock[]): number {
  const words = blocks.reduce((acc, block) => {
    if (block.type === "p" || block.type === "h2" || block.type === "h3") {
      return acc + block.text.split(/\s+/).length;
    }
    if (block.type === "ul") {
      return acc + block.items.join(" ").split(/\s+/).length;
    }
    return acc;
  }, 0);
  return Math.max(1, Math.ceil(words / 200));
}

const article1Blocks: ContentBlock[] = [
  {
    type: "p",
    text: "En 2026, votre site web est votre commercial le plus actif — ou votre plus grand frein. Un site lent, mal conçu ou non adapté au mobile ne se contente pas de ne pas convaincre : il fait activement fuir vos prospects avant même qu'ils aient lu votre offre. Voici pourquoi, et comment y remédier.",
  },
  { type: "h2", text: "Un site lent, c'est des clients perdus à la milliseconde" },
  {
    type: "p",
    text: "La patience des internautes n'a jamais été aussi faible. Selon les données de Google, 53 % des visiteurs quittent un site mobile qui prend plus de 3 secondes à charger. Au-delà de 5 secondes, le taux de rebond grimpe de 90 %. Chaque seconde de délai supplémentaire se traduit par une baisse de 7 % du taux de conversion.",
  },
  {
    type: "p",
    text: "Si votre site est hébergé sur un serveur bon marché, construit avec un thème WordPress chargé de plugins, ou que ses images ne sont pas optimisées, vous êtes probablement dans cette situation. Un score PageSpeed inférieur à 80 est aujourd'hui synonyme de positions Google en chute libre — et de clients que vous perdez sans jamais le savoir.",
  },
  { type: "h2", text: "Un design daté, un signal de méfiance immédiat" },
  {
    type: "p",
    text: "Le design a une durée de vie. Ce qui semblait moderne en 2018 paraît aujourd'hui vieillissant, et vos visiteurs le ressentent en moins de 50 millisecondes. C'est le temps qu'il leur faut pour décider si votre site inspire confiance — ou non.",
  },
  {
    type: "p",
    text: "Un design daté envoie un message implicite à vos prospects : cette entreprise ne se soucie pas des détails, ou n'a pas évolué depuis plusieurs années. Pour un prestataire de services, un consultant ou une PME locale, c'est particulièrement dommageable : votre site est souvent le premier — et parfois le seul — point de contact avant une prise de décision.",
  },
  { type: "h3", text: "Les signaux qui trahissent un site vieillissant" },
  {
    type: "ul",
    items: [
      "Polices et couleurs qui datent des années 2010",
      "Images basse résolution ou visuellement génériques",
      "Menus hamburger inutilisables sur mobile",
      "Copyright affiché avec une année dépassée",
      "Formulaires de contact sans confirmation ni design soigné",
    ],
  },
  { type: "h2", text: "Mobile : toujours pas une priorité pour beaucoup" },
  {
    type: "p",
    text: "En 2026, plus de 65 % du trafic web est généré depuis un smartphone. Pourtant, une grande partie des sites d'entreprises locales ne sont pas vraiment optimisés pour le mobile. Ils s'affichent sur téléphone — certes — mais l'expérience est médiocre : textes minuscules, boutons trop rapprochés, images recadrées.",
  },
  {
    type: "p",
    text: "Google indexe désormais votre site en priorité dans sa version mobile (Mobile-First Indexing). Un site dont l'expérience mobile est mauvaise perd des positions sur Google, et donc des visiteurs organiques — souvent sans que le propriétaire comprenne pourquoi son trafic baisse.",
  },
  { type: "h2", text: "Quand envisager une refonte de site web ?" },
  {
    type: "p",
    text: "La refonte de site web n'est pas réservée aux grandes entreprises. C'est une décision stratégique qui se justifie dès que votre site ne génère plus de leads, que votre positionnement Google stagne, ou que votre offre a évolué sans que votre vitrine en ligne suive.",
  },
  {
    type: "p",
    text: "Les signaux d'alarme les plus clairs sont les suivants :",
  },
  {
    type: "ul",
    items: [
      "Taux de rebond supérieur à 70 % sur Google Analytics",
      "Temps de chargement supérieur à 3 secondes mesuré sur PageSpeed",
      "Design inchangé depuis plus de 3 ans",
      "Concurrents avec un site manifestement plus moderne",
      "Aucune position dans le top 10 Google sur vos mots-clés cibles",
    ],
  },
  { type: "h2", text: "Développeur web freelance à Rennes : l'avantage du sur-mesure" },
  {
    type: "p",
    text: "Faire appel à un développeur web freelance à Rennes pour votre refonte présente des avantages concrets : un interlocuteur unique qui connaît votre projet de bout en bout, une communication directe sans passer par des chefs de projet intermédiaires, et un suivi personnalisé de la conception à la mise en ligne.",
  },
  {
    type: "p",
    text: "Contrairement à une agence web classique où votre projet peut être délégué à un profil junior, un développeur freelance s'implique personnellement sur chaque décision — du choix des animations au SEO technique, en passant par l'architecture des pages.",
  },
  { type: "h2", text: "Ce que doit faire un site web professionnel en 2026" },
  {
    type: "p",
    text: "Un site web professionnel doit aujourd'hui répondre à trois critères non négociables : la performance (score PageSpeed supérieur à 90, chargement en moins de 2 secondes), l'expérience mobile (navigation fluide, lisibilité parfaite sur tous les formats d'écran), et la conversion (un parcours utilisateur clair qui guide le visiteur vers une action concrète : appel, formulaire, achat).",
  },
  {
    type: "p",
    text: "Si votre site actuel ne remplit pas ces critères, chaque jour est une opportunité manquée. Une refonte de site web bien exécutée par un développeur web expérimenté peut transformer une vitrine obsolète en un véritable outil commercial — visible sur Google, crédible au premier regard, et conçu pour convertir.",
  },
];

const article2Blocks: ContentBlock[] = [
  {
    type: "p",
    text: "Depuis 2024, une nouvelle façon de chercher de l'information s'est imposée : directement dans les IA. ChatGPT, Gemini, Perplexity, Claude — ces outils répondent désormais aux questions de milliers d'utilisateurs chaque jour, en citant des sources précises. Si votre site n'est pas optimisé pour ces nouveaux moteurs, vous êtes invisible là où une partie de votre audience cherche. C'est exactement ce que corrige le GEO.",
  },
  { type: "h2", text: "Qu'est-ce que le GEO ?" },
  {
    type: "p",
    text: "Le GEO — Generative Engine Optimization — est l'ensemble des pratiques d'optimisation qui permettent à un site web d'être cité et recommandé par les intelligences artificielles génératives. À la différence du SEO classique, dont l'objectif est de remonter dans les résultats de recherche de Google, le GEO vise à être mentionné directement dans les réponses générées par des IA comme ChatGPT, Gemini ou Perplexity.",
  },
  {
    type: "p",
    text: "Concrètement : quand un utilisateur demande à ChatGPT \"quel développeur web recommandes-tu à Rennes ?\", ou à Perplexity \"quelle est la meilleure agence SEO dans ma ville ?\", les IA s'appuient sur les contenus qu'elles ont indexés et jugés fiables pour formuler leur réponse. Le GEO consiste à faire en sorte que votre site fasse partie de ces sources citées.",
  },
  { type: "h2", text: "Pourquoi le GEO est devenu essentiel en 2026" },
  {
    type: "p",
    text: "En 2025, ChatGPT a dépassé 200 millions d'utilisateurs actifs hebdomadaires. Google a intégré ses propres résumés IA (AI Overviews) directement en haut des pages de résultats. Perplexity se positionne comme un moteur de recherche alternatif qui répond en citant ses sources. La façon dont les gens trouvent des informations est en train de changer structurellement.",
  },
  {
    type: "p",
    text: "Pour les entreprises locales et les prestataires de services, la conséquence est directe : si un prospect potentiel pose une question à une IA sur votre secteur d'activité, et que votre concurrent est cité mais pas vous, c'est une opportunité commerciale que vous perdez — sans même en avoir conscience.",
  },
  { type: "h3", text: "La différence fondamentale entre SEO et GEO" },
  {
    type: "ul",
    items: [
      "SEO : optimiser pour les robots d'exploration de Google afin de remonter dans les résultats",
      "GEO : optimiser pour la compréhension des modèles de langage afin d'être cité dans leurs réponses",
      "SEO : cibler des mots-clés pour apparaître dans des listes de liens",
      "GEO : créer du contenu clair, factuel et citable pour être intégré dans des réponses en langage naturel",
      "SEO et GEO sont complémentaires, pas concurrents — l'un renforce l'autre",
    ],
  },
  { type: "h2", text: "Comment fonctionnent ChatGPT, Gemini et Perplexity ?" },
  {
    type: "p",
    text: "Les IA génératives s'appuient sur deux types de données pour générer leurs réponses : leur modèle de langage (entraîné sur des corpus massifs jusqu'à une date de coupure), et pour certaines comme Perplexity et Google AI, une capacité à consulter le web en temps réel. Dans les deux cas, la qualité, la clarté et l'autorité perçue de votre contenu jouent un rôle déterminant.",
  },
  {
    type: "p",
    text: "Plus votre site est cité par d'autres sources fiables (backlinks de qualité), plus votre contenu est structuré et factuel, et plus vous répondez directement aux questions que se posent vos clients, plus vous avez de chances d'être cité dans les réponses des IA. L'optimisation IA repose sur l'expertise, l'autorité et la clarté.",
  },
  { type: "h2", text: "Les 5 piliers d'une optimisation GEO efficace" },
  {
    type: "ul",
    items: [
      "Contenu expert et citable : des articles de fond qui répondent précisément aux questions de votre secteur",
      "Données structurées Schema.org : balisages techniques qui aident les IA à comprendre votre activité et votre localisation",
      "Autorité de domaine : obtenir des mentions et des liens depuis des sites reconnus dans votre secteur",
      "Cohérence des informations NAP : même nom, adresse et numéro partout sur le web",
      "Réponses directes aux questions fréquentes : FAQ structurées, paragraphes synthétiques et précis",
    ],
  },
  { type: "h2", text: "Combien de temps pour obtenir des résultats en GEO ?" },
  {
    type: "p",
    text: "Le GEO est une stratégie de moyen terme. Les premières citations par les IA peuvent apparaître entre 4 et 12 semaines après le début des optimisations, selon la compétitivité de votre secteur et l'autorité actuelle de votre domaine. Les IA mettent à jour leurs réponses régulièrement — être patient et régulier dans la production de contenu est essentiel.",
  },
  {
    type: "p",
    text: "C'est justement pour cette raison que commencer maintenant est une opportunité : la plupart de vos concurrents n'ont pas encore entendu parler du GEO. Agir en 2026, c'est prendre 12 à 18 mois d'avance sur votre marché et être la référence citée quand les IA décrivent votre secteur.",
  },
  { type: "h2", text: "GEO et SEO : une stratégie intégrée pour 2026" },
  {
    type: "p",
    text: "Chez Studio Parallax, nous ne dissocions pas le SEO du GEO — nous les traitons comme deux dimensions d'une même stratégie de visibilité. Un bon référencement Google renforce votre autorité, qui renforce à son tour votre présence dans les réponses des IA. Et inversement : être cité par ChatGPT ou Gemini génère du trafic direct et améliore vos signaux d'autorité.",
  },
  {
    type: "p",
    text: "Optimisation pour Google, ChatGPT, Gemini et Perplexity : c'est ce que nous proposons à nos clients, avec des premiers résultats mesurables en 90 jours. Si vous souhaitez évaluer le potentiel GEO de votre site, contactez-nous pour un audit gratuit.",
  },
];

const article3Blocks: ContentBlock[] = [
  {
    type: "p",
    text: "C'est l'une des questions les plus fréquentes — et les plus légitimes — que se posent les entrepreneurs et dirigeants qui envisagent de créer ou refondre leur site. Le marché de la création web en 2026 est vaste, et les prix s'échelonnent de quelques centaines à plusieurs dizaines de milliers d'euros. Voici comment s'y retrouver.",
  },
  { type: "h2", text: "Les grandes catégories de tarifs" },
  {
    type: "p",
    text: "Avant tout, il est important de comprendre que \"site web\" recouvre des réalités très différentes. Un site vitrine de 5 pages n'a rien à voir avec une plateforme e-commerce ou une application SaaS. Voici les fourchettes de prix habituelles pour le coût création site web en 2026 :",
  },
  { type: "h3", text: "Le site vitrine basique (400–1 500€)" },
  {
    type: "p",
    text: "Sites réalisés sur des constructeurs comme Wix ou Squarespace, ou avec des thèmes WordPress génériques. Rapides à mettre en place, mais limités en personnalisation, performance et évolutivité. Adaptés aux besoins très simples, mais rarement efficaces pour générer des leads ou se démarquer de la concurrence locale.",
  },
  { type: "h3", text: "Le site sur mesure premium (1 500–5 000€)" },
  {
    type: "p",
    text: "Site conçu sur mesure, avec un design exclusif et des animations fluides, développé sur des technologies modernes comme Next.js. C'est la fourchette dans laquelle se situe la majorité des projets d'un développeur web freelance professionnel. Le résultat : un site rapide, unique, optimisé SEO, qui reflète réellement votre positionnement et génère de la confiance dès le premier regard.",
  },
  { type: "h3", text: "Les applications web et e-commerce complexes (5 000€ et plus)" },
  {
    type: "p",
    text: "Boutiques en ligne avec catalogue volumineux, plateformes SaaS, tableaux de bord sur mesure, intégrations API complexes. Ces projets mobilisent davantage de temps de développement, une architecture technique spécifique, et nécessitent souvent plusieurs développeurs ou prestataires spécialisés.",
  },
  { type: "h2", text: "Ce qui justifie le prix d'un développeur web freelance" },
  {
    type: "p",
    text: "Quand un développeur web freelance vous propose un devis à 2 000€ pour un site sur mesure, vous ne payez pas seulement des heures de code. Vous payez une expertise technique (choix de la stack, optimisation des performances, sécurité), une vision UX/design (parcours utilisateur, hiérarchie visuelle), une intégration SEO dès la conception, et un suivi post-livraison.",
  },
  {
    type: "p",
    text: "Le coût réel d'un site web ne se résume pas au tarif du prestataire. Un site mal conçu qui ne génère aucun lead, un site lent qui perd des positions sur Google, ou un site qui doit être entièrement refait 18 mois plus tard : ces coûts cachés dépassent largement la différence de tarif initial entre un bon et un mauvais prestataire.",
  },
  { type: "h2", text: "Pourquoi éviter systématiquement le moins cher ?" },
  {
    type: "p",
    text: "Le marché des sites web \"pas chers\" existe, et il est tentant. Mais dans la majorité des cas, les sites réalisés en dessous de 500€ présentent des problèmes critiques : performance médiocre (score PageSpeed inférieur à 50), code difficile à maintenir, aucune optimisation SEO, design générique impossible à différencier, et support inexistant après la livraison.",
  },
  {
    type: "p",
    text: "Le prix site web est un investissement, pas une dépense. Un site bien conçu peut générer des dizaines de milliers d'euros de chiffre d'affaires par an en attirant des clients qualifiés depuis Google. Un site bâclé, à l'inverse, nuit activement à votre crédibilité dès le premier clic.",
  },
  { type: "h2", text: "Les coûts annexes à prévoir" },
  {
    type: "p",
    text: "Au-delà du développement, plusieurs postes de coût sont à anticiper dans votre budget global :",
  },
  {
    type: "ul",
    items: [
      "Nom de domaine : 10 à 15€ par an",
      "Hébergement : 15 à 50€ par mois selon les besoins (Vercel, Netlify, VPS)",
      "Maintenance et mises à jour : prévoir 10 à 20 % du coût initial par an",
      "SEO et contenu : à partir de 200€/mois si externalisé à un professionnel",
      "Outils tiers intégrés : CRM, paiement Stripe, email transactionnel (Resend, Postmark)",
    ],
  },
  { type: "h2", text: "Freelance ou agence web : comment choisir ?" },
  {
    type: "p",
    text: "Une agence web facturera généralement entre 30 et 100 % plus cher qu'un développeur web freelance pour un résultat équivalent — voire inférieur, si votre projet est confié à un profil junior en interne. L'avantage de l'agence est la capacité à gérer des projets très importants avec plusieurs experts simultanément.",
  },
  {
    type: "p",
    text: "Pour les PME, TPE, indépendants et startups, le développeur web freelance est souvent le meilleur rapport qualité-prix : vous travaillez directement avec l'expert, sans intermédiaire, et bénéficiez d'une implication personnelle sur chaque détail de votre projet — du design initial à la mise en ligne et au-delà.",
  },
  { type: "h2", text: "Notre grille tarifaire chez Studio Parallax" },
  {
    type: "p",
    text: "Chez Studio Parallax, développeur web freelance basé à Rennes, nous proposons des sites web sur mesure à partir de 800€ et des packs incluant SEO/GEO à partir de 1 500€. Chaque devis est personnalisé selon vos besoins réels, avec une transparence totale sur les postes de coût — sans frais cachés.",
  },
  {
    type: "p",
    text: "Notre engagement : vous livrer un site qui vous fait gagner de l'argent, pas juste un site qui s'affiche. Si vous avez un projet en tête, contactez-nous pour un devis gratuit sous 48 heures. Nous analyserons votre situation et vous proposerons la solution la plus adaptée à vos objectifs et à votre budget.",
  },
];

const POSTS_DATA: Omit<Post, "readingTime">[] = [
  {
    slug: "pourquoi-site-web-fait-perdre-clients",
    title: "Pourquoi votre site web vous fait perdre des clients en 2026",
    metaTitle: "Pourquoi votre site web vous fait perdre des clients en 2026 — Studio Parallax",
    metaDescription:
      "Site lent, design daté, mauvaise expérience mobile : découvrez comment votre site actuel nuit à votre business et quand envisager une refonte. Conseils d'un développeur web freelance à Rennes.",
    date: "10 juin 2026",
    isoDate: "2026-06-10",
    excerpt:
      "Un site lent, un design daté ou une mauvaise expérience mobile ne font pas que ne pas convaincre : ils font activement fuir vos prospects. Découvrez les signaux d'alarme et quand envisager une refonte.",
    image: "/blog/blog-1.png",
    imageAlt: "Refonte site web professionnel — développeur web freelance Rennes",
    gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
    accentColor: "#4ECDC4",
    blocks: article1Blocks,
  },
  {
    slug: "geo-apparaitre-chatgpt-gemini",
    title: "GEO : comment faire apparaître votre business dans ChatGPT et Gemini",
    metaTitle: "GEO : comment apparaître dans ChatGPT, Gemini et Perplexity — Studio Parallax",
    metaDescription:
      "Le GEO (Generative Engine Optimization) est la stratégie pour être cité par les IA comme ChatGPT, Gemini et Perplexity. Découvrez comment ça fonctionne et pourquoi c'est essentiel en 2026.",
    date: "3 juin 2026",
    isoDate: "2026-06-03",
    excerpt:
      "ChatGPT, Gemini et Perplexity citent désormais des sources dans leurs réponses. Le GEO (Generative Engine Optimization) est la stratégie pour y figurer. Voici comment ça fonctionne.",
    image: "/blog/blog-2.png",
    imageAlt: "GEO optimisation IA — apparaître dans ChatGPT, Gemini et Perplexity",
    gradient: "from-[#0d0d1a] via-[#1a0a2e] to-[#2d1b69]",
    accentColor: "#9B97FF",
    blocks: article2Blocks,
  },
  {
    slug: "combien-coute-site-web-2026",
    title: "Combien coûte un site web professionnel en 2026 ?",
    metaTitle: "Prix d'un site web professionnel en 2026 — Guide complet Studio Parallax",
    metaDescription:
      "Vitrine, sur mesure, e-commerce : combien coûte vraiment un site web en 2026 ? Tarifs d'un développeur web freelance vs agence, coûts cachés et grille de prix Studio Parallax.",
    date: "25 mai 2026",
    isoDate: "2026-05-25",
    excerpt:
      "Le marché de la création web affiche des prix allant de 400€ à plusieurs dizaines de milliers d'euros. Ce guide vous aide à comprendre ce qui justifie ces tarifs et ce que vous devez budgéter.",
    image: "/blog/blog-3.png",
    imageAlt: "Prix création site web 2026 — coût développeur web freelance",
    gradient: "from-[#1a0a0a] via-[#2e1a0a] to-[#3d1f00]",
    accentColor: "#F5A623",
    blocks: article3Blocks,
  },
];

export const POSTS: Post[] = POSTS_DATA.map((post) => ({
  ...post,
  readingTime: calcReadingTime(post.blocks),
}));

export function getAllPosts(): Post[] {
  return POSTS;
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string): Post[] {
  return POSTS.filter((p) => p.slug !== currentSlug);
}
