import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  collection,
  where,
  query,
  getDocs,
  limit,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase/firebase-config";
import { Wrapper } from "./style/writing";
import { Button, Input } from "./style/component";
import { Select } from "./style/creation";
import { onAuthStateChanged } from "firebase/auth";

export default function Update() {
  const [data, setData] = useState<any>([]);
  const [serial, setSerial] = useState("A");
  const [pannelName, setPannelName] = useState("");
  const [machineNumber, setMachineNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [shape, setShape] = useState("");
  const [ctpt, setCtpt] = useState("");
  const [drain, setDrain] = useState("");
  const [dateOfInstall, setDateOfInstall] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const pannelId = Number(useLocation().pathname.slice(8));

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
        const data = doc.data();
        arr.push(data);
        setSerial(data.serial);
        setPannelName(data.pannelName);
        setMachineNumber(data.machineNumber);
        setClientName(data.clientName);
        setShape(data.shape);
        setCtpt(data.ctpt);
        setDrain(data.drain);
        setDateOfInstall(data.dateOfInstall);
        setLocation(data.location);
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
  })
    
  const updatePannelInfo = async () => {
    const docRef = doc(db, "pannels", pannelId.toString());

    try {
      await updateDoc(docRef, {
        serial: serial,
        pannelName: pannelName,
        machineNumber: machineNumber,
        clientName: clientName,
        shape: shape,
        ctpt: ctpt,
        drain: drain,
        dateOfInstall: dateOfInstall,
        location: location,
      });
      navigate("/home");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Wrapper>
      {data.map((data: any) => {
        return <h2 key={data.id}>{data.pannelName}</h2>;
      })}

      <Select
        id="serial"
        name="순번"
        onChange={(event) => {
          setSerial(event.target.value);
        }}
      >
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </Select>
      <Input
        placeholder="패널명"
        type="text"
        name="pannelName"
        value={pannelName}
        onChange={(event) => {
          setPannelName(event.target.value);
        }}
      />
      <Input
        placeholder="계기번호"
        type="text"
        name="machineNumber"
        value={machineNumber}
        onChange={(event) => {
          setMachineNumber(event.target.value);
        }}
      />
      <Input
        placeholder="점포명"
        type="text"
        name="clientName"
        value={clientName}
        onChange={(event) => {
          setClientName(event.target.value);
        }}
      />
      <Input
        placeholder="상별"
        type="text"
        name="shape"
        value={shape}
        onChange={(event) => {
          setShape(event.target.value);
        }}
      />
      <Input
        placeholder="CT & PT"
        type="text"
        name="ctpt"
        value={ctpt}
        onChange={(event) => {
          setCtpt(event.target.value);
        }}
      />
      <Input
        placeholder="부설일자"
        type="text"
        name="dateOfInstall"
        value={dateOfInstall}
        onChange={(event) => {
          setDateOfInstall(event.target.value);
        }}
      />
      <Input
        placeholder="배수"
        type="text"
        name="drain"
        value={drain}
        onChange={(event) => {
          setDrain(event.target.value);
        }}
      />
      <Input
        placeholder="위치"
        type="text"
        name="location"
        value={location}
        onChange={(event) => {
          setLocation(event.target.value);
        }}
      />

      <Button onClick={() => updatePannelInfo()}>수정하기</Button>
      <Button onClick={() => navigate("/home")}>목록으로</Button>
    </Wrapper>
  );
}
