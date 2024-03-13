import React from "react";
import { Stack, Typography } from "@mui/material";

import yoloLogo from "../../../assets/yoloLogo.svg";

export const LogoTitle = () => {
  return (
    <Stack id="header-title" sx={{ marginLeft: "-60px" }}>
      <img src={yoloLogo} alt="yolo-logo" width={128} />
      <Typography
        variant="overline"
        fontSize={24}
        sx={{ marginLeft: "110px", lineHeight: "0.88" }}
      >
        Tech assignment
      </Typography>
    </Stack>
  );
};
