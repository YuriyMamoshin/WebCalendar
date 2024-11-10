import styled from "styled-components";

export const StyledDropdown = styled.article`
  width: 88px;
  font-family: "Inter", sans-serif;
  cursor: pointer;

  & * {
    margin: 0;
    padding: 0;
  }

  & header {
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dee0e5;
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 #1018280d;
    margin-bottom: 4px;
    background-color: ${({ isMenuShown }) =>
      isMenuShown ? "#E0E0E0" : "transparent"};

    &:hover {
      background-color: #efefef;
    }

    & p {
      font-size: 15px;
      margin-right: 7px;
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
  }
`;

export const StyledItem = styled.li`
  height: 36px;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  display: flex;
  align-items: center;
  padding-left: 8px;
  background-color: ${({ isSelected }) =>
    isSelected ? "#E3E3E3" : "transparent"};
  list-style-type: none;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #f6f6f6;
  }
`;
