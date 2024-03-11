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

  const isFilled = userDataList.length === tableSize;

  // Fetch the data
  useEffect(() => {
    function handelSetUserData(data: any) {
      setUserData(data);
    }

    const timeoutId = setTimeout(() => {
      socket.on("userData", handelSetUserData);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      socket.off("userData", handelSetUserData);
    };
  }, [socket]);

  // Filling out the table
  useEffect(() => {
    const existData = userDataList.find(
      (data) => data.userId === userData?.userId
    );

    if (userData && !existData) {
      if (isFilled) {
        const minScore = Math.min(...userDataList.map((user) => user.score));
        const minScoreIndex = userDataList.findIndex(
          (user) => user.score === minScore
        );

        // Compare the newUser's score with the minimum score
        if (userData.score > userDataList[minScoreIndex].score) {
          // Replace the userData with the minimum score with the newUser
          userDataList.splice(minScoreIndex, 1, {
            ...userData,
            isHighlighted: true,
          });
        }
      } else {
        updateUserDataList((prev) => [
          ...prev,
          { ...userData, isHighlighted: true },
        ]);
      }
    }
  }, [userData, userDataList, isFilled]);

  // Changing the amount of data in the table
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

  const handelDeleteUser = (id: string) => {
    const newArray = userDataList.filter((data) => data.userId !== id);
    updateUserDataList(newArray);
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
        {isLeaderBoard && (
          <LeaderBoard
            data={userDataList}
            handelDeleteUser={handelDeleteUser}
          />
        )}
        {isSettings && (
          <Settings mark={tableSize} handleChange={handleTableSizeChange} />
        )}
      </Container>
    </div>
  );
}

export default App;
