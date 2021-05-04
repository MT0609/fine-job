import React from "react";
import { Container, Typography } from "@material-ui/core";

function NotFound() {
  return (
    <Container maxWidth="sm" style={{ paddingTop: "5rem" }}>
      <img
        alt="404"
        src="https://res.cloudinary.com/dghvjalhh/image/upload/c_scale,h_100,w_100/v1620033316/avatars/loupe_wzg9wc.png"
      />
      <Typography
        variant="h4"
        style={{
          color: "black",
          "-webkit-text-fill-color": "white",
          "-webkit-text-stroke-width": "1px",
          "-webkit-text-stroke-color": "black",
          "text-shadow": "2px 2px 5px #000",
          userSelect: "none",
        }}
      >
        Page Not Found
      </Typography>
    </Container>
  );
}

export default NotFound;
