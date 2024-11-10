import styled from "styled-components";

export const StyledModal = styled.dialog`
  font-family: "Inter", sans-serif;
  min-width: ${({ width }) => (width ? width : "488px")};
  min-height: 234px;
  padding: 16px;
  box-shadow: 0 16px 50px 0 #0000003d;
  border: none;
  border-radius: 8px;
  top: ${({ top }) => (top ? top : "50%")};
  left: ${({ left }) => (left ? left : "50%")};
  transform: ${({ top, left }) =>
    top && left ? "none" : "translate(-50%, -50%)"};
  overflow: visible;

  &::backdrop {
    background-color: transparent;
  }
`;

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 25px;
  margin-bottom: 16px;
`;

export const StyledTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  height: 25px;
  margin: 0;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 24px;
`;

export const StyledCloseButton = styled.button`
  width: 12px;
  height: 12px;
  border: none;
  background: transparent url("src/shared/UIkit/assets/icons/closemark.svg")
    center/contain no-repeat;
  outline: none;
`;

export const StyledContentBar = styled.section`
  border-top: 1px solid #dedfe5;
  padding-top: 16px;
  line-height: 20px;
`;
