import React from "react";

import { Alert, AlertTitle, Typography } from "@mui/material";

interface IErrorAlert {
  title: string;
  text?: string;
}

export const ErrorAlert: React.FC<IErrorAlert> = ({ title, text }) => {
  return (
    <Alert
      severity="error"
      sx={{
        width: "calc(100% - 32px)",
        marginTop: "96px",
        borderRadius: "16px",
        padding: "16px",
      }}
    >
      <AlertTitle sx={{ fontSize: "20px", fontWeight: 600, marginTop: "-4px" }}>
        {title}
      </AlertTitle>
      {text && <Typography>{text}</Typography>}
      <Typography>
        Our the best specialists already working on this problem.{" "}
        <b>Please stand by!</b>
      </Typography>
    </Alert>
  );
};
