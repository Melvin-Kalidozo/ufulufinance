import { cn } from "@/lib/utils";

export function AuthBackground({
  grid = true,
  className,
}: {
  grid?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={cn("absolute inset-0 h-full w-full", className)}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="1440" height="900" fill="var(--background)" />
      <polygon
        points="0,0 520,0 220,900 0,900"
        fill="var(--primary)"
        opacity="0.1"
      />
      <polygon
        points="1440,0 1440,900 920,900 1300,0"
        fill="var(--primary)"
        opacity="0.08"
      />
      <polygon
        points="0,900 500,900 360,660 0,660"
        fill="var(--primary)"
        opacity="0.05"
      />
    </svg>
  );
}
