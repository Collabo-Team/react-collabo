import './App.css';
import { Route, Switch } from 'react-router';
import About from './components/About/About';
import Auth from './components/Auth/Auth';
import UserProfile from './components/UserProfile/UserProfile';
import StartProject from './components/StartProject/StartProject';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/about" component={ About } />
        <Route path="/auth/:type" component={ Auth } />
        <Route path="/user-profile/:id" component={UserProfile} />
        <Route path="/start-project/:id" component={StartProject} />
      </Switch>
    </div>
  );
}

export default App;
