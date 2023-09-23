import { styled } from "styled-components";

export const Title = styled.h1``;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const BlankView = styled.div`
  margin: 5vh 0; 
`

export const LoginButton = styled.button`
  width: 100%;
  background-color: #000;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  color: #fff;
  font-size: 1.2rem;
  margin: 10px;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
`
