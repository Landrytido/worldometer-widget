// src/data/enhancedMessages.js
export const ENHANCED_MESSAGES = {
  population: {
    motivant: [
      "🎉 Plus nous sommes, plus c'est... compliqué !",
      "🚀 L'humanité grandit, ton ambition aussi j'espère !",
      "⚡ Population en hausse, productivité en vue ?",
      "🌟 Chaque seconde compte... littéralement !",
      "🎯 La planète se remplit, ta journée aussi ?",
    ],
    flippant: [
      "😱 On s'entasse de plus en plus... claustrophobe ?",
      "🌍 Plus de monde = moins de place pour procrastiner !",
      "⚠️ Population explosive... comme ta to-do list ?",
      "🎪 Le grand cirque humain s'agrandit !",
      "🔥 Surpopulation en cours... stress en bonus !",
    ],
    absurde: [
      "🤹 Plus d'humains pour ne pas comprendre tes blagues",
      "🎭 Nouveaux spectateurs pour tes fails quotidiens",
      "🎨 Plus de cerveaux, même résultats... logique !",
      "🎲 Population ++, chances de succès... variables",
      "🎵 Concert planétaire à guichets fermés !",
    ],
    philosophique: [
      "🤔 Tous ces humains... pour quoi faire au final ?",
      "💭 Fourmilière géante ou société évoluée ?",
      "🌊 Nous coulons ou nous nageons ensemble ?",
      "⚖️ Plus nombreux = plus sages... vraiment ?",
      "🔮 L'avenir appartient-il aux plus nombreux ?",
    ],
  },

  births: {
    motivant: [
      "👶 Bienvenue dans ce monde merveilleux... ou pas !",
      "🎈 Nouveaux arrivants pleins d'espoir !",
      "✨ Fraîche innocence vs réalité brutale !",
      "🌅 Nouveaux défis pour nouvelles générations !",
      "🎁 Cadeaux de la vie qui déballent la réalité !",
    ],
    flippant: [
      "👶 Nouvelles âmes courageuses... ou inconscientes ?",
      "⚡ Ils arrivent... sans manuel d'utilisation !",
      "🌪️ Tempête de couches et de pleurs en approche !",
      "💥 Population bomb : mission accomplie !",
      "🎯 Nouveaux joueurs dans la partie... bonne chance !",
    ],
    absurde: [
      "👶 Ah, de nouveaux collègues pour l'open space !",
      "🎪 Recrues fraîches pour le cirque quotidien !",
      "🎮 Nouveaux avatars dans le jeu de la vie !",
      "🎭 Futurs acteurs du théâtre de l'absurde !",
      "🎨 Toiles vierges prêtes pour les gribouillis !",
    ],
    philosophique: [
      "👶 Espoir incarné ou problème supplémentaire ?",
      "💫 Nouvelles étoiles dans notre constellation ?",
      "🌱 Graines d'avenir ou mauvaises herbes ?",
      "🔄 Le cycle éternel continue... pourquoi ?",
      "⚗️ Nouveaux ingrédients dans la recette humaine",
    ],
  },

  deaths: {
    motivant: [
      "💀 C'est le cycle de la vie, comme dit Simba",
      "⏰ Le temps presse, alors fonce !",
      "🚀 Motivation ultime : carpe diem !",
      "💪 Chaque seconde compte, littéralement !",
      "🎯 L'urgence de vivre enfin comprise ?",
    ],
    flippant: [
      "💀 Statistiquement, ton tour approche...",
      "⚰️ La faucheuse ne chôme jamais !",
      "🎰 Roulette de la mortalité en action !",
      "⏳ Sablier cosmique qui s'écoule...",
      "🎭 Rideau final pour certains spectateurs",
    ],
    absurde: [
      "💀 Libération du stress quotidien... définitive !",
      "🎪 Sortie VIP du grand spectacle !",
      "🎮 Game Over pour quelques joueurs",
      "🎭 Changement de décor... permanent !",
      "🚪 Nouvelle porte... sans retour possible",
    ],
    philosophique: [
      "💀 Fin naturelle ou cruel hasard ?",
      "🌌 Retour aux étoiles d'où nous venons ?",
      "⚖️ Justice cosmique ou chaos absolu ?",
      "🔚 Point final d'une phrase inachevée ?",
      "🌊 Gouttes qui retournent à l'océan",
    ],
  },

  growth: {
    motivant: [
      "📈 La population explose... littéralement !",
      "🚀 Croissance exponentielle vs ta productivité ?",
      "⚡ Monde en expansion, ambitions aussi !",
      "🎯 Dynamisme planétaire contagieux ?",
      "🌟 Élan vital collectif... inspirant !",
    ],
    flippant: [
      "📈 Boom démographique = boom des problèmes !",
      "💥 Expansion incontrôlée... ça vous rappelle rien ?",
      "🌋 Pression démographique... explosive !",
      "⚠️ Croissance = stress garanti !",
      "🎢 Montagnes russes démographiques !",
    ],
    absurde: [
      "📈 Plus vite que tes projets personnels !",
      "🎪 Croissance du public pour ton one-man-show !",
      "🎮 Level up permanent de l'humanité !",
      "🎭 Distribution qui s'étoffe dans cette comédie !",
      "🎨 Tableau qui déborde du cadre !",
    ],
    philosophique: [
      "📈 Progrès ou prolifération incontrôlée ?",
      "🌊 Marée humaine... vers quel rivage ?",
      "⚗️ Expansion ou dilution de l'essence ?",
      "🔮 Croissance durable ou bulle fragile ?",
      "🌱 Bourgeonnement d'espoir ou de chaos ?",
    ],
  },
};

/**
 * Sélectionne un message aléatoire selon la métrique et l'heure
 */
export const getRandomMessage = (metricType, forceCategory = null) => {
  const messages = ENHANCED_MESSAGES[metricType];
  if (!messages) return "🤔 Message en cours de génération...";

  // Déterminer la catégorie selon l'heure si pas forcée
  let category = forceCategory;
  if (!category) {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      category = "motivant"; // Matin = motivation
    } else if (hour >= 12 && hour < 17) {
      category = "philosophique"; // Après-midi = réflexion
    } else if (hour >= 17 && hour < 22) {
      category = "absurde"; // Soirée = absurde
    } else {
      category = "flippant"; // Nuit = flippant
    }
  }

  const categoryMessages = messages[category] || messages.motivant;
  return categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
};

/**
 * Messages contextuels selon le pays
 */
export const getCountrySpecificMessage = (countryCode, metricType) => {
  const countryMessages = {
    JP: {
      // Japon
      population: "🇯🇵 Qualité over quantité... enfin presque !",
      deaths: "🇯🇵 Zen jusqu'au bout... littéralement",
    },
    DE: {
      // Allemagne
      population: "🇩🇪 Efficacité allemande... sauf en démographie",
      births: "🇩🇪 Nouveaux ingénieurs en formation !",
    },
    IN: {
      // Inde
      population: "🇮🇳 Champion du monde démographique !",
      growth: "🇮🇳 Bollywood ne manquera jamais d'acteurs !",
    },
    US: {
      // États-Unis
      population: "🇺🇸 American Dream... partagé par beaucoup !",
      births: "🇺🇸 Futurs entrepreneurs en route !",
    },
  };

  const specific = countryMessages[countryCode]?.[metricType];
  return specific || getRandomMessage(metricType);
};
