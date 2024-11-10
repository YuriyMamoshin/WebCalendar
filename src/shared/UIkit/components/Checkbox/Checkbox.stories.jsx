import Checkbox from "src/components/Checkbox";

export default {
  name: "Checkbox",
  type: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const CustomCheckbox = Template.bind({});
CustomCheckbox.args = {
  label: "Check me",
};
