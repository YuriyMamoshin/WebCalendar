import styled from "styled-components";

export const StyledOption = styled.li`
  font-family: "Inter", sans-serif;
  font-size: 15px;
  height: 36px;
  padding-left: 8px;
  background-color: ${({ isSelected }) =>
    isSelected ? "#E3E3E3" : "transparent"};
  list-style-type: none;
  cursor: pointer;

  &:hover {
    background-color: #f6f6f6;
  }
`;

export const StyledSelect = styled.article`
  width: ${({ width }) => (width ? width : "auto")};
  font-family: "Inter", sans-serif;
  height: 40px;
  position: relative;
  z-index: ${({ zIndex }) => zIndex};

  & header {
    position: relative;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 4px;

    & section {
      position: absolute;
      top: 37%;
    }
  }

  & main {
    max-height: 180px;
    overflow: auto;
    scrollbar-color: #dedfe5 transparent;
    scrollbar-width: thin;
    border: 1px solid #dee0e5;
    border-radius: 8px;
    box-shadow: 0 8px 16px 0 #3131311a;
    background-color: #ffffff;
  }

  & img {
    position: absolute;
    right: 8px;
    top: 50%;
  }
`;
