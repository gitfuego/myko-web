import { useState, useEffect } from 'react';
import Phone from '../components/Phone.jsx';
import Nav from '../components/main/Nav.jsx';
import Home from '../components/main/Home.jsx';

export default function({ user }) {
  const [ tab, changeTab ] = useState('home');

  return (
    <Phone>
      {tab === 'home' ? <Home /> : tab === 'search' ? tab : tab}
      <Nav tab={tab} changeTab={changeTab} />
    </Phone>
  )
}