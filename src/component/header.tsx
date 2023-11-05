import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {
  HeaderButton,
  HeaderDiv,
  HeaderLeft,
  HeaderRight,
} from "../style/header";
import { FiLogOut } from 'react-icons/fi';

interface Props {
  title?: any;
}

export default function Header({ title }: Props) {
  const navigate = useNavigate();

  const logout = async () => {
    console.log("Hello World Logout");
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <HeaderDiv>
      <HeaderLeft>
        <h2>{title}</h2>
      </HeaderLeft>
      <HeaderRight>
        <h2>
            <FiLogOut onClick={logout} />
        </h2>
      </HeaderRight>
    </HeaderDiv>
  );
}
