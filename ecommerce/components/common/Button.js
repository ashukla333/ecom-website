import { useMemo } from "react";

const Button = ({
  onClick = () => {},
  className = "",
  type = "primary",
  value = "Button",
  children,
  ...props
}) => {
  const variant = useMemo(() => {
    return {
      primary:
        "p-2 bg-primary-color grid place-content-center rounded text-white-color border-[0.1rem] border-primary-color",
      secondary: "p-2 bg-white-color grid place-content-center rounded ",
      gradient:
        "p-2 text-white-color grid place-content-center rounded !bg-gradient-to-r !from-[rgb(0,15,154)] !to-[rgb(16,74,189)] ",
      linkButton: "underline bg-transparent border-none",
      ternary:
        "border-[0.1rem] border-black-color p-2 grid place-content-center rounded text-black-color",
    };
  }, []);
  return (
    <button
      onClick={onClick}
      className={`outline-none cursor-pointer ${variant[type]} ${className}`}
      {...props}
    >
      {children || value}
    </button>
  );
};

export default Button;
