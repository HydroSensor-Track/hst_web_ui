import React from "react";
import { StyledButton } from "../styled-components/Button";
import { useTheme } from "styled-components";

interface ButtonProps {
  icon?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  icon = null,
  label,
  onClick,
  type = "button",
  disabled = false,
  className,
}) => {
  const theme = useTheme();
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {icon && React.cloneElement(icon as React.ReactElement, {
        style: { fontSize: theme.sizes.iconSize },
      })}
      {label}
    </StyledButton>
  );
};

export default Button;
