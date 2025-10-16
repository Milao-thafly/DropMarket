import React from "react";

export const ContactUs = ({
  email = "contact@save-people.org",
  children = "Contact Us",
  className = "",
  ...props
}) => {
  return (
    <a
      href={`mailto:${email}`}
      className={`text-sm hover:underline text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};
