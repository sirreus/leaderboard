import React from "react";

import { Stack, Typography } from "@mui/material";

import { useMobile } from "../../../hooks/useMobile";

import ghIcon from "../../../assets/gh.png";

import { theme } from "../../..";

interface IShortInfo {
  avatar: string | undefined;
  topValue: number;
}

export const ShortInfo: React.FC<IShortInfo> = ({ avatar, topValue }) => {
  const isMobile = useMobile();

  return (
    <Stack
      id="short-info"
      direction="column"
      spacing={1}
      sx={{
        position: "absolute",
        top: "16px",
        right: "-64px",
        padding: "40px 24px 24px",
        borderRadius: "12px",
        backgroundColor: theme.palette.yoloYellow.main,
        [theme.breakpoints.down("sm")]: {
          top: "8px",
          right: "8px",
          padding: "16px",
        },
      }}
    >
      <Stack direction={isMobile ? "column" : "column"} spacing={1}>
        <Typography
          variant="h4"
          fontSize={isMobile ? 24 : 32}
          color={theme.palette.yolo.main}
        >
          Top: <b>{topValue || "#10"}</b>
        </Typography>

        <Stack direction="row" alignItems="flex-start">
          <img src={ghIcon} alt="github" width={isMobile ? 24 : 20} />
          <Typography
            variant={isMobile ? "subtitle1" : "subtitle2"}
            color={theme.palette.yolo.light}
          >
            GitHub users
          </Typography>
        </Stack>
      </Stack>

      {avatar && (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography sx={{ paddingLeft: "4px" }}>New one -</Typography>
          <img src={avatar} alt="new-one-ava" width={25} />
        </Stack>
      )}
    </Stack>
  );
};
