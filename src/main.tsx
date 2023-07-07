import { useState } from 'react';
import Login from './login';
import Home from './home';

function Main() {
  const [login, isLogin] = useState(false);

  return (
    <div>
      {login 
      ? <Home />
      : <Login />
      }
    </div>
  );
}

export default Main;
