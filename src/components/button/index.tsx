import React from "react";

export interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  backgroundColor?: string;
  color?: string;
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Accept a function as a prop
}

export const Button: React.FunctionComponent<IButtonProps> = (props) => {
  const { children, backgroundColor, color, style, onButtonClick, ...rest } = props;

  let _style: React.CSSProperties = style || {};

  /** Override Defaults */
  if (backgroundColor && _style) _style.backgroundColor = backgroundColor;
  if (color && _style) _style.color = color;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(
      "Button clicked inside Shared Component!",
      process.env.REACT_APP_RESPONSE_FROM
    );

    // Call the prop function (if provided) when the button is clicked
    if (onButtonClick) {
      onButtonClick(event);
    }
  };

  return (
    <button style={_style} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};
export default Button;
