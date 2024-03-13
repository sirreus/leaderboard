import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import { Box, Container, Tab, Tabs, Typography } from "@mui/material";

import LeaderBoard from "./components/LeaderBoard";
import Settings from "./components/Settings";

import "./App.css";
import { IUserData } from "./types";

function App() {
  const socket = io("ws://localhost:3050");

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tableSize, setTableSize] = useState<number>(10);
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [userDataList, updateUserDataList] = useState<IUserData[]>([]);

  // fetch the data
  useEffect(() => {
    const notFilled = userDataList.length < tableSize;

    function handelSetUserData(data: any) {
      setUserData(data);
    }

    if (!userData || notFilled) socket.on("userData", handelSetUserData);

    return () => {
      socket.off("userData", handelSetUserData);
    };
  }, [socket, userData, tableSize, userDataList]);

  // filling out the table
  useEffect(() => {
    const existData = userDataList.find(
      (data) => data.userId === userData?.userId
    );
    if (userData && !existData) {
      updateUserDataList((prev) => [...prev, userData]);
    }
  }, [userData, userDataList]);

  // changing the amount of data in the table
  useEffect(() => {
    if (userDataList.length > tableSize) {
      const newArray = userDataList.slice(0, tableSize - 1);
      updateUserDataList(newArray);
    }
  }, [tableSize]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleTableSizeChange = (_: Event, newValue: number | number[]) => {
    setTableSize(newValue as number);
  };

  const isLeaderBoard = tabIndex === 0;
  const isSettings = tabIndex === 1;

  console.log(userData);

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
        {isLeaderBoard && <LeaderBoard data={userDataList} />}
        {isSettings && (
          <Settings mark={tableSize} handleChange={handleTableSizeChange} />
        )}
      </Container>
    </div>
  );
}

export default App;
