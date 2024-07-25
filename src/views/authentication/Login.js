import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Box, Card, Stack, Typography, Button } from "@mui/material";
import metamask from "../../assets/images/logos/metamask.svg";
// components
import PageContainer from "src/components/container/PageContainer";
import Logo from "src/layouts/full/shared/logo/Logo";
import AuthLogin from "./auth/AuthLogin";
import { useDispatch } from "react-redux";
import { ACTIONS } from "src/Redux/Actions";
import MetamaskLogin from "src/components/metamask/metamasklogin";
import { CALL_API } from "src/services/APICalls";
import { toast } from "react-toastify";

// const Login2 = () => {
//   return (
//     <PageContainer title="Login" description="this is Login page">
//       <Box
//         sx={{
//           position: "relative",
//           "&:before": {
//             content: '""',
//             background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
//             backgroundSize: "400% 400%",
//             animation: "gradient 15s ease infinite",
//             position: "absolute",
//             height: "100%",
//             width: "100%",
//             opacity: "0.3"
//           }
//         }}
//       >
//         <Grid
//           container
//           spacing={0}
//           justifyContent="center"
//           sx={{ height: "100vh" }}
//         >
//           <Grid
//             item
//             xs={12}
//             sm={12}
//             lg={4}
//             xl={3}
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//           >
//             <Card
//               elevation={9}
//               sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
//             >
//               <Box display="flex" alignItems="center" justifyContent="center">
//                 <Logo />
//               </Box>
//               <AuthLogin
//                 subtext={
//                   <Typography
//                     variant="subtitle1"
//                     textAlign="center"
//                     color="textSecondary"
//                     mb={1}
//                   >
//                     Your Social Campaigns
//                   </Typography>
//                 }
//                 subtitle={
//                   <Stack
//                     direction="row"
//                     spacing={1}
//                     justifyContent="center"
//                     mt={3}
//                   >
//                     <Typography
//                       color="textSecondary"
//                       variant="h6"
//                       fontWeight="500"
//                     >
//                       New to Modernize?
//                     </Typography>
//                     <Typography
//                       component={Link}
//                       to="/auth/register"
//                       fontWeight="500"
//                       sx={{
//                         textDecoration: "none",
//                         color: "primary.main"
//                       }}
//                     >
//                       Create an account
//                     </Typography>
//                   </Stack>
//                 }
//               />
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>
//     </PageContainer>
//   );
// };

const Login2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showPopup = async () => {
    if (window.ethereum) {
      try {
        if (!metamask.address) {
          navigate("/auth/login");
          await window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then(async (res) => {
              let address = res[0];
              const { data } = await CALL_API.users.getByWallet(address);
              console.log(data, "<<thisisuser");
              if (data.data[0].role == "admin") {
                ACTIONS.saveMetamaskDetails(dispatch, { address });
                toast.success("Login successful!");
                await sessionStorage.setItem("metamask", "true");

                navigate("/subscriber");
              } else {
                toast.error("You are not authorized to access it");
              }
            });
        } else {
          navigate("/subscriber");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("install metamask extension!!");
    }
  };
  return (
    <PageContainer title="Login" description="this is Login page">
      <MetamaskLogin />
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3"
          }
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Grid container justifyContent="center" columnGap={3}>
                <Grid item xs={12} textAlign="center" mt={2}>
                  <img src={metamask} width="100px" />
                </Grid>
                <Grid item xs={10} textAlign="center" mt={3}>
                  <Button
                    variant="contained"
                    className="align-center metamask"
                    fullWidth
                    onClick={showPopup}
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px"
                    }}
                  >
                    Connect Metamask
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
