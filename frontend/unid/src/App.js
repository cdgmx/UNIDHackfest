import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import UserPage from "./Components/UserPage";
import AdminPage from "./Components/AdminPage";
import SignUpPage from "./Components/SignUpPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/userpage" component={UserPage} />
          <Route exact path="/adminpage" component={AdminPage} />
          <Route exact path="/signuppage" component={SignUpPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
