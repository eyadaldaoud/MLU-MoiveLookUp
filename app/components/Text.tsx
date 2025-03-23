import { Text as NativeText, TextStyle } from "react-native";
import React from "react";

interface TextProps {
  className?: string; // Allow custom Tailwind classes
  style?: TextStyle; // Optional RN style prop for additional flexibility
  children: React.ReactNode;
}

const Text = ({ className = "", style, children }: TextProps) => {
  // Default Tailwind classes: text-black in light mode, text-white in dark mode
  const defaultClassName = "text-black dark:text-white";

  // Combine default and custom className
  const combinedClassName = `${defaultClassName} ${className}`.trim();

  return (
    <NativeText className={combinedClassName} style={style}>
      {children}
    </NativeText>
  );
};

export default Text;
