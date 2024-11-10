import styled from "styled-components";

export const StyledWrapper = styled.main`
  height: 40px;
  z-index: ${({ zIndex }) => (zIndex ? zIndex : 0)};
  margin-bottom: ${({ droppable }) => (!droppable ? "244px" : "0")};
`;
