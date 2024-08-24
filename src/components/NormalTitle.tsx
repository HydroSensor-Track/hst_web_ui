import React, { ReactNode } from "react";
import { StyledTitle } from "../styled-components/Title";

const NormalTitle = ({ children }: { children: ReactNode }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default NormalTitle;
