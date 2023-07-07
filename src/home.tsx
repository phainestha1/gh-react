import { useEffect } from "react";
import { auth } from "./firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";

function Home() {
    const navigate = useNavigate();

    // Force inactive users to the login page.
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (!user) { navigate("/") }
        })
    })
    
    return <><h1>적산전력계 홈 화면</h1></>
}

export default Home;