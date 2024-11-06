import React, { useEffect, useState } from 'react';
import Admin from './Admin';
import App from './App';

const Home: React.FC = () => {

  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const hasAccount = localStorage.getItem("account") !== null;
    setIsAuth(hasAccount);
  }, []);
  
  if (isAuth) {
    return <Admin/>
  } else {
    return <App />
  }
};

export default Home;

