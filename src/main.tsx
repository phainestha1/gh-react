import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase-config";
import { useNavigate } from "react-router";
import Login from './login';

function Main() {
  const [login, isLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) { navigate("/home");}
    });
    console.log(document)
  }, [navigate, document]);

  return (
    <div>
       <Login />
    </div>
  );
}

export default Main;
