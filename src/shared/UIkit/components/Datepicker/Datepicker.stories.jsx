import Datepicker from "src/components/Datepicker";

export default {
  name: "Datepicker",
  component: Datepicker,
};

const Template = (args) => <Datepicker {...args} />;

export const CustomDatepicker = Template.bind({});
CustomDatepicker.args = {
  droppable: false,
  dateState: new Date(),
};
