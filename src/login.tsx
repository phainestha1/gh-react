import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase/firebase-config';

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const authUser = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      if (user) { navigate("/home") }

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }

  return (
    <div>
      <h1>로그인 화면</h1>
      <input 
      type="text" 
      name="id"
      onChange = { event => setEmail(event.target.value) } 
      value={email} 
      />
      <input 
      type="password" 
      name="password" 
      onChange = { event => setPassword(event.target.value) } 
      value={password} 
      />
      <button onClick={authUser}>로그인</button>
    </div>
  );
}

export default Login;
