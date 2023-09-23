import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const Table = styled.table`
  margin-bottom: 2rem;
`;

export const TableDataCell = styled.tr`
  text-align: center;
`;

export const PannelCell = styled.td`
  border: 1px solid #dbdbdb;
  border-radius: 0.375em;
  box-sizing: border-box;
  font-size: 1rem;
  height: 2.5em;
  line-height: 1.5;
  padding: calc(0.5em - 1px) 1em;
  cursor: pointer;
`;
