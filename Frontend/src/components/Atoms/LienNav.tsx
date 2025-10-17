import React from "react";

interface LienNavProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  ariaLabel?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const LienNav: React.FC<LienNavProps> = ({
  children,
  href = "#",
  className = "",
  onClick,
  ariaLabel,
  ...props
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`px-3 py-2 text-sm rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};
