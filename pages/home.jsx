import { useState, useEffect } from 'react';
import Phone from '../components/Phone.jsx';
import Nav from '../components/main/Nav.jsx';
import Home from '../components/main/Home.jsx';

export default function({ user }) {
  const [ tab, changeTab ] = useState('home');
  // tab === 'search' ? tab : tab
  return (
    <Phone>
      {tab === 'home' ? <Home /> : <div style={{height: '100%'}} />}
      <Nav tab={tab} changeTab={changeTab} />
    </Phone>
  )
}