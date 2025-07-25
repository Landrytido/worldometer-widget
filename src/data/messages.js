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
    "🌍 On s'entasse comme des sardines... Claustrophobe ?",
    "🌍 Plus on est de fous, moins il y a de riz",
    "🌍 Population = explosion, ton stress aussi ?",
    "🌍 Trop d'humains, pas assez de planète",
    "🌍 Le grand zoo humain s'agrandit",
    "🌍 Plus de monde = moins de place pour tes rêves",
    "🌍 Fourmilière humaine en expansion",
    "🌍 Bienvenue dans le grand embouteillage de la vie",
    "🌍 File d'attente mondiale qui s'allonge",
    "🌍 Plus de clients pour le même service planète",
    "🌍 Embouteillage permanent sur Terre.exe",
    "🌍 Battle royale grandeur nature",
    "🌍 Beaucoup de monde... Chacun cherche sa place",
    "🌍 Milliards d'humains, milliards d'histoires",
    "🌍 Plus de monde, moins de place de parking",
    "🌍 La planète devient populaire",
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
    "👶 Bienvenue en enfer les petits ! Bonne chance...",
    "🍼 Nouveaux joueurs dans ce chaos organisé",
    "👶 Innocents qui ne savent pas ce qui les attend",
    "🍼 Fresh meat pour la machine du monde",
    "👶 Ils arrivent sans mode d'emploi... RIP parents",
    "🍼 Nouveaux contributeurs aux statistiques de décès",
    "👶 L'espoir incarné... avant la réalité",
    "🍼 Plus de concurrence pour les ressources !",
    "👶 Nouveaux joueurs qui découvrent les règles",
    "🍼 Ils arrivent sans savoir ce qui les attend",
    "👶 Welcome dans l'aventure de la vie",
    "🍼 Nouveaux humains, nouveaux défis",
    "👶 Ils vont découvrir les embouteillages",
    "👶 Plus de concurrence pour les bonnes places",
    "🍼 Nouveaux clients pour McDonald's",
    "👶 Nouveaux explorateurs de la vie",
    "🍼 Ils vont poser plein de questions",
    "👶 Futurs rêveurs et bâtisseurs",
    "🍼 Plot twist : ils vont découvrir les lundis",
    "👶 Fresh victims pour la machine à stress",
    "🍼 Ils ignorent encore le prix de l'essence",
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
    "💀 Tic-tac, ton chrono tourne aussi... Profite bien !",
    "⚰️ Ils partent, toi tu restes. Lucky you !",
    "💀 La Grande Faucheuse ne chôme jamais... A ton tour quand ?",
    "⚱️ Merci la vie de m'avoir épargné... pour l'instant",
    "💀 Statistiquement parlant, tu es en sursis",
    "⚰️ Ils ont fini leurs problèmes... toi tu commences !",
    "💀 Memento mori : rappel que tout finit",
    "⚱️ Game over pour eux, continue ton level !",
    "💀 Ils ont fini leurs soucis... Pas toi !",
    "⚰️ Eux c'est fini, toi ça continue",
    "💀 Ils se reposent enfin... Profite de ta forme",
    "⚱️ Game over pour eux, continue à jouer",
    "💀 Ils ont trouvé la paix... Toi, trouve la joie",
    "⚰️ Vacances éternelles accordées",
    "💀 Ils ont trouvé la sortie avant toi... Jaloux ?",
    "⚰️ Libération définitive du lundi matin",
    "💀 Exit stage left pour ces chanceux",
    "⚱️ Ils ont rage quit la partie... Compréhensible",
    "💀 Plus besoin de payer d'impôts, les veinards",
    "⚰️ Places libérées... Qui veut postuler ?",
    "💀 Moins de queue au supermarché",
    "⚱️ Parking gratuit quelque part",
    "💀 Leur histoire est finie, la tienne continue",
    "⚰️ Ils ont vécu, à toi de bien vivre",
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
    "📈 Croissance plus rapide que tes économies",
    "🚀 Population en mode turbo",
    "📈 Multiplication humaine en cours...",
    "⚡ Boom démographique = moins de Wi-Fi pour tous",
    "📈 Plus vite que la livraison Amazon",
    "🚀 Expansion style Big Bang version humaine",
    "📈 Courbe exponentielle qui fait peur aux maths",
  ],
};

const COUNTRY_MESSAGES = {
  JP: {
    population: "🇯🇵 Qualité over quantité... enfin presque !",
    deaths: "🇯🇵 Zen jusqu'au bout... littéralement",
    births: "🇯🇵 Nouveaux ninjas en formation",
  },
  DE: {
    population: "🇩🇪 Efficacité allemande... sauf en démographie",
    births: "🇩🇪 Nouveaux ingénieurs en formation !",
    deaths: "🇩🇪 Ponctualité respectée même pour partir",
  },
  IN: {
    population: "🇮🇳 Champion du monde démographique !",
    growth: "🇮🇳 Bollywood ne manquera jamais d'acteurs !",
    births: "🇮🇳 Futurs génies IT en route",
  },
  US: {
    population: "🇺🇸 American Dream... partagé par beaucoup !",
    births: "🇺🇸 Futurs entrepreneurs en route !",
    deaths: "🇺🇸 Ils ont vécu le rêve américain jusqu'au bout",
  },
  FR: {
    population: "🇫🇷 L'art de vivre à la française se démocratise",
    births: "🇫🇷 Futurs critiques gastronomiques",
    deaths: "🇫🇷 Ils ont fini leur fromage... et leur vie",
  },
  BR: {
    population: "🇧🇷 Carnaval permanent avec tout ce monde",
    births: "🇧🇷 Nouveaux danseurs de samba",
    growth: "🇧🇷 Plus explosive que leurs feux d'artifice",
  },
  CN: {
    population: "🇨🇳 Fabrication en série... d'humains aussi",
    births: "🇨🇳 Made in China, version bébé",
    growth: "🇨🇳 Croissance plus rapide que leur économie",
  },
  AU: {
    population: "🇦🇺 Même les kangourous sont jaloux de ce nombre",
    births: "🇦🇺 Nouveaux aventuriers du bout du monde",
  },
  CM: {
    population: "🇨🇲 Lions indomptables en multiplication",
    births: "🇨🇲 Futurs champions en herbe",
  },
  BE: {
    population: "🇧🇪 Plus dense que leurs gaufres",
    births: "🇧🇪 Nouveaux amateurs de chocolat",
  },
};

export const getRandomMessage = (metricType, countryCode = "world") => {
  const countrySpecific = COUNTRY_MESSAGES[countryCode]?.[metricType];
  if (countrySpecific) return countrySpecific;

  const messages = MESSAGES[metricType] || MESSAGES.population;
  return messages[Math.floor(Math.random() * messages.length)];
};
