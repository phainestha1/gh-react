import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebase-config";

export default function Writing() {
  const [text, setText] = useState("");
  const [data, setData] = useState<any>([]);
  const [document, setDocument] = useState<any>([]);
  const location = useLocation();
  const pannelId = Number(location.pathname.slice(9));

  const createRecord = async () => {
    try {
      const docRef = await addDoc(collection(db, "records"), {
        id: Date.now(),
        pannelId: pannelId,
        text: text,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    const getPannelData = async () => {
      const arr: any = [];
      const q = query(collection(db, "pannels"), where("id", "==", pannelId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setData([...arr]);
    };
    const getRecordData = async () => {
      const arr: any = [];
      const q = query(
        collection(db, "records"),
        where("pannelId", "==", pannelId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setDocument([...arr]);
    };

    getPannelData();
    getRecordData();
  }, [pannelId]);

  return (
    <div>
      {data.map((data: any) => {
        return <h3 key={data.id}>{data.pannelName}</h3>;
      })}
      {document.map((data: any) => {
        return <h3 key={data.id}>{data.text}</h3>;
      })}
      <input
        placeholder="text"
        type="text"
        name="text"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <button onClick={createRecord}>작성 완료</button>
    </div>
  );
}
