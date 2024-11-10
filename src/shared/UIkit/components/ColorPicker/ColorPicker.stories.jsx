import ColorPicker from "src/components/ColorPicker";

export default {
  name: "ColorPicker",
  component: ColorPicker,
};

const Template = (args) => <ColorPicker {...args} />;

export const CustomColorPicker = Template.bind({});
CustomColorPicker.args = {
  colors: [
    "#9F2957",
    "#D90056",
    "#E25D33",
    "#DFC45A",
    "#B8C42F",
    "#16AF6E",
    "#429488",
    "#397E49",
    "#439BDF",
    "#4254AF",
    "#6C7AC4",
    "#8332A4",
  ],
  label: "Color",
};
