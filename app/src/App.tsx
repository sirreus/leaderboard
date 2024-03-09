import React, { useState } from "react";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";

import "./App.css";
import LeaderBoard from "./components/LeaderBoard";
import Settings from "./components/Settings";

function App() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tableSize, setTableSize] = useState<number>(10);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleTableSizeChange = (_: Event, newValue: number | number[]) => {
    setTableSize(newValue as number);
  };

  const isLeaderBoard = tabIndex === 0;
  const isSettings = tabIndex === 1;

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1" fontSize={32}>
          Leaders chart
        </Typography>
      </header>
      <Container component="main" sx={{ width: 768 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="LEADERBOARD" />
            <Tab label="SETTINGS" />
          </Tabs>
        </Box>
        {isLeaderBoard && <LeaderBoard />}
        {isSettings && (
          <Settings mark={tableSize} handleChange={handleTableSizeChange} />
        )}
      </Container>
    </div>
  );
}

export default App;
