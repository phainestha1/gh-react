import { useEffect, useState } from "react";
import { auth, db } from "./firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Button } from "./style/component";
import { PannelCell, Table, TableDataCell, Wrapper } from "./style/home";

function Home() {
  const [document, setDocument] = useState<any>([]);
  const navigate = useNavigate();

  const loadPannelData = async () => {
    const arr: any = [];
    const q = query(collection(db, "pannels"), orderBy("serial"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc: any) => {
      const data = doc.data();
      arr.push(data);
    });
    setDocument([...arr]);
  };

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
  });

  const convert = (int: number) => {
    const date = new Date(int);
    return date.toLocaleDateString();
  };

  return (
    <Wrapper>
      <h1>적산전력계 기록</h1>
      <h5>판넬명을 터치하여 상세 화면으로 이동합니다.</h5>
      <Table>
        <tr>
          <th>순번</th>
          <th>판넬명</th>
          <th>계기번호</th>
          <th>지침</th>
          <th>최근 지침일</th>
        </tr>
        {document.map((data: any) => {
          return (
            <TableDataCell
              key={data.id}
              onClick={() => navigate(`/detail/${data.id}`)}
            >
              <td>{data.serial}</td>
              <PannelCell>{data.pannelName}</PannelCell>
              <td>{data.machineNumber}</td>
              <td>{data.records[0]?.record}</td>
              <td>{convert(data.records[0]?.createdAt)}</td>
            </TableDataCell>
          );
        })}
      </Table>
      <Button onClick={() => navigate("/creation")}>새판넬 등록</Button>
    </Wrapper>
  );
}

export default Home;