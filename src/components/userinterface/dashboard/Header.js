import {useState}from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../../assets/logo.png'
import TextBoxSearch from './TextBoxSearch';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Badge } from '@mui/material';
import MyMenuBar from './MyMenuBar';
import MyDrawer from './MyDrawer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function Header() {
  var cartData=useSelector(state=>state.cart)
  var user=useSelector(state=>state.user)
 
  var userData=Object.values(user)
  var keys=Object.keys(cartData)
  var navigate=useNavigate()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [open,setOpen]=useState(false)
  
  // Check if user is logged in
  const isUserLoggedIn = userData && userData.length > 0 && userData[0]?.firstname;
  
  const handleClick=()=>{
    setOpen(true)
  }

  const handleSignInClick = () => {
    navigate('/login'); // Replace with your login route
  };

  const handleUserProfileClick = () => {
    if (isUserLoggedIn) {
      navigate('/userdashboard'); // Navigate to the user dashboard
    } else {
      navigate('/login'); // Navigate to login if not logged in
    }
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         {matches?<div></div>:<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={handleClick} />
          </IconButton>}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
          
          <Typography onClick={()=>navigate('/homepage')}  variant="h6" component="div" style={{cursor:'pointer', display:'flex',alignItems:'center' }}>
            <img src={logo} style={{width:70,height:70}}/>
            <div style={{fontWeight:'bold',fontSize:24}}>QuickComm</div>
          </Typography>
       {matches?<TextBoxSearch />:<div></div>}
          


      <div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={keys.length} color="secondary">
            <ShoppingCartIcon onClick={()=>navigate('/cartdisplaypage')}/>
            </Badge>
          </IconButton>
           
          {matches?<IconButton
           
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountCircleIcon style={{fontSize:30}} onClick={handleUserProfileClick}/>
            {isUserLoggedIn 
              ? <div style={{marginLeft:5,fontWeight:'bold',fontSize:16}} onClick={handleUserProfileClick}>{userData[0].firstname}</div>
              : <div style={{marginLeft:5,fontWeight:'bold',fontSize:16}} onClick={handleSignInClick}>Sign In</div>
            }
          </IconButton>:<div></div>}
           </div>
           </div>
          
        </Toolbar>
      </AppBar>
      { matches?<div></div>:
      <AppBar position="static" >
        <Toolbar>
        <div style={{width:'100%',display:'flex',alignItems:'center', justifyContent:'center'}}>
        <TextBoxSearch width="85%"/>
        </div>
        </Toolbar>
      </AppBar>
     }
  
{ matches?
     <MyMenuBar/>:<div></div>}
     <MyDrawer open={open} setOpen={setOpen} />
    </Box>
  );
}