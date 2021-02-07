import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Redirect
} from "react-router-dom";

import Convertisseur from "./convertisseur";
import NotFound from "./NotFound";


const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Convertisseur} />
      <Route path="/404"> <NotFound /></Route>
      <Redirect to="/404" />
    </Switch>
  </Router>
      
    
    

);


export default App;