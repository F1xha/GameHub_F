// src/data/juegos.js
// Dataset de juegos reales: info técnica + campos útiles para UI.
// Imágenes: temáticas (Unsplash). Enlaces de tienda: coloca los tuyos si quieres.

const juegos = [
  {
    id: "the-witcher-3",
    title: "The Witcher 3: Wild Hunt",
    developer: "CD Projekt Red",
    publisher: "CD Projekt",
    releaseDate: "2015-05-19",
    genre: ["RPG", "Mundo Abierto"],
    platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X|S", "Switch"],
    rating: 4.9,
    metascore: 93,
    esrb: "M (Mature)",
    price: 39.99,
    tags: ["Historia", "Exploración", "Fantasía"],
    description:
      "RPG de mundo abierto basado en la saga de Geralt de Rivia. Narrativa profunda, contratos de brujo, decisiones con consecuencias.",
    requirements: {
      minimum:
        "CPU: i5-2500K / FX-6300 • RAM: 6 GB • GPU: GTX 660 / HD 7870 • Almacenamiento: 50 GB",
      recommended:
        "CPU: i7-3770 / FX-8350 • RAM: 8 GB • GPU: GTX 770 / R9 290 • Almacenamiento: 50 GB"
    },
    store: {
      steam: "#",
      gog: "#",
      playstation: "#",
      xbox: "#",
      switch: "#"
    },
    images: {
      cover:
        "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&auto=format&fit=crop&q=60",
      screenshots: [
        "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=1200&q=60",
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=60"
      ]
    }
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    developer: "FromSoftware",
    publisher: "Bandai Namco",
    releaseDate: "2022-02-25",
    genre: ["Action RPG", "Mundo Abierto"],
    platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X|S"],
    rating: 4.8,
    metascore: 96,
    esrb: "M (Mature)",
    price: 59.99,
    tags: ["Soulslike", "Exploración", "Jefes"],
    description:
      "La fórmula souls en un mundo abierto. Libertad de exploración, construcción de builds y combates desafiantes.",
    requirements: {
      minimum:
        "CPU: i5-8400 / R5 3300X • RAM: 12 GB • GPU: GTX 1060 3GB / RX 580 • Almacenamiento: 60 GB",
      recommended:
        "CPU: i7-8700K / R5 3600X • RAM: 16 GB • GPU: GTX 1070 8GB / RX Vega 56 • Almacenamiento: 60 GB"
    },
    store: { steam: "#", playstation: "#", xbox: "#" },
    images: {
      cover:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=60",
      screenshots: [
        "https://images.unsplash.com/photo-1606813902912-31a7b97b8f8a?w=1200&q=60"
      ]
    }
  },
  {
    id: "god-of-war-2018",
    title: "God of War (2018)",
    developer: "Santa Monica Studio",
    publisher: "Sony Interactive Entertainment",
    releaseDate: "2018-04-20",
    genre: ["Acción", "Aventura"],
    platforms: ["PS4", "PS5", "PC"],
    rating: 4.9,
    metascore: 94,
    esrb: "M (Mature)",
    price: 49.99,
    tags: ["Narrativa", "Cámara al hombro", "Mitología"],
    description:
      "Reinvención de la saga con enfoque en narrativa padre-hijo y combate táctico. Ambientado en la mitología nórdica.",
    requirements: {
      minimum: "CPU: i5-2500K • RAM: 8 GB • GPU: GTX 960 • Almacenamiento: 70 GB",
      recommended:
        "CPU: i7-4770K • RAM: 16 GB • GPU: GTX 1060 / RX 570 • Almacenamiento: 70 GB"
    },
    store: { steam: "#", playstation: "#" },
    images: {
      cover:
        "https://images.unsplash.com/photo-1520242739010-44e95bde3292?w=1200&q=60",
      screenshots: [
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=60"
      ]
    }
  },
  {
    id: "red-dead-redemption-2",
    title: "Red Dead Redemption 2",
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    releaseDate: "2018-10-26",
    genre: ["Acción", "Aventura", "Mundo Abierto"],
    platforms: ["PC", "PS4", "Xbox One"],
    rating: 4.9,
    metascore: 97,
    esrb: "M (Mature)",
    price: 59.99,
    tags: ["Western", "Narrativa", "Sandbox"],
    description:
      "Épica historia en el ocaso del Viejo Oeste. Detalle técnico sobresaliente y mundo vivo inmersivo.",
    requirements: {
      minimum:
        "CPU: i5-2500K • RAM: 8 GB • GPU: GTX 770 2GB • Almacenamiento: 150 GB",
      recommended:
        "CPU: i7-4770K • RAM: 12-16 GB • GPU: GTX 1060 6GB • Almacenamiento: 150 GB"
    },
    store: { steam: "#", rockstar: "#", xbox: "#", playstation: "#" },
    images: {
      cover:
        "https://images.unsplash.com/photo-1520975922284-4bbf4e3eb1d6?w=1200&q=60",
      screenshots: [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=60"
      ]
    }
  },
  {
    id: "hades",
    title: "Hades",
    developer: "Supergiant Games",
    publisher: "Supergiant Games",
    releaseDate: "2020-09-17",
    genre: ["Roguelike", "Acción"],
    platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X|S", "Switch"],
    rating: 4.8,
    metascore: 93,
    esrb: "T (Teen)",
    price: 24.99,
    tags: ["Roguelite", "Narrativa dinámica", "Indie"],
    description:
      "Roguelike de ritmo rápido con narración reactiva y builds variadas. Estética y música de primer nivel.",
    requirements: {
      minimum: "CPU: Dual Core • RAM: 4 GB • GPU: Intel HD 4000 • Almacenamiento: 20 GB",
      recommended: "CPU: Quad Core • RAM: 8 GB • GPU: GTX 650 • Almacenamiento: 20 GB"
    },
    store: { steam: "#", switch: "#", xbox: "#", playstation: "#" },
    images: {
      cover:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=60",
      screenshots: [
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=60"
      ]
    }
  },
  {
    id: "hollow-knight",
    title: "Hollow Knight",
    developer: "Team Cherry",
    publisher: "Team Cherry",
    releaseDate: "2017-02-24",
    genre: ["Metroidvania", "Acción"],
    platforms: ["PC", "PS4", "Xbox One", "Switch"],
    rating: 4.8,
    metascore: 90,
    esrb: "E10+ (Everyone 10+)",
    price: 14.99,
    tags: ["Plataformas", "Exploración", "Indie"],
    description:
      "Metroidvania desafiante con un mundo interconectado, jefes memorables y arte dibujado a mano.",
    requirements: {
      minimum: "CPU: Dual Core • RAM: 4 GB • GPU: Intel HD 4000 • Almacenamiento: 9 GB",
      recommended: "CPU: Quad Core • RAM: 8 GB • GPU: GTX 660 • Almacenamiento: 9 GB"
    },
    store: { steam: "#", switch: "#", xbox: "#", playstation: "#" },
    images: {
      cover:
        "https://images.unsplash.com/photo-1520975922284-4bbf4e3eb1d6?w=1200&q=60",
      screenshots: [
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=60"
      ]
    }
  },
  {
    id: "minecraft",
    title: "Minecraft",
    developer: "Mojang Studios",
    publisher: "Mojang / Microsoft",
    releaseDate: "2011-11-18",
    genre: ["Sandbox", "Supervivencia"],
    platforms: ["PC", "Consolas", "Móvil"],
    rating: 4.7,
    metascore: 93,
    esrb: "E (Everyone)",
    price: 26.95,
    tags: ["Construcción", "Creatividad", "Supervivencia"],
    description:
      "Sandbox de construcción y supervivencia procedural. Creatividad sin límites, multijugador y mods.",
    requirements: {
      minimum: "CPU: i3 • RAM: 4 GB • GPU: Intel HD 4000 • Almacenamiento: 4 GB",
      recommended: "CPU: i5 • RAM: 8 GB • GPU: GTX 660 • Almacenamiento: 4 GB"
    },
    store: { microsoft: "#", playstation: "#", switch: "#" },
    images: {
      cover:
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&q=60",
      screenshots: [
        "https://images.unsplash.com/photo-1611611155373-5de8a866c3bc?w=1200&q=60"
      ]
    }
  },
  {
    id: "fortnite",
    title: "Fortnite",
    developer: "Epic Games",
    publisher: "Epic Games",
    releaseDate: "2017-07-21",
    genre: ["Battle Royale", "Shooter"],
    platforms: ["PC", "Consolas", "Móvil"],
    rating: 4.2,
    metascore: 81,
    esrb: "T (Teen)",
    price: 0,
    tags: ["F2P", "Multijugador", "Construcción"],
    description:
      "Battle Royale free-to-play con construcción, temporadas y eventos constantes.",
    requirements: {
      minimum: "CPU: i3 • RAM: 8 GB • GPU: Intel HD 4000 • Almacenamiento: 30 GB",
      recommended: "CPU: i5 • RAM: 16 GB • GPU: GTX 960 • Almacenamiento: 30 GB"
    },
    store: { epic: "#" },
    images: {
      cover:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=60",
      screenshots: [
        "https://images.unsplash.com/photo-1580247819593-0b33831b1f59?w=1200&q=60"
      ]
    }
  },
  {
    id: "the-last-of-us-part-i",
    title: "The Last of Us Part I",
    developer: "Naughty Dog",
    publisher: "Sony Interactive Entertainment",
    releaseDate: "2013-06-14",
    genre: ["Acción", "Aventura"],
    platforms: ["PS3", "PS4 (Remastered)", "PS5", "PC"],
    rating: 4.9,
    metascore: 95,
    esrb: "M (Mature)",
    price: 69.99,
    tags: ["Narrativa", "Sigilo", "Postapocalíptico"],
    description:
      "Historia emocional en un mundo postapocalíptico. Enfoque en narrativa y relación entre protagonistas.",
    requirements: {
      minimum: "CPU: i5 • RAM: 16 GB • GPU: GTX 970 • Almacenamiento: 100 GB",
      recommended: "CPU: i7 • RAM: 16 GB • GPU: GTX 1070 • Almacenamiento: 100 GB"
    },
    store: { playstation: "#", steam: "#" },
    images: {
      cover:
        "https://images.unsplash.com/photo-1520975922284-4bbf4e3eb1d6?w=1200&q=60",
      screenshots: [
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=60"
      ]
    }
  },
  {
    id: "league-of-legends",
    title: "League of Legends",
    developer: "Riot Games",
    publisher: "Riot Games",
    releaseDate: "2009-10-27",
    genre: ["MOBA"],
    platforms: ["PC"],
    rating: 4.1,
    metascore: 78,
    esrb: "T (Teen)",
    price: 0,
    tags: ["Competitivo", "F2P", "eSports"],
    description:
      "MOBA 5v5 con más de 160 campeones, escena competitiva global y actualizaciones constantes.",
    requirements: {
      minimum: "CPU: Dual Core • RAM: 4 GB • GPU: integrada • Almacenamiento: 16 GB",
      recommended: "CPU: Quad Core • RAM: 8 GB • GPU: dedicada básica • Almacenamiento: 16 GB"
    },
    store: { riot: "#" },
    images: {
      cover:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=60",
      screenshots: [
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=60"
      ]
    }
  }
];

export default juegos;
