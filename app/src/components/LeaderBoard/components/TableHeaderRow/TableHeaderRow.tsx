import React from "react";

import { TableCell, TableRow } from "@mui/material";

import { IUserData } from "../../../../types";

export const TableHeaderRow = () => {
  type IUserDataShort = Omit<IUserData, "avatar" | "userId" | "isHighlighted">;
  type ColumnNamesObject = Record<keyof IUserDataShort, undefined>;
  const ColumnNamesProps: ColumnNamesObject = {
    email: undefined,
    score: undefined,
    username: undefined,
  };
  const columnNameArray = Object.keys(ColumnNamesProps) as (keyof IUserData)[];

  const names = columnNameArray.map((name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  });

  names.unshift("");
  names.push("");

  return (
    <TableRow>
      {names.map((name, index) => (
        <TableCell align="center" key={index}>
          {name}
        </TableCell>
      ))}
    </TableRow>
  );
};
