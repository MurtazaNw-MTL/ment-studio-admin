import { Avatar, Typography } from "@mui/material";
import React from "react";
import { MyTheme } from "src/layouts/customTheme";
const ShowAvatar = ({ name = "U", src = null, cusStyle = {} }) => {
  const FCh = name[0].toUpperCase();
  console.log(cusStyle, "<<cus");
  return src ? (
    <Avatar sx={{ ...cusStyle, bgcolor: MyTheme.bgColor1 }} src={src}>
      {FCh}
    </Avatar>
  ) : (
    <Avatar sx={{ ...cusStyle, bgcolor: MyTheme.bgColor1 }}>{FCh}</Avatar>
  );
};

export const TextAndIcon = ({ Icon, Text, onClick, copy = true }) => {
  return (
    <Typography
      display="flex"
      textAlign="right"
      className={`${copy ? "tooltip" : ""}`}
      onClick={onClick}
      width="fit-content"
    >
      <Icon fontSize="small" />{" "}
      <span style={{ marginLeft: "10px" }}>{Text}</span>
      <span className="tooltiptext">Click To Copy</span>
    </Typography>
  );
};

export const NoData = () => {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Typography color="red" fontSize={18}>
        No Data Found
      </Typography>
    </div>
  );
};

export default ShowAvatar;
