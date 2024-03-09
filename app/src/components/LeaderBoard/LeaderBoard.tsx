import React from "react";

import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import { IUserData } from "../../types";
import UserDataRow from "./components/UserDataRow";
import TableHeaderRow from "./components/TableHeaderRow";

export const LeaderBoard: React.FC = () => {
  const data: IUserData[] = [];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableHeaderRow />
        </TableHead>
        <TableBody>
          {data.map((row: IUserData) => (
            <UserDataRow data={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
