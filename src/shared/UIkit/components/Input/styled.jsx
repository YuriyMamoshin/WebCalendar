import styled from "styled-components";

export const StyledInput = styled.article`
  height: 40px;
  font-family: "Inter", sans-serif;
  border: none;
  outline: none;
  display: grid;
  grid-template-rows: 10px, 30px;
  grid-template-areas: "la" "in";
  position: relative;

  & label {
    grid-area: la;
    color: #323749;
    font-size: 10px;
    font-weight: 700;
    line-height: 10px;
    margin: 0px;
    padding: 0px;
    height: 10px;
  }

  & input {
    grid-area: in;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    line-height: 15px;
    color: #323749;
    outline: none;
    border: none;
    border-bottom: 1px solid ${({ error }) => (error ? "#FF5620" : "#737373")};
    margin-top: 6px;
    padding-bottom: 7px;
    width: ${({ width }) => (width ? width : "auto")};

    &:focus {
      border-color: #323749;
    }

    &:disabled {
      color: #737373;
      border-color: #737373;
      background-color: transparent;
    }
  }

  & img {
    width: 12px;
    position: absolute;
    right: 9px;
    top: 22px;
  }
  & p {
    color: #ff5620;
  }
`;
