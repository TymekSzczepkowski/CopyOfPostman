import React from "react";
import style from "./About.module.css";

function About() {
  return (
    <div className={style.container}>
      <div className={style.infoContainer}>
        <h1>Bogaty intersejf chmurowy</h1>
        <h2>Temat projektu: Kopia postmana</h2>
        <div>
          <h3>Członkowie zespołu:</h3>
          <p>Tymoteusz Szczepkowski</p>
        </div>
      </div>
    </div>
  );
}

export default About;
