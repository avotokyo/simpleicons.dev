import { codeSurfaceClassName } from "@/lib/styles";

type CodeBlockProps = {
  children: string;
};

export function CodeBlock({ children }: CodeBlockProps) {
  return (
    <pre className={codeSurfaceClassName}>
      <code translate="no">{children}</code>
    </pre>
  );
}
