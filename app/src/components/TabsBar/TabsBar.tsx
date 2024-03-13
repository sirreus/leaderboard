import React from "react";

import { Box, Tabs, Tab } from "@mui/material";

import { useMobile } from "../../hooks/useMobile";

import { theme } from "../..";

export const TabsBar: React.FC<{
  tabIndex: number;
  tabChange: (event: React.SyntheticEvent, newValue: number) => void;
}> = ({ tabIndex, tabChange }) => {
  const isMobile = useMobile();

  return (
    <Box
      sx={{
        position: "fixed",
        width: "inherit",
        paddingTop: "16px",
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: "white",
        zIndex: 1,
        [theme.breakpoints.down("sm")]: {
          paddingTop: "32px",
        },
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={tabChange}
        sx={{ paddingTop: "16px" }}
        variant={isMobile ? "fullWidth" : "standard"}
      >
        <Tab label="LEADERBOARD" />
        <Tab label="SETTINGS" />
      </Tabs>
    </Box>
  );
};
