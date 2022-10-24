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
        <Route path="/about" component={About} />
        <Route path="/auth" component={Auth} />
        <Route path="/user-profile/:id" component={UserProfile} />
        <Route path="/start-project/:id" component={StartProject} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
