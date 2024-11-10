import Dropdown from "src/components/Dropdown";

export default {
  name: "Dropdown",
  component: Dropdown,
};

const Template = (args) => <Dropdown {...args} />;

export const CustomDropdown = Template.bind({});
CustomDropdown.args = {
  label: "Time",
  items: [
    { label: "Day", value: "Day" },
    { label: "Week", value: "Week" },
  ],
  placeholder: "Choose",
};
