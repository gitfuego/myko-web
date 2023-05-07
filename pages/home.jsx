import { useState, useEffect } from 'react';
import Phone from '../components/Phone.jsx';
import Nav from '../components/main/Nav.jsx';
import Home from '../components/main/Home.jsx';
import Explore from '../components/main/Explore.jsx';
import Profile from '../components/main/Profile.jsx';
import Community from '../components/community/Community.jsx';
import { useRouter } from 'next/router.js';

export default function({ user }) {
  // state will be either home, explore, or profile
  const [ tab, changeTab ] = useState('home');
  const router = useRouter();
  const { artist } = router.query;

  useEffect(() => { 
    if (user === null) router.push('/login');
   }, [])

  return (
    <Phone>
      { artist ? <Community artist={artist} user={user} /> : '' }
      <Home key='home' user={user} hidden={tab !== 'home'}/>
      <Explore key='explore' user={user} hidden={tab !== 'explore'}/>
      <Profile key='profile' user={user} hidden={tab !== 'profile'}/>
      <Nav key='nav' tab={tab} changeTab={changeTab} />
    </Phone>
  )
}