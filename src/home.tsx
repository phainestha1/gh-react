import { useEffect, useState } from "react";
import { auth, db } from "./firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { collection, getDocs } from "firebase/firestore";

function Home() {
  const [document, setDocument] = useState<any>([])
  const navigate = useNavigate();

  const loadPannelData = async() => {
    const arr: any = []
    const querySnapshot = await getDocs(collection(db, "pannels"))
    querySnapshot.forEach((doc: any) => {
      arr.push(doc.data())
    });
    setDocument([...arr]);
    console.log(document)
  }

  // Force inactive users to the login page.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) { navigate("/");}
      if (document.length === 0) { loadPannelData() }
    });
    console.log(document)
  }, [navigate, document]);

  return (
    <>
      <h1>적산전력계 홈 화면</h1>
      {document.map((data: any) => {
        return (
        <div key={data.id}>
          <h3>{data.id}</h3>
          <h3>{data.pannelName}</h3>
          <h3>{data.machineNumber}</h3>
        </div>
        )
      })}
      <button onClick={() => navigate("/creation")}>만들기</button>
      <button>작성하기</button>
      <button>수정하기</button>
    </>
  );
}

export default Home;
