import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 0.2rem solid #111010;
  border-radius: 1.5rem;
  transition: all.3s ease-out;

  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  color: ${(props) => (props.primary ? "#28cac0" : "#373644")};
  background-color: ${(props) => (props.primary ? "#292739" : "#28cac0")};
  margin: ${(props) => (props.margin ? props.margin : "auto")};

  &:hover {
    background-color: ${(props) => (props.primary ? "#373644" : "#4fe6db")};
  }

  @media (max-width: 900px) {
    font-size: 1.2rem;
    padding: 1rem;
    border-radius: 0.8rem;
  }
`;

export const Button = ({ label, primary, width, height, margin, ...props }) => {
  return (
    <Btn
      type="button"
      primary={primary}
      width={width}
      height={height}
      {...props}
    >
      {label}
    </Btn>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

Button.defaultProps = {
  primary: true,
};
