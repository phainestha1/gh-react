import { useEffect, useState } from "react";
import { auth, db } from "./firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { collection, getDocs } from "firebase/firestore";
import { CSVLink } from "react-csv";

function Home() {
  const [document, setDocument] = useState<any>([]);
  const navigate = useNavigate();

  const loadPannelData = async () => {
    const arr: any = [];
    const querySnapshot = await getDocs(collection(db, "pannels"));
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      arr.push(data);
    });
    setDocument([...arr]);
    console.log(document);
  };

  const headers = [
    { label: "아이디", key: "id" },
    { label: "순번", key: "serial" },
    { label: "패널명", key: "pannelName" },
    { label: "점포명", key: "machineNumber" },
  ];

  // Force inactive users get back to the login page.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
      if (document.length === 0) {
        loadPannelData();
      }
    });
    console.log(document);
  }, [navigate]);

  return (
    <>
      <h1>적산전력계 홈 화면</h1>
      <CSVLink headers={headers} data={document}>
        적산전력 기록 다운로드
      </CSVLink>
      {document.map((data: any) => {
        return (
          <div key={data.id} onClick={() => navigate(`/writing/${data.id}`)}>
            <h3>{data.id}</h3>
            <h3>{data.pannelName}</h3>
            <h3>{data.machineNumber}</h3>
          </div>
        );
      })}
      <button onClick={() => navigate("/creation")}>만들기</button>
    </>
  );
}

export default Home;
