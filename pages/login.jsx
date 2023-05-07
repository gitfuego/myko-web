import LIForm from '../components/login/LIForm.jsx';
import Phone from '../components/Phone.jsx';
import { useEffect } from 'react';

export default function({ user, setUser }) {
  const checkCookie = () => {
    fetch('/api/login', {
      method: 'GET',
      credentials: 'include',
    })
    .then( (response) => {
      if (response.status === 200) return response.json();
      else return;
    })
    .then( (newUser) => {
      if (newUser !== undefined && newUser !== null) {
        setUser(newUser);
        router.push('/home');
      } else {
        return;
      }
    })
    .catch(() => console.log('error checking cookie'))
  };

  useEffect(() => {
    if (user !== null && user !== undefined) router.push('/home');
    else checkCookie();
  }, []);

  return (
    <Phone>
      <LIForm user={user} setUser={setUser} />
    </Phone>
  )
}