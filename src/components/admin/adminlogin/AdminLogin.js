import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {IconButton, Checkbox, FormControl, OutlinedInput, InputLabel, InputAdornment, Paper, Divider} from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {postData} from '../../../services/FetchNodeAdminServices'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000">
        QuickComm Pvt. Ltd. Mumbai
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Create a custom theme for a professional look
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailId, setEmailId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async() => {
    if (!emailId || !password) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        showConfirmButton: false,
        timer: 2500,
        toast: true
      });
      return;
    }
    
    setIsLoading(true);
    try {
      var body = {
        emailid: emailId,
        password: password
      };
      var result = await postData('adminlogin/chk_admin_login', body);
      
      if(result.status) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
        navigate('/dashboard');
      } else {
        Swal.fire({
          icon: "error",
          title: result.message || "Invalid credentials",
          showConfirmButton: false,
          timer: 2500,
          toast: true
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Connection Error",
        text: "Please check your network connection",
        showConfirmButton: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              width: '100%', 
              p: 4, 
              borderRadius: 2,
              backgroundColor: 'white' 
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
                <AdminPanelSettingsIcon fontSize="large" />
              </Avatar>
              <Typography component="h1" variant="h4" sx={{ mt: 1 }}>
                Admin Portal
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Secure access to QuickComm management system
              </Typography>
            </Box>

            <Box>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                autoComplete="email"
                autoFocus
                variant="outlined"
                sx={{ mb: 2 }}
                placeholder="admin@quickcomm.com"
              />
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel htmlFor="outlined-adornment-password" required>Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" size="small" />}
                  label="Remember me"
                />
                <Link href="#" variant="body2" sx={{ textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ 
                  mt: 2, 
                  mb: 2, 
                  py: 1.5
                }}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Login as Admin"}
              </Button>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary" align="center">
                For access issues, please contact IT support at 
                <Link href="mailto:support@quickcomm.com" sx={{ ml: 0.5 }}>
                  support@quickcomm.com
                </Link>
              </Typography>
            </Box>
          </Paper>
          <Copyright sx={{ mt: 4, mb: 4 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}