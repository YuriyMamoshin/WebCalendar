import styled from "styled-components";

export const StyledContainer = styled.aside`
  position: fixed;
  right: 30%;
  bottom: 20px;
`;

export const StyledToast = styled.article`
  width: 242px;
  height: 52px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 16px 50px 0 #0000003d;
  margin-top: 6px;

  & p {
    font-family: "Inter", sans-serif;
    font-size: 15px;
  }

  & button {
    width: 12px;
    height: 12px;
    border: none;
    background: transparent url("src/shared/UIkit/assets/icons/closemark.svg")
      center/contain no-repeat;
  }
`;
