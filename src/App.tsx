import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ContextProvider } from "./GlobalContext";

import "normalize.css";
import "./styles/app.css";

import Home from "./Home";

const App: React.FC = () => {
  return (
    <div>
      <ContextProvider>
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/calculate" render={() => <div>calculate</div>} />
        </Router>
      </ContextProvider>
    </div>
  );
};

export default App;
