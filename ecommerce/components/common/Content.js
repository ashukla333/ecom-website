const Content = ({
    text,
    variant = 3,
    weight,
    className,
    id,
    index,
    onClick = () => {},
    children,
  }) => {
    const style = [
      "text-xs",
      "text-sm",
      "text-base",
      "text-lg",
      "text-xl",
      "text-2xl",
      "text-3xl",
      "text-4xl",
    ];
    const fontWeight = [
      "font-thin",
      "font-extralight",
      "font-light",
      "font-normal",
      "font-medium",
      "font-semibold",
      "font-bold",
      "font-extrabold",
      "font-black",
    ];
    return (
      <span
        onClick={onClick}
        id={id}
        key={index}
        className={` max-w-[30rem] ${fontWeight[weight - 1]} ${
          style[variant - 1]
        } ${className}  bg-transparent border-none ${onClick != null ? "" : ""}`}
      >
        {text || children}
      </span>
    );
  };
  
  export default Content;
  