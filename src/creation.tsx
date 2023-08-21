import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase/firebase-config";
import { useNavigate } from "react-router";
import { Select, Wrapper } from "./style/creation";
import { Button, Input } from "./style/component";

function Creation() {
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

  const createPannel = async () => {
    const id = Date.now().toString();
    try {
      await setDoc(doc(db, "pannels", id), {
        id: id,
        serial: serial,
        pannelName: pannelName,
        machineNumber: machineNumber,
        clientName: clientName,
        shape: shape,
        ctpt: ctpt,
        drain: drain,
        dateOfInstall: dateOfInstall,
        location: location,
        records: [],
      });
      navigate("/home");
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

      <Button onClick={createPannel}>생성하기</Button>
      <Button onClick={() => navigate("/home")}>목록으로</Button>
    </Wrapper>
  );
}

export default Creation;
