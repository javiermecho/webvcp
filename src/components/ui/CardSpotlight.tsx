import React, { useRef, useState } from "react";
import { cn } from "../../lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "rgba(0, 183, 227, 0.18)",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.current = clientX - left;
    mouseY.current = clientY - top;
    if (cardRef.current) {
      cardRef.current.style.setProperty("--mouse-x", `${mouseX.current}px`);
      cardRef.current.style.setProperty("--mouse-y", `${mouseY.current}px`);
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group/spotlight relative rounded-3xl border border-[#DBDAD7] bg-white p-8 overflow-hidden transition-all duration-300",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100 z-1"
        style={{
          background: `radial-gradient(${radius}px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${color}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};
