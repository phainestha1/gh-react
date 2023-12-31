import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  collection,
  where,
  query,
  getDocs,
  limit,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase/firebase-config";
import { Wrapper } from "./style/writing";
import { Button, Input } from "./style/component";
import { onAuthStateChanged } from "firebase/auth";

export default function Writing() {
  const [data, setData] = useState<any>([]);
  const [record, setRecord] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const pannelId = Number(location.pathname.slice(9));

  useEffect(() => {
    const getPannelData = async () => {
      const arr: any = [];
      const q = query(
        collection(db, "pannels"),
        where("id", "==", pannelId.toString()),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setData([...arr]);
    };

    getPannelData();
  }, [pannelId]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  });

  const convert = (int: number) => {
    const date = new Date(int);
    return date.toLocaleDateString();
  };

  const createRecord = async () => {
    const previousRecords: any = [];
    const docRef = doc(db, "pannels", pannelId.toString());
    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.data()?.records) {
        previousRecords.push(...docSnap.data()?.records);
        await updateDoc(docRef, {
          records: [
            { id: Date.now(), createdAt: Date.now(), record: record },
            ...previousRecords,
          ],
        });
      } else {
        await updateDoc(docRef, {
          records: [{ id: Date.now(), createdAt: Date.now(), record: record }],
        });
      }
      navigate("/home");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Wrapper>
      {data.map((data: any) => {
        return (
          <div key={data.id}>
            <h2>{data.pannelName}</h2>
            <h4>계기 번호 : {data.machineNumber}</h4>
            <h4>점포명 : {data.clientName}</h4>
          </div>
        );
      })}
      <Input disabled name="dateOfRecord" value={convert(Date.now())} />
      <Input
        placeholder="지침을 입력하세요"
        type="text"
        name="record"
        value={record}
        onChange={(event) => {
          setRecord(event.target.value);
        }}
      />

      <Button onClick={() => createRecord()}>등록 완료</Button>
      <Button onClick={() => navigate("/home")}>목록으로</Button>
    </Wrapper>
  );
}
