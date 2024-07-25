import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Button
} from "@mui/material";

const DashboardCard = ({
  title,
  subtitle,
  children,
  ActionButton,
  actionText,
  callAction,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent
}) => {
  return (
    <Card sx={{ padding: 0 }} elevation={9} variant={undefined}>
      {cardheading ? (
        <CardContent>
          <Typography variant="h5">{headtitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ p: "30px" }}>
          {title ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={"center"}
              mb={3}
            >
              <Box>
                {title ? <Typography variant="h5">{title}</Typography> : ""}

                {subtitle ? (
                  <Typography variant="subtitle2" color="textSecondary">
                    {subtitle}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              {actionText && (
                <Button variant="outlined" onClick={callAction}>
                  {actionText}
                </Button>
              )}
            </Stack>
          ) : null}

          {children}
        </CardContent>
      )}

      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
