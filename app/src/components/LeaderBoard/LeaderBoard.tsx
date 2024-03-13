import React from "react";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";

import { IUserData } from "../../types";

import { UserDataRow } from "./components/UserDataRow";
import { TableHeaderRow } from "./components/TableHeaderRow";
import { theme } from "../..";

interface ILeaderBoard {
  data: IUserData[] | [];
  deleteUser: (id: string) => void;
}

export const LeaderBoard: React.FC<ILeaderBoard> = ({ data, deleteUser }) => {
  return (
    <Box
      sx={{
        padding: "16px",
        overflow: "hidden",
        [theme.breakpoints.down("sm")]: {
          padding: "16px 0",
        },
      }}
    >
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableHeaderRow />
          </TableHead>
          <TableBody>
            {data.map((row: IUserData) => (
              <UserDataRow data={row} onDelete={deleteUser} key={row.userId} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
