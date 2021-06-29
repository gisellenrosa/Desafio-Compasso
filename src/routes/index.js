import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RepositoriesPage from "../pages/RepositoriesPage";
import StarredPage from "../pages/StarredPage";

export default function routes() {
  return (
    <div>
      <Switch>
        <Route path="/:name?" exact component={HomePage} />
        <Route path="/:name/repos" exact component={RepositoriesPage} />
        <Route path="/:name/starred" exact component={StarredPage} />
      </Switch>
    </div>
  );
}
