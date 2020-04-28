import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser, logoutUser} from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions';
import {Provider} from 'react-redux'

import store from './store'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ResetPassword from './components/auth/ResetPassword'
import ValidateEmail from './components/auth/ValidateEmail'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoutes from './components/common/PrivateRoutes'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/add-credentials/AddExperience'
import AddEducation from './components/add-credentials/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import NotFound from './components/not-found/NotFound'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import './App.css';


if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))
  // check if token is expired 
  let currentTime = Date.now()/1000
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser())
    store.dispatch(clearCurrentProfile())
    window.location.href = '/login'
  }

}
function App() {
  return (
    <div className="App">
      <Provider store ={store}>
        <Router>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/profiles' component={Profiles} />
            <Route exact path='/profile/:handle' component={Profile} />
            <Route exact path='/reset' component={ResetPassword} />
            <Route exact path='/validateemail' component={ValidateEmail} />
            <Route exact path='/not-found' component={NotFound} />
            <Switch>
              <PrivateRoutes exact path='/dashboard' component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoutes exact path='/create-profile' component={CreateProfile} />
            </Switch>
            <Switch>
              <PrivateRoutes exact path='/edit-profile' component={EditProfile} />
            </Switch>
            <Switch>
              <PrivateRoutes exact path='/add-experience' component={AddExperience} />
            </Switch>
            <Switch>
              <PrivateRoutes exact path='/add-education' component={AddEducation} />
            </Switch>
            <Switch>
              <PrivateRoutes exact path='/feed' component={Posts} />
            </Switch>
            <Switch>
              <PrivateRoutes exact path='/post/:id' component={Post} />
            </Switch>
        </div>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
