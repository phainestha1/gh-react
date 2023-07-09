import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from './firebase/firebase-config';
import { useNavigate } from 'react-router';

function Creation() {
    const [serial, setSerial] = useState("")
    const [pannelName, setPannelName] = useState("")
    const [machineNumber, setMachineNumber] = useState("")
    const [check, setCheck] = useState("")
    const navigate = useNavigate();

    const createPannel = async() => {
        try {
            const docRef = await addDoc(collection(db, "pannels"), {
              serial: serial,
              id: Date.now(),
              pannelName: pannelName,
              machineNumber: machineNumber,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (error) {
            console.error("Error adding document: ", error);
          }
    }

    return (
    <>
        <h1>적산전력계 검침표 생성</h1>
        <select id="serial" name="순번" onChange={(event) => {setSerial(event.target.value)}}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
        </select>
        <input placeholder='패널명' type="text" name="pannelName" value={pannelName} onChange={(event) => {setPannelName(event.target.value)}} />
        <input placeholder='계기번호' type="text" name="machineNumber" value={machineNumber} onChange={(event) => {setMachineNumber(event.target.value)}} />
        <input placeholder='점포명' type="text" name="check" value={check} onChange={(event) => {setCheck(event.target.value)}} />
        <button onClick={createPannel}>생성하기</button>
        <button onClick={() => navigate("/home")}>목록으로</button>
    </>
    )
}

export default Creation;