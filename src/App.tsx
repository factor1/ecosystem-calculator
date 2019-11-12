import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "normalize.css";
import "./styles/app.css";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" render={() => <div>Home</div>} />
        <Route exact path="/calculate" render={() => <div>calculate</div>} />
      </Router>
    </div>
  );
};

export default App;
