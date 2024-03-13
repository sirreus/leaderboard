import React from "react";
import { IUserDataRow } from "../../../../types";
import { TableCell, TableRow } from "@mui/material";

export const UserDataRow: React.FC<IUserDataRow> = ({ data }) => {
  return (
    <TableRow
      key={data.userId}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <img src={data.avatar} alt={data.username} width={32} />
      </TableCell>
      <TableCell align="center">{data.username}</TableCell>
      <TableCell align="center">{data.email}</TableCell>
      <TableCell align="center">{data.score}</TableCell>
      <TableCell align="center"></TableCell>
    </TableRow>
  );
};
