import { ComponentStory, ComponentMeta } from "@storybook/react";

import Text, { TextElement, TextStyle } from "./Text";

export default {
  title: "UI/Text",
  component: Text,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Text>;

const variantMap = {
  headingXL: "h1",
  headingL: "h2",
  headingM: "h3",
  headingS: "h4",
  bodyL: "p",
  bodyM: "p",
};

export const Default: ComponentStory<typeof Text> = (args) => {
  const variantMapArray = Object.entries(variantMap) as [
    TextStyle,
    TextElement
  ][];

  return (
    <div>
      {variantMapArray.map(([styleAs, renderAs], index) => (
        <Text {...args} styleAs={styleAs} renderAs={renderAs} key={index}>
          {styleAs}
        </Text>
      ))}
    </div>
  );
};
