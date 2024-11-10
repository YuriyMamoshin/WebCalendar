import styled from "styled-components";

export const StyledDateBar = styled.div`
  width: 100%;
  max-width: 123px;
  height: 50px;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? "#dff5e2" : "#ffffff")};
  font-family: "Inter", sans-serif;
  color: #323749;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledDate = styled.p`
  font-weight: 700;
  font-size: 17px;
`;

export const StyledDay = styled.p`
  font-weight: 400;
  font-size: 10px;
`;
