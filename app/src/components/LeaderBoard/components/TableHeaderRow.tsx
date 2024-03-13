import React from "react";

import { TableCell, TableRow } from "@mui/material";

import { IUserData } from "../../../types";
import { theme } from "../../..";

export const TableHeaderRow = () => {
  type IUserDataShort = Omit<IUserData, "avatar" | "userId">;
  type ColumnNamesObject = Record<keyof IUserDataShort, undefined>;
  const ColumnNamesProps: ColumnNamesObject = {
    username: undefined,
    email: undefined,
    score: undefined,
  };
  const columnNameArray = Object.keys(ColumnNamesProps) as (keyof IUserData)[];

  const names = columnNameArray.map((name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  });

  names.unshift(""); // for avatar
  names.push(""); // for delete button

  return (
    <TableRow>
      {names.map((name, index) => (
        <TableCell
          align="left"
          key={index}
          width={name === "Score" || index === 0 ? "fit-content" : "100%"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              width: "fit-content",
            },
          }}
        >
          {name}
        </TableCell>
      ))}
    </TableRow>
  );
};
