import './App.css';
import { Route, Switch } from 'react-router';
import About from './components/About/About';
import Auth from './components/Auth/Auth';
import UserProfile from './components/UserProfile/UserProfile';
import StartProject from './components/StartProject/StartProject';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
// import ProjectDetail from './components/ProjectDetail/ProjectDetail';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/auth/:type">
          <Auth/>
        </Route>
        <Route path="/user-profile/:id">
          <UserProfile/>
        </Route>
        <Route path="/start-project">
          <StartProject/>
        </Route>
        {/* <Route path="/projects/:id">
          <ProjectDetail/>
        </Route> */}
        <Route exact path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
