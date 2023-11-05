import { styled } from "styled-components";

export const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const HeaderLeft = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
`

export const HeaderRight = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: 100%;
`

export const HeaderButton = styled.button`
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