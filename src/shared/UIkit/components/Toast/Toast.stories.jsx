import Toast from "src/components/Toast";

export default {
  name: "Toast",
  component: Toast,
};

const Template = (args) => <Toast {...args} />;

export const CustomToast = Template.bind({});
CustomToast.args = {
  message: "Some message",
  duration: 5,
};
