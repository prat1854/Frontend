import {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { postData,getData,serverURL } from '../../../services/FetchNodeAdminServices';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function MyDrawer(props) {
    const [category,setCategory]=useState([])
    const user = useSelector(state => state.user);
    const userData = Object.values(user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(function(){
        fetchAllCategory()
    },[])
    const fetchAllCategory=async()=>{
        var result=await postData('userinterface/user_display_all_category',{status:'limit'})
        setCategory(result.data)
    }
    
    const handleLogout = () => {
      dispatch({type: "ADD_USER", payload: [{}, {}]});
      navigate('/homepage');
      props.setOpen(false);
    };
      

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={()=>props.setOpen(false)}>
      {userData?.length > 0 && (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AccountCircleIcon sx={{ fontSize: 60, color: '#0078ad', mb: 1 }} />
          <Box sx={{ fontWeight: 'bold', fontSize: 16, mb: 0.5 }}>
            {userData[0]?.firstname} {userData[0]?.lastname}
          </Box>
          <Box sx={{ fontSize: 14, color: 'text.secondary' }}>
            {userData[0]?.emailaddress || userData[0]?.mobileno}
          </Box>
        </Box>
      )}
      
      <Divider />
      
      <List>
        {category.map((item, index) => (
          <ListItem key={item.categoryid} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img src={`${serverURL}/images/${item.categoryicon}`} style={{width:40,height:40}} />
              </ListItemIcon>
              <ListItemText primary={item.categoryname} />
            </ListItemButton>
          </ListItem>
        ))}
         <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img src={`${serverURL}/images/Boxes.png`} style={{width:40,height:40}} />
              </ListItemIcon>
              <ListItemText primary="All Categories" />
            </ListItemButton>
          </ListItem>
        
      </List>
      <Divider />
      <List>
        {userData?.length > 0 ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/userdashboard')}>
                <ListItemIcon>
                  <AccountCircleIcon style={{fontSize:30}} />
                </ListItemIcon>
                <ListItemText primary="My Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/cartdisplaypage')}>
                <ListItemIcon>
                  <ShoppingCartIcon style={{fontSize:30}} />
                </ListItemIcon>
                <ListItemText primary="My Cart" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <PowerSettingsNewIcon style={{fontSize:30}} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/login')}>
              <ListItemIcon>
                <AccountCircleIcon style={{fontSize:30}} />
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      
      <Drawer open={props.open} onClose={()=>props.setOpen(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
