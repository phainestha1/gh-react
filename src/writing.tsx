import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  updateDoc,
  where,
  query,
  getDocs,
  limit,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase/firebase-config";
import { Wrapper } from "./style/writing";
import { Button, Input } from "./style/component";
import { Table, TableDataCell } from "./style/home";

export default function Writing() {
  const [text, setText] = useState("");
  const [data, setData] = useState<any>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const pannelId = Number(location.pathname.slice(9));

  const createRecord = async () => {
    const previousRecords: any = [];
    const docRef = doc(db, "pannels", pannelId.toString());
    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.data()?.records) {
        previousRecords.push(...docSnap.data()?.records);
        await updateDoc(docRef, {
          records: [
            { id: Date.now(), createdAt: Date.now(), text: text },
            ...previousRecords,
          ],
        });
      } else {
        await updateDoc(docRef, {
          records: [{ id: Date.now(), createdAt: Date.now(), text: text }],
        });
      }
      navigate("/home");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

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

  const convert = (int: number) => {
    const date = new Date(int);
    return date.toLocaleDateString();
  };

  return (
    <Wrapper>
      {data.map((data: any) => {
        return <h2 key={data.id}>{data.pannelName}</h2>;
      })}
      <Table>
        <tr>
          <th>날짜</th>
          <th>지침</th>
        </tr>
        {data[0]?.records.map((data: any) => {
          return (
            <TableDataCell key={data.id}>
              <td>{convert(data.createdAt)}</td>
              <td>{data.text}</td>
            </TableDataCell>
          );
        })}
      </Table>
      <Input
        placeholder="text"
        type="text"
        name="text"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <Button onClick={createRecord}>작성 완료</Button>
      <Button onClick={() => navigate("/home")}>목록으로</Button>
    </Wrapper>
  );
}
