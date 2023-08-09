import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase-config";
import { useNavigate } from "react-router";
import Login from "./login";
import Home from "./home";
import { Wrapper } from "./style/main";
import "./style/App.css";

function Main() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       navigate("/home");
  //     }
  //   });
  //   console.log(document);
  // }, []);

  return (
    <Wrapper>
      <Login />
    </Wrapper>
  );
}

export default Main;
