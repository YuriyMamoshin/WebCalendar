import Input from "src/components/Input";

export default {
  name: "Input",
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const CustomTextInput = Template.bind({});
CustomTextInput.args = {
  label: "Username*",
  placeholder: "Enter your username",
  errorMessage: "Error message",
  type: "text",
};

export const CustomPasswordInput = Template.bind({});
CustomPasswordInput.args = {
  label: "Password*",
  placeholder: "Enter your password",
  errorMessage: "Error message",
  type: "password",
};
