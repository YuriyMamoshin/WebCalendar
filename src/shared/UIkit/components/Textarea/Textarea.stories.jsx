import Textarea from "src/components/Textarea";

export default {
  name: "Textarea",
  component: Textarea,
};

const Template = (args) => <Textarea {...args} />;

export const CustomTextarea = Template.bind({});
CustomTextarea.args = {
  label: "Description",
  placeholder: "Type something here",
};
