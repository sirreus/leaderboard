import React from "react";
import { Stack, Typography } from "@mui/material";

import { useMobile } from "../../../hooks/useMobile";

import yoloLogo from "../../../assets/yoloLogo.svg";
import { theme } from "../../..";

export const LogoTitle = () => {
  const isMobile = useMobile();

  return (
    <Stack
      id="header-title"
      sx={{
        marginLeft: "-60px",
        [theme.breakpoints.down("sm")]: {
          marginLeft: "8px",
        },
      }}
    >
      <img src={yoloLogo} alt="yolo-logo" width={isMobile ? 96 : 128} />
      <Typography
        variant="overline"
        sx={{
          marginLeft: "110px",
          fontSize: "24px",
          lineHeight: "0.88",
          [theme.breakpoints.down("sm")]: {
            marginLeft: "36px",
            fontSize: "14px",
            lineHeight: "1.5",
          },
        }}
      >
        Tech assignment
      </Typography>
    </Stack>
  );
};
