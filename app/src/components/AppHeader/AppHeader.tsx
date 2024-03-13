import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import { theme } from "../..";
import AvatarSpinner from "../AvatarSpinner";

export const AppHeader: React.FC<{ data: string[] | [] }> = ({ data }) => {
  return (
    <Container
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        maxWidth: 768,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 0",
        marginBottom: "16px",
        backgroundColor: theme.palette.yoloYellow.main,
        borderRadius: "0 0 16px 16px",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Typography variant="h1" fontSize={32} color={theme.palette.yolo.main}>
          Leaders chart
        </Typography>
        {data.length > 1 && <AvatarSpinner avatars={data} />}
      </Stack>
    </Container>
  );
};
