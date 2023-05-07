import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const serverUrl = process.env.NODE_ENV === 'production'
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3001';


const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(serverUrl);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
