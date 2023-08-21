import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, where, query, getDocs, limit } from "firebase/firestore";
import { db } from "./firebase/firebase-config";
import { Wrapper } from "./style/writing";
import { Button, HorizontalDiv } from "./style/component";
import { Table, TableDataCell } from "./style/home";

export default function Detail() {
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const pannelId = Number(location.pathname.slice(8));

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
              <td>{data.record}</td>
            </TableDataCell>
          );
        })}
      </Table>
      <HorizontalDiv>
        <Button onClick={() => navigate(`/writing/${pannelId}`)}>새 지침 등록</Button>
        <Button onClick={() => navigate(`/update/${pannelId}`)}>패널정보 수정하기</Button>
        <Button onClick={() => navigate("/home")}>목록으로</Button>
      </HorizontalDiv>
    </Wrapper>
  );
}