const MESSAGES = {
  population: [
    "🎉 Plus nous sommes, plus c'est... compliqué !",
    "🚀 L'humanité grandit, ton ambition aussi j'espère !",
    "😱 On s'entasse de plus en plus... claustrophobe ?",
    "🤹 Plus d'humains pour ne pas comprendre tes blagues",
    "🤔 Tous ces humains... pour quoi faire au final ?",
    "⚡ Population en hausse, productivité en vue ?",
    "🌍 Plus de monde = moins de place pour procrastiner !",
    "🎪 Le grand cirque humain s'agrandit !",
  ],

  births: [
    "👶 Bienvenue dans ce monde merveilleux... ou pas !",
    "🎈 Nouveaux arrivants pleins d'espoir !",
    "👶 Nouvelles âmes courageuses... ou inconscientes ?",
    "👶 Ah, de nouveaux collègues pour l'open space !",
    "👶 Espoir incarné ou problème supplémentaire ?",
    "✨ Fraîche innocence vs réalité brutale !",
    "⚡ Ils arrivent... sans manuel d'utilisation !",
    "🎮 Nouveaux avatars dans le jeu de la vie !",
  ],

  deaths: [
    "💀 C'est le cycle de la vie, comme dit Simba",
    "⏰ Le temps presse, alors fonce !",
    "💀 Statistiquement, ton tour approche...",
    "💀 Libération du stress quotidien... définitive !",
    "💀 Fin naturelle ou cruel hasard ?",
    "🚀 Motivation ultime : carpe diem !",
    "⚰️ La faucheuse ne chôme jamais !",
    "🎪 Sortie VIP du grand spectacle !",
  ],

  growth: [
    "📈 La population explose... littéralement !",
    "🚀 Croissance exponentielle vs ta productivité ?",
    "📈 Boom démographique = boom des problèmes !",
    "📈 Plus vite que tes projets personnels !",
    "📈 Progrès ou prolifération incontrôlée ?",
    "⚡ Monde en expansion, ambitions aussi !",
    "💥 Expansion incontrôlée... ça vous rappelle rien ?",
    "🎮 Level up permanent de l'humanité !",
  ],
};

const COUNTRY_MESSAGES = {
  JP: {
    population: "🇯🇵 Qualité over quantité... enfin presque !",
    deaths: "🇯🇵 Zen jusqu'au bout... littéralement",
  },
  DE: {
    population: "🇩🇪 Efficacité allemande... sauf en démographie",
    births: "🇩🇪 Nouveaux ingénieurs en formation !",
  },
  IN: {
    population: "🇮🇳 Champion du monde démographique !",
    growth: "🇮🇳 Bollywood ne manquera jamais d'acteurs !",
  },
  US: {
    population: "🇺🇸 American Dream... partagé par beaucoup !",
    births: "🇺🇸 Futurs entrepreneurs en route !",
  },
};

export const getRandomMessage = (metricType, countryCode = "world") => {
  const countrySpecific = COUNTRY_MESSAGES[countryCode]?.[metricType];
  if (countrySpecific) return countrySpecific;

  const messages = MESSAGES[metricType] || MESSAGES.population;
  return messages[Math.floor(Math.random() * messages.length)];
};
