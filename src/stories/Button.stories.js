import React from "react";

import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

// Stories

/* The follow stories are created to check the interface created of each
condition created for the buttons */

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  label: "Button",
};

export const CircleButton = Template.bind({});
CircleButton.args = {
  primary: false,
  label: "Button",
  circle: true,
  height: "10rem",
  width: "10rem",
};
