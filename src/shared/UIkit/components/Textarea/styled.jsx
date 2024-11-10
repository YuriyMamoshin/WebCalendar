import styled from "styled-components";

export const StyledTextarea = styled.article`
  box-sizing: border-box;
  width: 456px;
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  padding-bottom: 13px;
  border-bottom: 1px solid #737373;

  & label {
    font-size: 10px;
    font-weight: 700;
    padding-bottom: 7px;
  }

  & textarea {
    border: none;
    outline: none;
    resize: none;
    padding: 0;
    font-family: "Inter", sans-serif;
    font-size: 15px;
  }
`;
