import React from "react";

function GameCard({ title, img, link }) {
  return (
    <div className="hover-zoom">
      <h3>{title}</h3>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={img} alt={title} width="180" height="250" />
      </a>
    </div>
  );
}

export default GameCard;
