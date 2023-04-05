import LIForm from '../components/login/LIForm.jsx';
import Phone from '../components/Phone.jsx';

export default function({ user, setUser }) {
  return (
    <Phone>
      <LIForm user={user} setUser={setUser} />
    </Phone>
  )
}