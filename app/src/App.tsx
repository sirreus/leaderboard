import React, { useState, useEffect, useReducer, useCallback } from "react";
import io from "socket.io-client";

import { Box, Container } from "@mui/material";

import { IAppStore, IUserData } from "./types";

import AppHeader from "./components/AppHeader";
import LeaderBoard from "./components/LeaderBoard";
import Settings from "./components/Settings";
import TabsBar from "./components/TabsBar";
import ErrorAlert from "./components/ErrorAlert";

import { theme } from ".";

const socket = io("ws://localhost:3050", {
  autoConnect: false,
});

interface ReducerAction {
  type: string;
  payload: any;
}

function leaderBoardReducer(
  state: IAppStore,
  action: ReducerAction
): IAppStore {
  switch (action.type) {
    case "add_user": {
      const newUser: IUserData = action.payload;
      let { users } = state; // current list of users on the leader board
      const isFilled = users.length === state.tableSize;
      const userExists = users.find((data) => data.userId === newUser.userId);
      const minScore = users.length ? users[users.length - 1].score : 0;

      // Ignore adding a user if..
      if (
        // a user already in the list (check just in case)...
        userExists ||
        // or its score is lower then MIN of the TOP X
        (isFilled && newUser.score < minScore)
      )
        return state;

      // Make room for a new entry by removing a lower rank from a full list
      if (isFilled) {
        const looserId = users.find((user) => user.score === minScore)!.userId;
        users = users.filter((user) => user.userId !== looserId);
      }

      // New state with the new user on the leader board
      const newState: IAppStore = {
        ...state,
        users: [...users, newUser].sort((a, b) => b.score - a.score),
        lastAddedId: newUser.userId,
      };
      return newState;
    }

    case "del_user": {
      const id: string = action.payload;
      return {
        ...state,
        users: state.users.filter((user) => user.userId !== id),
      };
    }

    case "set_size": {
      const newTableSize: number = action.payload;

      return {
        tableSize: newTableSize,
        users: state.users.slice(0, newTableSize - 1),
      };
    }

    default:
      return state;
  }
}

function App() {
  const [isConnected, setConnected] = useState<boolean>(true);
  const [error, setError] = useState<{ name: string; msg: string } | null>(
    null
  );
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [{ tableSize, users, lastAddedId }, dispatch] = useReducer(
    leaderBoardReducer,
    {
      users: [],
      tableSize: 10,
    }
  );

  // Fetching the user data
  useEffect(() => {
    function handelSetUserData(data: any) {
      dispatch({ type: "add_user", payload: data });
    }

    socket.connect();

    // EVENT LISTENERS
    socket.on("connect_error", (error) => {
      setError({ name: "Connection error", msg: error.message });
      setConnected(false);
    });
    socket.on("connect", () => {
      if (socket.connected) {
        setConnected(true);
        setError(null);
      }
    });
    socket.on("userData", handelSetUserData);

    return () => {
      socket.off("userData", handelSetUserData);
      socket.disconnect();
    };
  }, []);

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setTabIndex(newValue);
    },
    []
  );

  const handleTableSizeChange = useCallback(
    (_: Event, newValue: number | number[]) => {
      dispatch({ type: "set_size", payload: newValue as number });
    },
    []
  );

  const handelDeleteUser = useCallback((id: string) => {
    dispatch({ type: "del_user", payload: id });
  }, []);

  const isLeaderBoard = tabIndex === 0;
  const isSettings = tabIndex === 1;

  const isOk = isConnected && !error;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "768px",
        margin: "0 auto",
        paddingTop: "136px",
        [theme.breakpoints.down("sm")]: {
          width: "100vw",
        },
      }}
    >
      <AppHeader
        topValue={tableSize}
        avatar={users.find((data) => data.userId === lastAddedId)?.avatar}
      />

      {error && (
        <ErrorAlert
          title={error.name}
          text="Oops!...Seems some crazy monkey bit the wire :("
        />
      )}

      {isOk && (
        <Container
          component="main"
          sx={{
            width: "inherit",
            padding: "0 0 24px 0 !important",
            [theme.breakpoints.down("sm")]: {
              width: "calc(100vw - 16px)",
              padding: "136px 16px 32px",
            },
          }}
        >
          <TabsBar tabIndex={tabIndex} tabChange={handleTabChange} />

          <Box
            id="tab-content-wrapper"
            sx={{
              paddingTop: "80px",
              [theme.breakpoints.down("sm")]: {
                paddingTop: "96px",
              },
            }}
          >
            {isLeaderBoard && (
              <LeaderBoard data={users} deleteUser={handelDeleteUser} />
            )}
            {isSettings && (
              <Settings mark={tableSize} handleChange={handleTableSizeChange} />
            )}
          </Box>
        </Container>
      )}
    </Box>
  );
}

export default App;
