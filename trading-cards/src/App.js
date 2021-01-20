import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import YuGiOh from './components/YuGiOh';
import SearchLayout from './components/SearchLayout';


import {withRouter} from 'react-router';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={withRouter(SearchLayout)} />
          <Route path="/yugioh" component={withRouter(YuGiOh)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
