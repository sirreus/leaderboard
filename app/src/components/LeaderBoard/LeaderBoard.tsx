import React from "react";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";

import { ILeaderBoard, IUserData } from "../../types";

import UserDataRow from "./components/UserDataRow";
import TableHeaderRow from "./components/TableHeaderRow";

export const LeaderBoard: React.FC<ILeaderBoard> = ({
  data,
  handelDeleteUser,
}) => {
  const sortedData = data.sort((a, b) => b.score - a.score);

  return (
    <Box sx={{ padding: "16px" }}>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableHeaderRow />
          </TableHead>
          <TableBody>
            {sortedData.map((row: IUserData) => (
              <UserDataRow
                data={row}
                handelDelete={handelDeleteUser}
                key={row.userId}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
