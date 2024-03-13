import React from "react";

import { TableCell, TableRow } from "@mui/material";

import { IUserData } from "../../../../types";

export const TableHeaderRow = () => {
  type ColumnNamesObject = Record<keyof IUserData, undefined>;
  const ColumnNamesProps: ColumnNamesObject = {
    username: undefined,
    email: undefined,
    score: undefined,
  };
  const columnNameArray = Object.keys(ColumnNamesProps) as (keyof IUserData)[];

  const names = columnNameArray.map((name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  });

  names.push("");

  return (
    <TableRow>
      {names.map((name) => (
        <TableCell align="center" key={name}>
          {name}
        </TableCell>
      ))}
    </TableRow>
  );
};
