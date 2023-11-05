import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { Button, HorizontalDiv, Input } from "./style/component";
import { Wrapper } from "./style/writing";
import { db } from "./firebase/firebase-config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Inspection() {
  const [index, setIndex] = useState(0);
  const [document, setDocument] = useState<any>([]);
  const [inspectionList, setInspectionList] = useState<any>([]);
  const [record, setRecord] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadPannelData();
  }, []);

  const convert = (int: number) => {
    const date = new Date(int);
    return date.toLocaleDateString();
  };
  const sortInspectionList = (serial: string) => {
    setIndex(0);
    const result = document.filter((obj: any) => obj.serial === serial);
    setInspectionList(result);
  };
  const changeCurrentInspection = (order: string) => {
    console.log(order);
    switch (order) {
      case "back":
        setIndex(index - 1);
        break;
      case "next":
        if (index < inspectionList.length - 1) {
          setIndex(index + 1);
        }
        break;
    }
  };
  const loadPannelData = async () => {
    const arr: any = [];
    const q = query(collection(db, "pannels"), orderBy("serial"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc: any) => {
      const data = doc.data();
      let tableData = {
        id: data.id,
        clientName: data.clientName,
        ctpt: data.ctpt,
        dateOfInstall: data.dateOfInstall,
        drain: data.drain,
        location: data.location,
        machineNumber: data.machineNumber,
        pannelName: data.pannelName,
        serial: data.serial,
        shape: data.shape,
      };
      arr.push(tableData);
    });
    setDocument([...arr]);
  };
  const createRecord = async (id: string) => {
    const previousRecords: any = [];
    const docRef = doc(db, "pannels", id);
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
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Wrapper>
      <h1>정기 점검 ({convert(Date.now())})</h1>
      <HorizontalDiv>
        <Button onClick={() => sortInspectionList("A")}>A</Button>
        <Button onClick={() => sortInspectionList("B")}>B</Button>
        <Button onClick={() => sortInspectionList("C")}>C</Button>
      </HorizontalDiv>

      <h1>{inspectionList.length !== 0 ? "" : "순번을 선택하세요"}</h1>

      {inspectionList.length !== 0 ? (
        <>
          <h2>{inspectionList[index].pannelName}</h2>
          <Input
            placeholder="지침을 입력하세요"
            type="text"
            name="record"
            value={record}
            onChange={(event) => {
              setRecord(event.target.value);
            }}
          />
          <h3>
            {inspectionList.indexOf(inspectionList[index]) + 1}/
            {inspectionList.length}
          </h3>
          <HorizontalDiv>
            <Button
              onClick={() => changeCurrentInspection("back")}
              disabled={index === 0 ? true : false}
            >
              이전
            </Button>
            <Button onClick={() => createRecord(inspectionList[index].id)}>
              등록하기
            </Button>
            <Button
              onClick={() => changeCurrentInspection("next")}
              disabled={index >= inspectionList.length ? true : false}
            >
              다음
            </Button>
          </HorizontalDiv>
        </>
      ) : (
        <></>
      )}

      <Button onClick={() => navigate("/home")}>홈으로</Button>
    </Wrapper>
  );
}
