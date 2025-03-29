import Paper from '@mui/material/Paper';
import { Button, Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useLocation, useNavigate } from 'react-router-dom';
import { postData } from '../../../services/FetchNodeAdminServices';
import { useDispatch } from 'react-redux';

export default function Otp() {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const mobileno = location?.state?.phonenumber;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [genOtp, setGenOtp] = useState(location?.state?.genOtp || '');
  const [timer, setTimer] = useState(0);

  // ✅ Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOtp = async () => {
    if (timer > 0) return;

    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGenOtp(newOtp);
    setOtp('');

    await postData("sms/sendotp", {
      otp: newOtp,
      mobileno: mobileno,
    });

    setSnackbarMessage('OTP resent successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);

    setTimer(30);
  };

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleVerify = async () => {
    if (otp == genOtp) {
      var response = await postData('userinterface/check_user_mobileno', { mobileno });
      if (response.status) {
        dispatch({ type: "ADD_USER", payload: [response.data.userid, response.data] });
        var res = await postData('userinterface/check_user_address', { userid: response.data.userid });
        if (res.status && res.data && res.data.length > 0) {
          console.log("Address data:", res.data[0]);
          var userDataWithAddress = { ...response.data, ...res.data[0] };
          dispatch({ type: "ADD_USER", payload: [response.data.userid, userDataWithAddress] });
        }
        navigate('/cartdisplaypage');
      } else {
        navigate("/setup", { state: { mobileno } });
      }
    } else {
      setSnackbarMessage('Invalid OTP. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <div>
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={4} style={{ width: 380, height: 'auto', padding: 10, marginTop: 45, borderRadius: 20, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 15 }}>
            <div>
              <img src={'/back.png'} onClick={() => navigate('/Login')} style={{ width: 20, height: 20, cursor: 'pointer' }} />
            </div>

            <div style={{ marginTop: 20, fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 950, fontSize: 25, letterSpacing: -0.72, lineHeight: 1 }}>
              OTP verification
            </div>

            <div onClick={() => navigate('/Login', { state: { phonenumber: mobileno } })} style={{ fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 500, fontSize: '1rem', letterSpacing: 0.2, lineHeight: 1.25, marginTop: 10, color: '#535c68' }}>
              Enter the OTP sent to you on<br /><span style={{ fontWeight: 550 }}>+91-{mobileno}</span><span style={{ marginLeft: 5, color: '#1B1464', fontWeight: 550, cursor: 'pointer' }}>Change Number</span>
            </div>

            <div style={{ marginTop: 35 }}>
              <MuiOtpInput value={otp} length={4} onChange={handleChange} />
            </div>

            <div
              onClick={handleResendOtp}
              style={{
                cursor: timer > 0 ? 'not-allowed' : 'pointer',
                marginLeft: '75%',
                marginTop: '5%',
                color: timer > 0 ? '#888' : '#1B1464',
                fontWeight: 550,
                pointerEvents: timer > 0 ? 'none' : 'auto',
              }}
            >
              {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
            </div>

            <Button
              fullWidth
              style={{
                border: '1px solid #ddd',
                borderRadius: 25,
                width: '100%',
                height: 50,
                marginTop: '25%',
                color: '#fff',
                background: '#0078ad',
                fontFamily: 'JioType, helvetica, arial, sans-serif',
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.07,
                lineHeight: 1.4285714286
              }}
              onClick={handleVerify}
            >
              Verify
            </Button>

            <div style={{ fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 500, fontSize: 11, letterSpacing: 0.5, lineHeight: 1.10, marginTop: 20, marginLeft: 2, color: '#535c68', marginBottom: '22%' }}>
              By Continuing, you agree to our terms and conditions of use, Privacy Policy and Retail Account Privacy Policy
            </div>
          </div>
        </Paper>
      </div>

      {/* ✅ Reusable Snackbar Component */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
