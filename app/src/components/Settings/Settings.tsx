import React from "react";
import { ISettings } from "../../types";
import { Box, Slider, Typography } from "@mui/material";

export const Settings: React.FC<ISettings> = ({ mark, handleChange }) => {
  const MAX: number = 20;
  const MIN: number = 1;
  const marks = [
    {
      value: MIN,
      label: "",
    },
    {
      value: MAX,
      label: "",
    },
  ];

  return (
    <Box sx={{ minWidth: 304, width: "initial", padding: "0 16px" }}>
      <Typography
        id="table-size-slider"
        align="left"
        sx={{ marginTop: "16px" }}
      >
        Limit
      </Typography>
      <Slider
        marks={marks}
        step={1}
        value={mark}
        valueLabelDisplay="auto"
        aria-labelledby="table-size-slider"
        min={MIN}
        max={MAX}
        onChange={handleChange}
        sx={{ marginTop: "8px" }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">{MIN}</Typography>
        <Typography variant="body2">{MAX}</Typography>
      </Box>
    </Box>
  );
};
