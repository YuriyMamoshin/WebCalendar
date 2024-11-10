import styled from "styled-components";

export const StyledLink = styled.a`
  font-size: 15px;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: ${({ disabled }) => (disabled ? "#575D58" : "#00AE1C")};

  &:hover {
    border-color: ${({ disabled }) => (disabled ? "transparent" : "#00ae1c")};
  }

  &:active {
    border-color: ${({ disabled }) => (disabled ? "transparent" : "#0CD52B")};
    color: ${({ disabled }) => (disabled ? "transparent" : "#0CD52B")};
  }
`;
