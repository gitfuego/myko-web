import { useState, useEffect } from 'react';
import Phone from '../components/Phone.jsx';
import Nav from '../components/main/Nav.jsx';
import Home from '../components/main/Home.jsx';
import Explore from '../components/main/Explore.jsx';
import Profile from '../components/main/Profile.jsx';
import Community from '../components/community/Community.jsx';
import EditProfile from '../components/main/EditProfile.jsx';
import { useRouter } from 'next/router.js';

export default function({ user, token, setToken, code, setCode }) {
  // state will be either home, explore, or profile
  const [ tab, changeTab ] = useState('home');
  const router = useRouter();
  const { artist, editProfile } = router.query;
  
  useEffect(() => {
    const authCode = new URLSearchParams(window.location.search).get('code');
    setCode(authCode);
    if (user === null) router.push('/login');
   }, [])

  return (
    <Phone>
      { artist ? <Community artist={artist} user={user} /> : '' }
      { editProfile ? <EditProfile user={user} token={token} setToken={setToken} code={code}/> : '' }
      <Home key='home' user={user} hidden={tab !== 'home'} token={token}/>
      <Explore key='explore' user={user} hidden={tab !== 'explore'} token={token}/>
      <Profile key='profile' user={user} hidden={tab !== 'profile'} token={token} code={code}/>
      {code ? <div style={{fontSize: '5px'}}>{code}</div> : ''}
      <Nav key='nav' tab={tab} changeTab={changeTab} />
    </Phone>
  )
}