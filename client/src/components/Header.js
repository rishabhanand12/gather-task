import React from "react";
import { Link } from "react-router-dom";

export default function Header(_props) {
  return (
    <>
      <header className="container padding">
        <nav>
          <Link to="/gallery">Gallery</Link>
          <Link to="/item">Warehouse Item Summary</Link>
        </nav>
      </header>
    </>
  );
}
