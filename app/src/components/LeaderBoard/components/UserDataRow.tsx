import React from "react";

import {
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useMobile } from "../../../hooks/useMobile";

import { IUserData } from "../../../types";

import { theme } from "../../..";

interface IUserDataRow {
  data: IUserData;
  onDelete: (id: string) => void;
}

export const UserDataRow: React.FC<IUserDataRow> = ({ data, onDelete }) => {
  const isMobile = useMobile();

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
      <TableCell
        component="th"
        scope="row"
        sx={{
          [theme.breakpoints.down("sm")]: {
            padding: "16px 8px",
          },
        }}
      >
        <img src={data.avatar} alt={data.username} width={32} />
      </TableCell>
      <TableCell align="left">
        {isMobile ? (
          <Stack>
            <Typography>{data.username}</Typography>
            <Typography variant="body2" color="grey">
              {data.email}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ marginTop: "8px" }}>
              <Typography variant="body1" color={theme.palette.yolo.light}>
                Score:
              </Typography>
              <Typography color={theme.palette.yolo.main}>
                {data.score}
              </Typography>
            </Stack>
          </Stack>
        ) : (
          data.username
        )}
      </TableCell>
      {!isMobile && <TableCell align="left">{data.email}</TableCell>}
      {!isMobile && <TableCell align="right">{data.score}</TableCell>}
      <TableCell
        align="center"
        sx={{
          [theme.breakpoints.down("sm")]: {
            padding: "16px 0",
          },
        }}
      >
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
