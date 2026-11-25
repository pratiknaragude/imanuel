import clsx from "clsx";

export function GlassPanel({
  children,
  className,
  dark,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={clsx(
        dark ? "glass-dark" : "glass-panel",
        "rounded-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}
