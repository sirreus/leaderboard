import React from "react";
import { IUserDataRow } from "../../../../types";
import { TableCell, TableRow } from "@mui/material";

export const UserDataRow: React.FC<IUserDataRow> = ({ data }) => {
  return (
    <TableRow
      key={data.username}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {data.username}
      </TableCell>
      <TableCell align="right">{data.email}</TableCell>
      <TableCell align="right">{data.score}</TableCell>
    </TableRow>
  );
};
