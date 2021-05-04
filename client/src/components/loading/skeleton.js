import React from "react";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

export default function SkeletonBoxLoading() {
  return (
    <Box>
      <Skeleton variant="rect" style={{ width: "100%" }} />
      <Box>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </Box>
  );
}
