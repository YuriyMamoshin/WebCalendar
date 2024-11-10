import Link from "src/components/Link/index.jsx";

export default {
  title: "Link",
  component: Link,
};

const Template = (args) => <Link {...args} />;

export const CustomLink = Template.bind({});
CustomLink.args = {
  label: "Link",
};
