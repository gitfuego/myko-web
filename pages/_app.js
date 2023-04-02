import '../styles/globals.scss';

export default function({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  return (
  <Component {...pageProps} />
  );
}