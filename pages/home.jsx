import { useState, useEffect } from 'react';
import Phone from '../components/Phone.jsx';
import Nav from '../components/main/Nav.jsx';
import Home from '../components/main/Home.jsx';
import Explore from '../components/main/Explore.jsx';
import Profile from '../components/main/Profile.jsx';
import Community from '../components/community/Community.jsx';
import EditProfile from '../components/main/EditProfile.jsx';
import { useRouter } from 'next/router.js';

export default function({ user, accessToken, setAccessToken, code, setCode }) {
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
      { artist ? <Community artist={artist} user={user} accessToken={accessToken}/> : '' }
      { editProfile ? <EditProfile user={user} accessToken={accessToken} setAccessToken={setAccessToken} code={code}/> : '' }
      <Home key='home' user={user} hidden={tab !== 'home'} accessToken={accessToken}/>
      <Explore key='explore' user={user} hidden={tab !== 'explore'} accessToken={accessToken}/>
      <Profile key='profile' user={user} hidden={tab !== 'profile'} accessToken={accessToken} code={code} />
      {accessToken ? <div style={{fontSize: '5px'}}>{code}</div> : ''}
      <Nav key='nav' tab={tab} changeTab={changeTab} />
    </Phone>
  )
}