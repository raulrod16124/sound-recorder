import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

/* The styled component is used to apply the 
tag styles directly in the component and have access
to manage the conditions arrived as a props */

const Btn = styled.button`
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: ${(props) => (props.circle ? "0.8rem" : "0.2rem")} solid #111010;
  border-radius: ${(props) => (props.circle ? "50%" : "5rem")};
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
  }
`;

export default function Button({
  label,
  primary,
  width,
  height,
  margin,
  circle,
  ...props
}) {
  return (
    <Btn
      type="button"
      primary={primary}
      width={width}
      height={height}
      margin={margin}
      circle={circle}
      {...props}
    >
      {label}
    </Btn>
  );
}

Button.propTypes = {
  primary: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

Button.defaultProps = {
  primary: true,
};
