import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import logo from "../../../assets/logo.png";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";
import { postData } from "../../../services/FetchNodeAdminServices";

export default function Login() {
  const [phonenumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-fill number if coming from Otp "Change Number"
  useState(() => {
    if (location?.state?.phonenumber) {
      setPhoneNumber(location.state.phonenumber);
    }
  }, []);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fetchSmsApi = async (genOtp) => {
    await postData("sms/sendotp", {
      otp: genOtp,
      mobileno: phonenumber,
    });
  };

  const handleNextPage = () => {
   // const genOtp = Math.floor(10000 + Math.random() * 90000).toString(); // 5 digit otp generate karega
    const genOtp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP

  
    // 1. Show Snackbar with OTP
      showSnackbar(`Your OTP is ${genOtp}`, "info");
   //   showSnackbar(`Your OTP is Sent to ${phonenumber}`, "info");
   
   
      // 2. Send OTP to backend
    fetchSmsApi(genOtp);
  
    // 3. Delay navigation by 4 seconds (enough time to read OTP)
    setTimeout(() => {
      navigate("/otp", { state: { phonenumber, genOtp } });
    }, 4000);
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={4}
          style={{
            width: 380,
            height: "auto",
            padding: 10,
            marginTop: 55,
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: 15 }}>
            <div>
              <img
                src={"/cross.png"}
                onClick={() => navigate("/homepage")}
                style={{ width: 20, height: 20, cursor: "pointer" }}
                alt="close"
              />
            </div>

            <div style={{ display: "flex", position: "relative" }}>
              <div
                style={{
                  marginTop: 20,
                  fontFamily: "JioType, helvetica, arial, sans-serif",
                  fontWeight: 950,
                  fontSize: 25,
                  letterSpacing: -0.72,
                  lineHeight: 1,
                }}
              >
                Sign in
              </div>
              <div>
                <img
                  src={logo}
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    width: "18%",
                    marginLeft: "55%",
                    marginTop: "5%",
                  }}
                  alt="logo"
                />
              </div>
            </div>

            <div
              style={{
                fontFamily: "JioType, helvetica, arial, sans-serif",
                fontWeight: 500,
                fontSize: "1rem",
                letterSpacing: -0.72,
                lineHeight: 1.25,
                marginTop: 10,
                color: "#535c68",
              }}
            >
              Verify Your Mobile Number to <br />
              access your Quickcomm Account
            </div>

            <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: "5%" }}>
              <div style={{ marginBottom: 5 }}>+91-</div>
              <TextField
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,10}$/.test(input)) {
                    setPhoneNumber(input);
                  }
                }}
                value={phonenumber}
                label="Mobile Number"
                fullWidth
                variant="standard"
              />
            </Box>

            <Button
              fullWidth
              style={{
                border: "1px solid #ddd",
                borderRadius: 25,
                width: "100%",
                height: 50,
                marginTop: "35%",
                color: "#fff",
                background: "#0078ad",
                fontFamily: "JioType, helvetica, arial, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.07,
                lineHeight: 1.4285714286,
              }}
              onClick={handleNextPage}
              disabled={phonenumber.length !== 10}
            >
              Continue
            </Button>

            <div
              style={{
                fontFamily: "JioType, helvetica, arial, sans-serif",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: 0.5,
                lineHeight: 1.1,
                marginTop: 20,
                marginLeft: 2,
                color: "#535c68",
                marginBottom: "25%",
              }}
            >
              By Continuing, you agree to our terms and conditions of use, Privacy Policy and
              Retail Account Privacy Policy
            </div>
          </div>
        </Paper>
      </div>

      {/* ✅ Snackbar Component */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
