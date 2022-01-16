import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { iconsPath } from "./shared/iconsPath";

const Svg = styled.svg`
  display: flex;
  cursor: pointer;

  width: ${(props) => (props.size ? props.size : "4rem")};
  height: ${(props) => (props.size ? props.size : "4rem")};
`;

const Path = styled.path`
  fill: currentColor;
`;

export default function Icon({ icon, block, color, rotate, size, ...props }) {
  const renderIcon = () => {
    switch (icon) {
      case "rec":
        return <rect width={size} height={size} rx="15" fill={color} />;
      default:
        return (
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d={iconsPath[icon]}
            style={{ color: color }}
            strokeLinecap="round"
          />
        );
    }
  };

  return (
    <Svg viewBox="0 0 95 95" size={size} {...props}>
      {renderIcon()}
    </Svg>
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

Icon.defaultProps = {
  size: "4rem",
  color: "#28cac0",
};
