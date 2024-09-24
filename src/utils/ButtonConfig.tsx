import { TFunction } from "i18next";
import { ReactElement } from 'react';

import { ButtonContainer } from "../styled-components/TopBar.tsx";
import Button from "../components/Button.tsx";
import Icon from "../components/Icon.tsx";

interface ButtonConfig {
  [key: string]: ReactElement | undefined;
}

export const useButtonConfig = (t: TFunction<"translation", undefined>): ButtonConfig => {
  return {
    "/": (
      <ButtonContainer>
        <Button label={t("downloadReport")} icon={<Icon name="download" />} />
        <Button label={t("createGraph")} icon={<Icon name="eastArrow" />} />
      </ButtonContainer>
    ),
    "/backoffice": (
      <ButtonContainer>
        <Button label={t("addNewUser")} icon={<Icon name="addUser" />} />
      </ButtonContainer>
    ),
    // Add more path configurations as needed
  };
};