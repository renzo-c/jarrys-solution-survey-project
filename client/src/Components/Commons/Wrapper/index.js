import React from "react";

const Wrapper = ({ children, sx={} }) => {
  return <div style={{ padding: "5em 5em", ...sx }}>{children}</div>;
};

export default Wrapper;
