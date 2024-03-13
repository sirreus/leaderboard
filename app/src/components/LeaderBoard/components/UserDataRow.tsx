import React from "react";

import { IUserData } from "../../../types";

import { IconButton, TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { theme } from "../../..";

interface IUserDataRow {
  data: IUserData;
  onDelete: (id: string) => void;
}

export const UserDataRow: React.FC<IUserDataRow> = ({ data, onDelete }) => {
  const dataRowStyle = {
    "&:last-child td, &:last-child th": { border: 0 },
    animation: "highlight 1s ease-in-out",
    "@keyframes highlight": {
      from: {
        backgroundColor: theme.palette.yoloYellow.main,
      },
      to: {
        backgroundColor: "white",
      },
    },
  };

  return (
    <TableRow sx={{ ...dataRowStyle }}>
      <TableCell component="th" scope="row">
        <img src={data.avatar} alt={data.username} width={32} />
      </TableCell>
      <TableCell align="left">{data.username}</TableCell>
      <TableCell align="left">{data.email}</TableCell>
      <TableCell align="right">{data.score}</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => onDelete(data.userId)}>
          <DeleteIcon
            sx={{
              color: "red",
              opacity: 0.3,
              "&:hover": {
                opacity: 1,
              },
            }}
          />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
