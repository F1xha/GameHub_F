import React from "react";
import Header from "./Header";
import GameCard from "./GameCard";
import Footer from "./Footer";

function Home() {
  const games = [
    {
      title: "Tekken",
      img: "https://image.api.playstation.com/vulcan/ap/rnd/202308/0312/aff71a0ced271048f5079b1fcf715bcb45110efc13e9704a.png",
      link: "https://es.wikipedia.org/wiki/Tekken_8",
    },
    {
      title: "Street Fighter",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeyOfcPBLG6o8dgLt_JEL-i_lvykSaxYOTcw&s",
      link: "https://es.wikipedia.org/wiki/Street_Fighter",
    },
    {
      title: "Mortal Kombat",
      img: "https://play-lh.googleusercontent.com/LSNV5P_C6MafT84ioYM4OykRJkxRAz7roKXZ6Ljc2ApRGUYSgBcp3OxQjfyM4W1RePPy=w240-h480-rw",
      link: "https://es.wikipedia.org/wiki/Mortal_Kombat_X",
    },
    {
      title: "Killer Instinct",
      img: "https://store-images.s-microsoft.com/image/apps.59918.13510798887625866.582890ba-d9f1-46b3-90f9-4659bfd891e3.e2b2c939-5071-4826-a9d5-0f85cf276e18",
      link: "https://es.wikipedia.org/wiki/Killer_Instinct_(videojuego_de_2013)",
    },
    {
      title: "King of Fighters",
      img: "https://upload.wikimedia.org/wikipedia/en/2/23/The_King_of_Fighters_%2797_arcade_flyer.jpg",
      link: "https://es.wikipedia.org/wiki/The_King_of_Fighters",
    },
    {
      title: "DB_SparkingZero",
      img: "https://i.blogs.es/ebe21a/dragon-ball-sparking-zero-ps5-xbox-pc/375_375.webp",
      link: "https://es.wikipedia.org/wiki/Dragon_Ball:_Sparking!_Zero",
    },
    {
      title: "Samurai Shodown",
      img: "https://chilejuegosdigitales.cl/cdn/shop/products/SAMURAI_SHODOWN.jpg?v=1603241042",
      link: "https://es.wikipedia.org/wiki/Samurai_Shodown",
    },
  ];

  return (
    <div className="Home">
      <Header />

      <div className="logo">
        <img src="logo192.png" alt="Logo del sitio web" width="100" height="100" />
      </div>

      <section className="titulo">
        {games.map((game) => (
          <GameCard key={game.title} {...game} />
        ))}
      </section>

      <Footer />
    </div>
  );
}

export default Home;
