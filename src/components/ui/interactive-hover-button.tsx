import React from "react";
import { ArrowRight } from "lucide-react";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: string;
  rel?: string;
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, href, ...props }, ref) => {
  const Component = href ? 'a' : 'button';
  return (
    <Component
      ref={ref as any}
      href={href}
      className={cn(
        "group/btn relative w-auto cursor-pointer overflow-hidden rounded-full border border-gray-200 bg-white p-2 px-6 text-center font-semibold text-black inline-flex items-center",
        className
      )}
      {...(props as any)}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="h-2 w-2 rounded-full bg-black transition-all duration-300 group-hover/btn:scale-[100.8]"></div>
        <span className="inline-block transition-all duration-300 group-hover/btn:translate-x-12 group-hover/btn:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover/btn:-translate-x-3 group-hover/btn:opacity-100">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </Component>
  )
})
