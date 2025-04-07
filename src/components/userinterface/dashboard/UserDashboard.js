import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, 
  ListItemButton, Button, Card, CardContent, Badge, Chip, Container, IconButton, Tab, Tabs, TextField, 
  CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postData, getData, serverURL } from '../../../services/FetchNodeAdminServices';
import Header from '../homepage/Header';
import Footer from '../homepage/Footer';

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Custom styled components
const DashboardSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  height: '50%',
  display: 'flex',
  flexDirection: 'column',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto',
  border: '4px solid white',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor: 
    status === 'Delivered' ? '#4caf50' : 
    status === 'Processing' ? '#ff9800' :
    status === 'Shipped' ? '#2196f3' : '#f44336',
  color: 'white',
  fontWeight: 'bold',
}));

const OrderCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: 8,
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
}));

// Address Card ki css design 
const AddressCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 8,
  marginBottom: theme.spacing(30),
  position: 'relative',
  height: 'calc(99% - 40px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  paddingTop: '12px',
}));

// Stat Card ki css design upr teen bane hai shop truck payment 
const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 12,
  height: '100%',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
}));

export default function UserDashboard() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // User data from Redux
  const user = useSelector(state => state.user);
  const userData = Object.values(user);
  const reduxOrders = useSelector(state => state.orders);
  
  // Initialize all state variables at the top level
  const [orderHistory, setOrderHistory] = useState([]);
  
  // Tab state
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);

  // Edit Profile dialog state
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [editProfileData, setEditProfileData] = useState({
    firstname: '',
    lastname: '',
    emailaddress: '',
    mobileno: '',
    gender: '',
    dob: ''
  });
  
  // Check if user is logged in and get orders from Redux
  useEffect(() => {
    if (!userData || userData.length === 0 || !userData[0]?.firstname) {
      // User is not logged in, redirect to login page
      navigate('/login', { replace: true });
    } else {
      // Get orders from Redux store for this user
      const userOrders = reduxOrders.filter(order => order.userid === userData[0]?.userid);
      setOrderHistory(userOrders);
      setLoading(false);

      // Initialize edit profile form with current user data
      setEditProfileData({
        firstname: userData[0]?.firstname || '',
        lastname: userData[0]?.lastname || '',
        emailaddress: userData[0]?.emailaddress || '',
        mobileno: userData[0]?.mobileno || '',
        gender: userData[0]?.gender || '',
        dob: userData[0]?.dob || ''
      });
    }
  }, [navigate, reduxOrders]);
  

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  const handleLogout = () => {
    // Use single LOGOUT action to clear all data
    dispatch({type: "LOGOUT"});
    
    // Reset local state
    setOrderHistory([]);
    setCurrentTab(0);
    
    // Redirect to homepage directly without forcing a page reload
    navigate('/homepage');
  };

  // Edit Profile handlers
  const handleOpenEditProfile = () => {
    setOpenEditProfile(true);
  };

  const handleCloseEditProfile = () => {
    setOpenEditProfile(false);
  };

  const handleEditProfileChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData({
      ...editProfileData,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    try {
      // Create updated user object
      const updatedUser = {
        ...userData[0],
        ...editProfileData
      };

      // Get the actual user ID or key
      const userId = userData[0]?.userid || Object.keys(user)[0] || '0';

      // Update in Redux
      dispatch({
        type: "ADD_USER",
        payload: [userId, updatedUser]
      });

      // Close dialog
      setOpenEditProfile(false);
      
      // Force refresh the component 
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      // Silently handle errors
    }
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    try {
      const [year, month, day] = dateString.split('T')[0].split('-');
      return `${day}-${month}-${year}`;  // 15-08-2000
    } catch (error) {
      return dateString; // Return the original string if parsing fails
    }
  };
  
  // Calculate total spent
  const totalSpent = orderHistory.reduce((total, order) => total + order.amount, 0);
  
  // Rendering logic - separate authentication check from rendering
  const renderDashboard = () => {
    // Safety check - if no user data, show loading screen
    if (!userData || userData.length === 0 || !userData[0]?.firstname) {
      return renderLoading();
    }
    
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ my: 4, pb: 5 }}>
          <Grid container spacing={3}>
            {/* Profile sidebar */}
            <Grid item xs={12} md={3}>
              <DashboardSection>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                  <ProfileAvatar src={`${serverURL}/images/profile.jpg`} alt={userData[0]?.firstname}>
                    {!userData[0]?.profilepic && `${userData[0]?.firstname?.charAt(0)}${userData[0]?.lastname?.charAt(0)}`}
                  </ProfileAvatar>
                  <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                    {userData[0]?.firstname} {userData[0]?.lastname}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {userData[0]?.emailaddress || 'No email address'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {userData[0]?.mobileno || 'No phone number'}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<EditIcon />}
                    sx={{ mt: 2 }}
                    onClick={handleOpenEditProfile}
                  >
                    Edit Profile
                  </Button>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <List component="nav">
                  <ListItemButton 
                    selected={currentTab === 0}
                    onClick={() => setCurrentTab(0)}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile Overview" />
                  </ListItemButton>
                  <ListItemButton 
                    selected={currentTab === 1}
                    onClick={() => setCurrentTab(1)}
                  >
                    <ListItemIcon>
                      <ShoppingBasketIcon />
                    </ListItemIcon>
                    <ListItemText primary="Order History" />
                  </ListItemButton>
                  <ListItemButton 
                    selected={currentTab === 2}
                    onClick={() => setCurrentTab(2)}
                  >
                    <ListItemIcon>
                      <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Addresses" />
                  </ListItemButton>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                      <PowerSettingsNewIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </List>
              </DashboardSection>
            </Grid>
            
            {/* Main content */}
            <Grid item xs={12} md={9}>
              {/* Profile Overview Tab */}
              {currentTab === 0 && (
                <>
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={4}>
                      <StatCard>
                        <ShoppingCartIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {loading ? <CircularProgress size={24} /> : orderHistory.length}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Orders Placed
                        </Typography>
                      </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <StatCard>
                        <LocalShippingIcon sx={{ fontSize: 40, color: theme.palette.warning.main, mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {loading ? <CircularProgress size={24} /> : 
                            orderHistory.filter(order => order.status === 'Processing' || order.status === 'Shipped').length}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Active Orders
                        </Typography>
                      </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <StatCard>
                        <CreditCardIcon sx={{ fontSize: 40, color: theme.palette.success.main, mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {loading ? <CircularProgress size={24} /> : `₹${totalSpent}`}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Total Spent
                        </Typography>
                      </StatCard>
                    </Grid>
                  </Grid>
                  
                  <DashboardSection sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Recent Orders
                      </Typography>
                      <Button 
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => setCurrentTab(1)}
                      >
                        View All
                      </Button>
                    </Box>
                    
                    {loading ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                      </Box>
                    ) : orderHistory.length > 0 ? (
                      orderHistory.slice(0, 2).map((order) => (
                        <OrderCard key={order.id || order.orderid}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                Order #{order.orderid || order.id}
                              </Typography>
                              <StatusChip label={order.status} status={order.status} size="small" />
                            </Box>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                              {formatDate(order.orderdate || order.date)}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            {(order.items || []).map(item => (
                              <Box key={item.id || item.productdetailid} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="body2">
                                  {item.name} x{item.qty}
                                </Typography>
                                <Typography variant="body2">
                                  ₹{item.price}
                                </Typography>
                              </Box>
                            ))}
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                Total
                              </Typography>
                              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                ₹{order.amount}
                              </Typography>
                            </Box>
                          </CardContent>
                        </OrderCard>
                      ))
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                        <ShoppingBasketIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="body1" color="textSecondary" sx={{ mb: 3, textAlign: 'center' }}>
                          You haven't placed any orders yet. Start shopping to see your orders here.
                        </Typography>
                        <Button 
                          variant="contained" 
                          color="primary"
                          onClick={() => navigate('/homepage')}
                        >
                          Shop Now
                        </Button>
                      </Box>
                    )}
                  </DashboardSection>
                  
                  <Grid container spacing={3} sx={{ mt: 4, mb: 4 }}>
                    <Grid item xs={12} sm={6}>
                      <DashboardSection>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Personal Information
                          </Typography>
                          <IconButton size="small" onClick={handleOpenEditProfile}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">
                              Full Name
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                              {userData[0]?.firstname} {userData[0]?.lastname}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">
                              Gender
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                              {userData[0]?.gender || 'Not specified'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">
                              Email Address
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                              {userData[0]?.emailaddress || 'Not provided'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">
                              Mobile Number
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                              {userData[0]?.mobileno || 'Not provided'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">
                              Date of Birth
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                              {userData[0]?.dob ? formatDate(userData[0].dob) : 'Not provided'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </DashboardSection>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <DashboardSection>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Default Address
                          </Typography>
                          <Button 
                            endIcon={<ArrowForwardIcon />}
                            onClick={() => setCurrentTab(2)}
                          >
                            View All
                          </Button>
                        </Box>
                        
                        {userData[0]?.address ? (
                          <AddressCard>
                            <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                              <IconButton size="small">
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Box>
                            
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                              {userData[0].firstname} {userData[0].lastname}
                            </Typography>
                            {userData[0].address && (
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                {userData[0].address}
                              </Typography>
                            )}
                            {userData[0].building && (
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                {userData[0].building}{userData[0].towerno && `, Tower ${userData[0].towerno}`}
                                {userData[0].floorno && `, Floor ${userData[0].floorno}`}
                              </Typography>
                            )}
                            {userData[0].houseno && (
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                House No: {userData[0].houseno}
                              </Typography>
                            )}
                            <Typography variant="body2">
                              {userData[0].city && `${userData[0].city}, `}
                              {userData[0].state && `${userData[0].state}, `}
                              {userData[0].pincode}
                            </Typography>
                            
                            <Box sx={{ mt: 'auto', pt: 2 }}>
                              <Chip 
                                label="Default" 
                                color="primary" 
                                size="small"
                              />
                            </Box>
                          </AddressCard>
                        ) : (
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
                            <LocationOnIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                              No address added yet
                            </Typography>
                            <Button 
                              variant="outlined" 
                              startIcon={<AddIcon />}
                            >
                              Add New Address
                            </Button>
                          </Box>
                        )}
                      </DashboardSection>
                    </Grid>
                  </Grid>
                </>
              )}
              
              {/* Orders Tab */}
              {currentTab === 1 && (
                <DashboardSection>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                    My Orders
                  </Typography>
                  
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                      <CircularProgress />
                    </Box>
                  ) : orderHistory.length > 0 ? (
                    orderHistory.map((order) => (
                      <OrderCard key={order.id || order.orderid}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                              Order #{order.orderid || order.id}
                            </Typography>
                            <StatusChip label={order.status} status={order.status} size="small" />
                          </Box>
                          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                            {formatDate(order.orderdate || order.date)}
                          </Typography>
                          <Divider sx={{ my: 1 }} />
                          {(order.items || []).map(item => (
                            <Box key={item.id || item.productdetailid} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="body2">
                                {item.name} x{item.qty}
                              </Typography>
                              <Typography variant="body2">
                                ₹{item.price}
                              </Typography>
                            </Box>
                          ))}
                          <Divider sx={{ my: 1 }} />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                              Total
                            </Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                              ₹{order.amount}
                            </Typography>
                          </Box>
                          <Button 
                            variant="outlined" 
                            fullWidth
                            onClick={() => navigate('/homepage')}
                          >
                            Buy Again
                          </Button>
                        </CardContent>
                      </OrderCard>
                    ))
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                      <ShoppingBasketIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                        No Orders Yet
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 3, textAlign: 'center' }}>
                        Looks like you haven't placed any orders yet.
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => navigate('/homepage')}
                      >
                        Start Shopping
                      </Button>
                    </Box>
                  )}
                </DashboardSection>
              )}
              
              {/* Addresses Tab */}
              {currentTab === 2 && (
                <DashboardSection>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      My Addresses
                    </Typography>
                    <Button 
                      variant="outlined" 
                      startIcon={<AddIcon />}
                    >
                      Add New Address
                    </Button>
                  </Box>
                  
                  {userData[0]?.address ? (
                    <AddressCard>
                      <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {userData[0].firstname} {userData[0].lastname}
                      </Typography>
                      {userData[0].address && (
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          {userData[0].address}
                        </Typography>
                      )}
                      {userData[0].building && (
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          {userData[0].building}{userData[0].towerno && `, Tower ${userData[0].towerno}`}
                          {userData[0].floorno && `, Floor ${userData[0].floorno}`}
                        </Typography>
                      )}
                      {userData[0].houseno && (
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          House No: {userData[0].houseno}
                        </Typography>
                      )}
                      <Typography variant="body2">
                        {userData[0].city && `${userData[0].city}, `}
                        {userData[0].state && `${userData[0].state}, `}
                        {userData[0].pincode}
                      </Typography>
                      
                      <Box sx={{ mt: 'auto', pt: 2 }}>
                        <Chip 
                          label="Default" 
                          color="primary" 
                          size="small"
                        />
                      </Box>
                    </AddressCard>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                      <LocationOnIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                        No Addresses Yet
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 3, textAlign: 'center' }}>
                        You haven't added any delivery addresses yet.
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary"
                        startIcon={<AddIcon />}
                      >
                        Add New Address
                      </Button>
                    </Box>
                  )}
                </DashboardSection>
              )}
            </Grid>
          </Grid>
          
          {/* Adding the Footer inside the Container with proper margin */}
          <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid #e0e0e0' }}>
            <Footer />
          </Box>
        </Container>

        {/* Edit Profile Dialog */}
        <Dialog open={openEditProfile} onClose={handleCloseEditProfile} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstname"
                  value={editProfileData.firstname}
                  onChange={handleEditProfileChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastname"
                  value={editProfileData.lastname}
                  onChange={handleEditProfileChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="emailaddress"
                  value={editProfileData.emailaddress}
                  onChange={handleEditProfileChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobileno"
                  value={editProfileData.mobileno}
                  onChange={handleEditProfileChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={editProfileData.gender || ''}
                    onChange={handleEditProfileChange}
                    label="Gender"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={editProfileData.dob ? editProfileData.dob.split('T')[0] : ''}
                  onChange={handleEditProfileChange}
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditProfile}>Cancel</Button>
            <Button onClick={handleSaveProfile} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  
  const renderLoading = () => {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ my: 4, pb: 5 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '70vh' 
          }}>
            <CircularProgress sx={{ mb: 3 }} />
            <Typography variant="h6" color="textSecondary">
              Please login to access your dashboard
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2 }}
              onClick={() => navigate('/login')}
            >
              Go to Login
            </Button>
          </Box>
          <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid #e0e0e0' }}>
            <Footer />
          </Box>
        </Container>
      </>
    );
  };
  
  // Final rendering decision
  return (!userData || userData.length === 0 || !userData[0]?.firstname)
    ? renderLoading()
    : renderDashboard();
} 