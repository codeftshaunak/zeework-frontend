"use client";

import { Button } from "@chakra-ui/react";

interface CTAButtonProps {
  size?: string;
  bg?: string;
  fontWeight?: string | number;
  color?: string;
  padding?: string;
  borderRadius?: string;
  border?: string;
  width?: string;
  height?: string;
  margin?: string;
  textAlign?: string;
  hoverbg?: string;
  hoverborder?: string;
  hovercolor?: string;
  action?: () => void;
  disabled?: boolean;
  type?: string;
  text?: string;
  onClick?: () => void;
  [key: string]: any;
}

const CTAButton: React.FC<CTAButtonProps> = (props) => {
  return (
    <Button
      size={props.size ? props.size : "lg"}
      background={props.bg ? props.bg : "brand.300"}
      fontWeight={props.fontWeight}
      color={props.color ? props.color : "#6B7280"}
      padding={props.padding ? props.padding : "2px 25px"}
      borderRadius={props.borderRadius ? props.borderRadius : "5px"}
      border={props.border ? props.border : `1px solid ${props.bg}`}
      width={props.width}
      height={props.height}
      margin={props.margin}
      textAlign={props.textAlign}
      _hover={{
        background: props.hoverbg ? props.hoverbg : "white",
        border: props.hoverborder ? props.hoverborder : "1px solid #22C55E",
        color: props.hovercolor ? props.hovercolor : "#374151",
      }}
      onClick={props.action || props.onClick}
      disabled={props.disabled}
      {...props}
      type={props.type}
      transition={"0.3s ease-in-out"}
    >
      {props.text ? props.text : "Get Started"}
    </Button>
  );
};

export default CTAButton;
