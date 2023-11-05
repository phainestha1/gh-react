import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase/firebase-config";
import { Wrapper, Title, LoginButton, BlankView } from "./style/login";
import { Input } from "./style/component";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const authUser = () => {
    signInWithEmailAndPassword(auth, email+"@gmail.com", password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) { navigate("/home"); }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <Wrapper>
      <Title>로그인</Title>
      <Input
        type="text"
        name="id"
        placeholder="아이디"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      <Input
        type="password"
        name="password"
        placeholder="비밀번호"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />
      <BlankView />
      <LoginButton onClick={authUser}>로그인</LoginButton>
    </Wrapper>
  );
}

export default Login;
