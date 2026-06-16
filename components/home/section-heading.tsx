import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
};

export function SectionHeading({ children }: SectionHeadingProps) {
  return <h2 className="text-xl font-semibold text-balance">{children}</h2>;
}
