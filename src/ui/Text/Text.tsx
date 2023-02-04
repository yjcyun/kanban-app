import { createElement, HTMLProps, ReactNode } from "react";
import classnames from "classnames";
import "./Text.css";

type VariantMap = {
  headingXL: "h1";
  headingL: "h2";
  headingM: "h3";
  headingS: "h4";
  bodyL: "p";
  bodyM: "p";
};

type ValueOfVariantsMap<T> = T[keyof T];

interface TextProps extends HTMLProps<HTMLElement> {
  renderAs: ValueOfVariantsMap<VariantMap>;
  styleAs: keyof VariantMap;
  children: ReactNode;
}

const Text = ({
  renderAs,
  styleAs,
  className,
  children,
  ...rest
}: TextProps) => {
  const props = { className: classnames(styleAs), ...rest };

  return createElement(renderAs, props, children);
};

export default Text;
