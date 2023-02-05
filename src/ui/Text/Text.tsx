import { createElement, HTMLProps, ReactNode } from "react";
import classnames from "classnames";
import "./Text.css";

export type TextElement = "h1" | "h2" | "h3" | "h4" | "p";

export type TextStyle =
  | "headingXL"
  | "headingL"
  | "headingM"
  | "headingS"
  | "bodyL"
  | "bodyM";

interface TextProps extends HTMLProps<HTMLElement> {
  renderAs?: TextElement;
  styleAs?: TextStyle;
  children: ReactNode;
}

const Text = ({
  renderAs = "p",
  styleAs = "bodyM",
  className,
  children,
  ...rest
}: TextProps) => {
  const props = { className: classnames(styleAs), ...rest };

  // ! Create a map and if no renderAs, grab the value of styleAs
  return createElement(renderAs, props, children);
};

export default Text;
