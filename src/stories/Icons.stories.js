import React from "react";
import styled from "styled-components";

import Icon from "./Icons";

export default {
  title: "Components/Icons",
  component: Icon,
};

const List = styled.li`
  display: flex;
  align-item: center;
`;

// Stories
export const SettingsIcon = () => {
  return (
    <List>
      <Icon icon="rec" size="5rem" />
      <Icon icon="play" size="5rem" />
      <Icon icon="trash" size="5rem" />
      <Icon icon="send" size="5rem" />
      <Icon icon="settings" size="5rem" />
    </List>
  );
};
