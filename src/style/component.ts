import { styled } from "styled-components";

export const Input = styled.input`
  color: #333;
  font-size: 1.2rem;
  margin: 0.5rem auto;
  padding: 1rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border: 1px solid gray;
  display: block;
  transition: all 0.3s;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #000;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  color: #fff;
  font-size: 1.2rem;
  margin: 10px;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
  cursor: pointer;
`;

export const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`