import React from "react";

import { Stack, Typography } from "@mui/material";

import ghIcon from "../../../assets/gh.png";

import { theme } from "../../..";

interface IShortInfo {
  avatar: string | undefined;
  topValue: number;
}

export const ShortInfo: React.FC<IShortInfo> = ({ avatar, topValue }) => {
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
      }}
    >
      <Typography variant="h4" fontSize={32} color={theme.palette.yolo.main}>
        Top: <b>{topValue || "#10"}</b>
      </Typography>

      <Stack direction="row" alignItems="flex-start">
        <img src={ghIcon} alt="github" width={20} />
        <Typography variant="subtitle2" color={theme.palette.yolo.light}>
          GitHub users
        </Typography>
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
