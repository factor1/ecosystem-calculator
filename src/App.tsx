import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ContextProvider } from "./GlobalContext";

import "normalize.css";
import "./styles/app.css";

import Home from "./Home";
import Calculate from "./Calculate";

const App: React.FC = () => {
  return (
    <div>
      <ContextProvider>
        <Router basename="/2019/gpsi/wp/calculate">
          <Route exact path="/" component={Home} />
          <Route exact path="/calculate" component={Calculate} />
        </Router>
      </ContextProvider>
    </div>
  );
};

export default App;
