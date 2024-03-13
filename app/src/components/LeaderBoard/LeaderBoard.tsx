import React from "react";

import {
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableHeaderRow />
        </TableHead>
        <TableBody>
          {sortedData.map((row: IUserData) => (
            <UserDataRow data={row} handelDelete={handelDeleteUser} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
