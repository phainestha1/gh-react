import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase/firebase-config";
import { useNavigate } from "react-router";
import { Select, Wrapper } from "./style/creation";
import { Button, Input } from "./style/component";

function Creation() {
  const [serial, setSerial] = useState("A");
  const [pannelName, setPannelName] = useState("");
  const [machineNumber, setMachineNumber] = useState("");
  const [check, setCheck] = useState("");
  const navigate = useNavigate();

  const createPannel = async () => {
    try {
      const docRef = await addDoc(collection(db, "pannels"), {
        id: Date.now(),
        serial: serial,
        pannelName: pannelName,
        machineNumber: machineNumber,
      });
      if (docRef.id) {
        console.log("패널이 생성되었습니다.", docRef.id);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Wrapper>
      <h1>적산전력계 검침표 생성</h1>
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
        name="check"
        value={check}
        onChange={(event) => {
          setCheck(event.target.value);
        }}
      />
      <Button onClick={createPannel}>생성하기</Button>
      <Button onClick={() => navigate("/home")}>목록으로</Button>
    </Wrapper>
  );
}

export default Creation;
