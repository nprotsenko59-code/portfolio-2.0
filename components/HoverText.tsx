import type { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

export default function HoverText({ children, as: Tag = "span", className = "" }: Props) {
  return (
    <Tag className={className}>
      <span className="hover-text relative inline-block">
        {children}
        <span aria-hidden className="hover-text__line" />
      </span>
    </Tag>
  );
}
