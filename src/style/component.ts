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
  align-items: center;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 10px;
  min-height: 3rem;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
`;

export const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`