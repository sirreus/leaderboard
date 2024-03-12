import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import { Box, Container, Tab, Tabs } from "@mui/material";

import { IUserData } from "./types";

import AppHeader from "./components/AppHeader";
import LeaderBoard from "./components/LeaderBoard";
import Settings from "./components/Settings";

import "./App.css";

import { theme } from ".";

const socket = io("ws://localhost:3050", {
  autoConnect: false,
});

function App() {
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

    socket.connect();
    // EVENT LISTENERS
    // socket.on('connect_error', ) // TODO show DISCONNECTED
    // socket.on('connect', ) // TODO hide DISONNECTED if shown
    socket.on("userData", handelSetUserData);

    return () => {
      socket.off("userData", handelSetUserData);
      socket.disconnect();
    };
  }, []);

  // Filling out the table
  const compareScore = (newData: IUserData): void => {
    const minScore = Math.min(...userDataList.map((user) => user.score));
    const minScoreIndex = userDataList.findIndex(
      (user) => user.score === minScore
    );

    // Compare the newUser's score with the minimum score
    if (newData.score > userDataList[minScoreIndex].score) {
      // Replace the userData with the minimum score with the newUser
      userDataList.splice(minScoreIndex, 1, {
        ...newData,
      });
    }
  };
  useEffect(() => {
    const existData = userDataList.find(
      (data) => data.userId === userData?.userId
    );

    if (userData && !existData) {
      if (isFilled) {
        compareScore(userData);
      } else {
        updateUserDataList((prev) => [...prev, { ...userData }]);
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
      <AppHeader
        data={
          userDataList.length > 1 ? userDataList.map((data) => data.avatar) : []
        }
      />

      <Container
        component="main"
        sx={{
          width: 768,
          marginTop: "85px",
          paddingBottom: "24px",
          border: `2px solid ${theme.palette.yolo.main}`,
          borderRadius: "16px",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            sx={{ paddingTop: "16px" }}
          >
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
