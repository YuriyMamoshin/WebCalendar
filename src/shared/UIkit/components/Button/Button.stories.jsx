import Button from "src/components/Button";

export default {
  title: "Button",
  component: Button,
  argTypes: { onClick: { action: "onClick" } },
};

const Template = (args) => <Button {...args} />;

export const CustomButton = Template.bind({});
CustomButton.args = {
  label: "Button",
  primary: true,
};
