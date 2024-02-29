import styles from "@/styles/components/button.module.scss";
import { FC } from "react";

interface Button extends React.HTMLAttributes<HTMLButtonElement> {
  type: string;
  disabled?: boolean;
}

const Button: FC<Button> = ({
  type = "default",
  onClick,
  className,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${
        {
          default: styles.default,
          blue: styles.blue,
          green: styles.green,
          red: styles.red,
        }[type]
      } ${disabled ? styles.disabled : ""}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
