import './App.css';
import { Route, Switch } from 'react-router';
import About from './components/About/About';
import Auth from './components/Auth/Auth';
import UserProfile from './components/UserProfile/UserProfile';
import StartProject from './components/StartProject/StartProject';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import ProjectDetail from './components/ProjectDetail/ProjectDetail';
import Projects from './components/Projects/Projects';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/auth/:type" component={Auth} />
        <Route path="/user-profile/:id" component={UserProfile} />
        <Route path="/start-project/:id" component={StartProject} />
        <Route path="/projects/:id" component={ProjectDetail} />
        <Route path="/projects/" component={Projects} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
