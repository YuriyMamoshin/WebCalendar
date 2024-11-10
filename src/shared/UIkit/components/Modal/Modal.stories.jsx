import Modal from "src/components/Modal";

export default {
  name: "Modal",
  component: Modal,
};

const Template = (args) => <Modal {...args} />;

export const CustomModal = Template.bind({});
CustomModal.args = {
  title: "Title",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
};
