import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button, Grid, IconButton, Avatar, Tooltip, useMediaQuery, useTheme, Drawer} from '@mui/material'
import Category from "../category/Category"
import DisplayAllCategory from "../category/DisplayAllCategory"
import SubCategory from "../subcategory/SubCategory"
import DisplayAllSubCategory from '../subcategory/DisplayAllSubCategory';
import Brand from '../brand/Brand';
import DisplayAllBrand from '../brand/DisplayAllBrand';
import Mainbanner from '../mainbanner/Mainbanner'
import Bankandotheroffers from '../bankandotheroffers/Bankandotheroffers'
import Product from '../product/Product';
import DisplayAllProduct from '../product/DisplayAllProduct'
import ProductDetail from '../productdetail/ProductDetail'
import DisplayAllProductDetail from '../productdetail/DisplayAllProductDetail';
import ProductPicture from '../productpicture/ProductPicture'
import Adoffers from '../adoffers/Adoffers';
import { Paper } from '@mui/material';
import { serverURL } from '../../../services/FetchNodeAdminServices';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  
  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Sidebar menu items grouped by category
  const menuItems = [
    { 
      title: 'Home', 
      path: '/', 
      icon: '/home.png',
      component: <HomeIcon />
    },
    { 
      title: 'Dashboard', 
      path: '/dashboard', 
      icon: '/dashboard.png',
      component: <DashboardIcon />
    },
    { 
      category: 'Catalog Management',
      items: [
        { title: 'Categories', path: '/dashboard/displayallcategory', icon: '/category.png' },
        { title: 'SubCategories', path: '/dashboard/subcategory', icon: '/subcategory.png' },
        { title: 'Brands', path: '/dashboard/brand', icon: '/brand-image.png' },
      ]
    },
    {
      category: 'Product Management',
      items: [
        { title: 'Products', path: '/dashboard/product', icon: '/products.png' },
        { title: 'Product Details', path: '/dashboard/productdetail', icon: '/product-catalog.png' },
        { title: 'Product Images', path: '/dashboard/productpicture', icon: '/product-image.png' },
      ]
    },
    {
      category: 'Marketing',
      items: [
        { title: 'Banners', path: '/dashboard/mainbanner', icon: '/ribbon-folds.png' },
        { title: 'Products Ads', path: '/dashboard/adoffers', icon: '/adimages.png' },
        { title: 'Bank Offers', path: '/dashboard/bankoffers', icon: '/bank-account.png' },
      ]
    }
  ];

  // Responsive drawer content
  const drawerContent = (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Avatar 
          src={`${serverURL}/images/5.jpg`} 
          sx={{ width: 70, height: 70, mb: 1, boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }} 
        />
        <Typography variant="subtitle1" fontWeight="bold" letterSpacing={1}>
          Aditya Purohit
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight="medium">
          adityapurohit01@gmail.com
        </Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      
      <Divider sx={{ width: '90%', mx: 'auto', mb: 1 }} />
      
      <List sx={{ px: 1 }}>
        {menuItems.map((item, index) => (
          item.category ? (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ pl: 2, textTransform: 'uppercase', fontWeight: 'bold', fontSize: '0.7rem' }}
              >
                {item.category}
              </Typography>
              
              {item.items.map((subItem, subIndex) => (
                <ListItem key={subIndex} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton 
                    onClick={() => {
                      navigate(subItem.path);
                      if (isMobile) setOpen(false);
                    }}
                    sx={{
                      borderRadius: 1,
                      backgroundColor: isActive(subItem.path) ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.12)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={subItem.icon} style={{ width: 24, height: 24 }} alt={subItem.title} />
                      <Typography sx={{ ml: 2, fontWeight: isActive(subItem.path) ? 700 : 500 }}>
                        {subItem.title}
                      </Typography>
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider sx={{ width: '90%', mx: 'auto', my: 1 }} />
            </Box>
          ) : (
            <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton 
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setOpen(false);
                }}
                sx={{
                  borderRadius: 1,
                  backgroundColor: isActive(item.path) ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.12)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img src={item.icon} style={{ width: 24, height: 24 }} alt={item.title} />
                  <Typography sx={{ ml: 2, fontWeight: isActive(item.path) ? 700 : 500 }}>
                    {item.title}
                  </Typography>
                </Box>
              </ListItemButton>
            </ListItem>
          )
        ))}
        
        <ListItem disablePadding sx={{ mt: 2 }}>
          <ListItemButton 
            onClick={() => navigate('/signin')}
            sx={{
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(211, 47, 47, 0.08)',
              },
              color: 'error.main'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src="/check-out.png" style={{ width: 24, height: 24 }} alt="Logout" />
              <Typography sx={{ ml: 2, fontWeight: 500 }}>
                Logout
              </Typography>
            </Box>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static" elevation={1} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            QuickComm
          </Typography>
          {!isMobile && (
            <Tooltip title="Logout">
              <Button 
                onClick={() => navigate('/signin')} 
                color="inherit" 
                startIcon={<LogoutIcon />}
                sx={{ fontWeight: 500 }}
              >
                Logout
              </Button>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
   
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Sidebar - permanent for desktop, drawer for mobile */}
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={open}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              width: 250,
              flexShrink: 0,
              '& .MuiDrawer-paper': { 
                width: 250, 
                boxSizing: 'border-box',
                boxShadow: 3
              },
            }}
          >
            {drawerContent}
          </Drawer>
        ) : (
          <Box
            component="nav"
            sx={{ 
              width: 250, 
              flexShrink: 0
            }}
          >
            <Paper 
              elevation={3} 
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 0,
                m: 1,
                mr: 0,
                overflow: 'auto'
              }}
            >
              {drawerContent}
            </Paper>
          </Box>
        )}

        {/* Main content area */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 1, sm: 2 },
            overflow: 'auto',
            backgroundColor: '#f5f5f5'
          }}
        >
          <Routes>
            <Route element={<Category/>} path="/category"></Route>
            <Route element={<DisplayAllCategory/>} path="/displayallcategory"></Route>
            <Route element={<SubCategory/>} path="/subcategory"></Route>
            <Route element={<DisplayAllSubCategory/>} path="/displayallsubcategory"></Route>
            <Route element={<Brand/>} path="/brand"></Route>
            <Route element={<DisplayAllBrand/>} path="/displayallbrand"></Route>
            <Route element={<Mainbanner/>} path="/mainbanner"></Route>
            <Route element={<Bankandotheroffers/>} path="/bankoffers"></Route>
            <Route element={<Product/>} path="/product"></Route>
            <Route element={<DisplayAllProduct/>} path="/displayallproduct"></Route>
            <Route element={<ProductDetail/>} path="/productdetail"></Route>
            <Route element={<DisplayAllProductDetail/>} path="/displayallproductdetail"></Route>
            <Route element={<ProductPicture/>} path="/productpicture"></Route>
            <Route element={<Adoffers/>} path="/adoffers"></Route>
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}