import { useState, useEffect } from 'react';
import Phone from '../components/Phone.jsx';
import Nav from '../components/main/Nav.jsx';
import Home from '../components/main/Home.jsx';
import Explore from '../components/main/Explore.jsx';
import Profile from '../components/main/Profile.jsx';

export default function({ user }) {
  // state will be either home, explore, or profile
  const [ tab, changeTab ] = useState('home');

  return (
    <Phone>
      <Home user={user} hidden={tab !== 'home'}/>
      <Explore user={user} hidden={tab !== 'explore'}/>
      <Profile user={user} hidden={tab !== 'profile'}/>
      <Nav tab={tab} changeTab={changeTab} />
    </Phone>
  )
}