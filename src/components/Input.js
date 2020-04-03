import styled from "@emotion/styled";

export const StyledInputWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-evenly;
  transition: opacity 400ms;
  ${props => props.active ? `
    visibility: visible;
    opacity: 1;
    ` : `
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 400ms,
  `}
`;

export const StyledInput = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  letter-spacing: 1px;
  color: hsl(0, 0%, 20%);
`;