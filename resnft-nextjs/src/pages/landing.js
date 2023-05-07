import React from "react";
import Link from "next/link";

const Landing = () => {
  return (
    <div className="Landing-wrapper">
      <div>
        <img src="../Logo.png" alt="logo" className="Landing-logo"/>
      </div>
      <div className="Landing-content">
        <img src="../Plate.png" className="Landing-plate"/>
        <p>Where reservations become collectable</p>
        <button className="Landing-Button">
          <Link href="/">ENTER</Link>
        </button>
      </div>
    </div>
  );
};

export default Landing;
