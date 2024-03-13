import React, { SyntheticEvent } from "react";

import { Box, Tabs, Tab } from "@mui/material";

export const TabsBar: React.FC<{
  tabIndex: number;
  tabChange: (event: React.SyntheticEvent, newValue: number) => void;
}> = ({ tabIndex, tabChange }) => {
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
      }}
    >
      <Tabs value={tabIndex} onChange={tabChange} sx={{ paddingTop: "16px" }}>
        <Tab label="LEADERBOARD" />
        <Tab label="SETTINGS" />
      </Tabs>
    </Box>
  );
};
