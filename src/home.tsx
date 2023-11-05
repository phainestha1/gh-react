import { useEffect, useMemo, useState } from "react";
import { auth, db } from "./firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Button, HorizontalDiv } from "./style/component";
import { Wrapper } from "./style/home";
import Table from "./component/table";
import Header from "./component/header";

const initialState = {
  pageSize: 10,
  pageIndex: 0
};

function Home() {
  const navigate = useNavigate();
  const [document, setDocument] = useState<any>([]);
  const [idList, setIdList] = useState<any>([]);
  const columns = useMemo(
    () => [
      { accessor: "serial", Header: "순번" },
      { accessor: "pannelName", Header: "판넬명" },
      { accessor: "machineNumber", Header: "계기번호" },
      { accessor: "latestRecord", Header: "지침" },
      { accessor: "latestRecordDate", Header: "최근 지침일" },
    ],
    []
  );

  // Force inactive users get back to the login page.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
      if (document.length === 0) {
        loadPannelData();
      }
    });
  });

  const loadPannelData = async () => {
    const arr: any = [];
    const idArr: any = [];
    const q = query(collection(db, "pannels"), orderBy("serial"));
    const convert = (int: number) => {
      const date = new Date(int);
      return date.toLocaleDateString();
    };
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc: any) => {
      const data = doc.data();
      let tableData = {};
      if (data.records[0] === undefined) {
        tableData = {
          id: data.id,
          clientName: data.clientName,
          ctpt: data.ctpt,
          dateOfInstall: data.dateOfInstall,
          drain: data.drain,
          location: data.location,
          machineNumber: data.machineNumber,
          pannelName: data.pannelName,
          records: [],
          latestRecord: "기록 없음",
          latestRecordDate: "",
          serial: data.serial,
          shape: data.shape,
        };
      } else {
        tableData = {
          id: data.id,
          clientName: data.clientName,
          ctpt: data.ctpt,
          dateOfInstall: data.dateOfInstall,
          drain: data.drain,
          location: data.location,
          machineNumber: data.machineNumber,
          pannelName: data.pannelName,
          records: data.records[0],
          latestRecord: data.records[0].record,
          latestRecordDate: convert(data.records[0].createdAt),
          serial: data.serial,
          shape: data.shape,
        };
      }
      arr.push(tableData);
      idArr.push(data.id);
    });

    setDocument([...arr]);
    setIdList([...idArr]);
  };

  return (
    <Wrapper>
      <Header title="적산전력계" />
      <h5>판넬명을 터치하여 상세 화면으로 이동합니다.</h5>
      <Table columns={columns} data={document} id={idList} initialState={initialState} />

      <HorizontalDiv>
        <Button onClick={() => navigate("/creation")}>새판넬 등록</Button>
        <Button onClick={() => navigate("/inspection")}>전체 점검하기</Button>
      </HorizontalDiv>
    </Wrapper>
  );
}

export default Home;
