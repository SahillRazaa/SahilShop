import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};
export const maximobile = (props) => {
  return css`
    @media only screen and (max-width: 480px) {
      ${props}
    }
  `;
};
export const maxilap = (props) => {
  return css`
    @media only screen and (max-width: 1250px) {
      ${props}
    }
  `;
};
export const miniminilap = (props) => {
  return css`
    @media only screen and (max-width: 1150px) {
      ${props}
    }
  `;
};
export const minilap = (props) => {
  return css`
    @media only screen and (max-width: 940px) {
      ${props}
    }
  `;
};
export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 840px) {
      ${props}
    }
  `;
};
export const minitablet = (props) => {
  return css`
    @media only screen and (max-width: 750px) {
      ${props}
    }
  `;
};
export const miniminitablet = (props) => {
  return css`
    @media only screen and (max-width: 630px) {
      ${props}
    }
  `;
};
export const maxiphone = (props) => {
  return css`
    @media only screen and (max-width: 580px) {
      ${props}
    }
  `;
};