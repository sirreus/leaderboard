import React from "react";

import { TableCell, TableRow } from "@mui/material";

import { useMobile } from "../../../hooks/useMobile";

import { IUserData } from "../../../types";
import { theme } from "../../..";

export const TableHeaderRow = () => {
  const isMobile = useMobile();

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

  const DesktopTableHeader = () => (
    <>
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
    </>
  );

  const MobileTableHeader = () => (
    <>
      <TableCell align="center" />
      <TableCell align="left" sx={{ wordWrap: "break-word" }}>
        User
      </TableCell>
      <TableCell align="center" />
    </>
  );

  return (
    <TableRow>
      {isMobile ? <MobileTableHeader /> : <DesktopTableHeader />}
    </TableRow>
  );
};
