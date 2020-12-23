import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import Gallery from "./Gallery";
import ItemSummary from "./ItemSummary";
import "../stylesheets/App.scss";

export default function App(_props) {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/gallery" />
        </Route>
        <Route exact path="/gallery">
          <Gallery />
        </Route>
        <Route path="/item">
          <ItemSummary />
        </Route>
      </Switch>
    </>
  );
}
