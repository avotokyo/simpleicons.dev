import { cn } from "@/lib/utils";

type CodeBlockProps = {
  children: string;
  className?: string;
};

export function CodeBlock({ children, className }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-md bg-muted p-4 font-mono text-sm",
        className,
      )}
    >
      <code translate="no">{children}</code>
    </pre>
  );
}
