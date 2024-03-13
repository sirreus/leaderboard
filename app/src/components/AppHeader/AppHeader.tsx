import React from "react";

import { Box, Container } from "@mui/material";

import { LogoTitle } from "./components/LogoTitle";
import { ShortInfo } from "./components/ShortInfo";

import { theme } from "../..";

interface IAppHeader {
  topValue: number;
  avatar: string | undefined;
}

export const AppHeader: React.FC<IAppHeader> = ({ topValue, avatar }) => {
  return (
    <Container
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        maxWidth: "768px !important",
        height: "136px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 0",
        backgroundColor: "#f2f2f2",
        borderRadius: "0 0 16px 16px",
        zIndex: 2,
        [theme.breakpoints.down("sm")]: {
          width: "calc(100vw - 16px)",
          padding: "8px 0 16px",
        },
      }}
    >
      <Box id="content-wrapper" sx={{ width: "100%", position: "relative" }}>
        <LogoTitle />
        <ShortInfo avatar={avatar} topValue={topValue} />
      </Box>
    </Container>
  );
};
