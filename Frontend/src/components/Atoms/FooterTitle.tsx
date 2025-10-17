import React from "react";

export const FooterTitle = ({
  text = "SAVE-PEOPLE™ 2025",
  className = "",
  ...props
}) => {
  return (
    <p
      className={`text-xs text-gray-500 tracking-wide ${className}`}
      {...props}
    >
      {text}
    </p>
  );
};
