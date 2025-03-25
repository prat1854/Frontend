import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {List,ListItem,ListItemButton,ListItemIcon,ListItemText, Divider, Button,Grid} from '@mui/material'
import Category  from "../category/Category"
import DisplayAllCategory  from "../category/DisplayAllCategory"
import SubCategory from "../subcategory/SubCategory"
import DisplayAllSubCategory from '../subcategory/DisplayAllSubCategory';
import Brand from '../brand/Brand';
import DisplayAllBrand from '../brand/DisplayAllBrand';
import Mainbanner from '../mainbanner/Mainbanner'
import Bankandotheroffers  from '../bankandotheroffers/Bankandotheroffers'
import Product from '../product/Product';
import DisplayAllProduct from '../product/DisplayAllProduct'
import ProductDetail from '../productdetail/ProductDetail'
import DisplayAllProductDetail from '../productdetail/DisplayAllProductDetail';
import ProductPicture from '../productpicture/ProductPicture'
import Adoffers from '../adoffers/Adoffers';
import { Paper } from '@mui/material';
import { serverURL } from '../../../services/FetchNodeAdminServices';
import { Routes,Route,useNavigate } from 'react-router-dom';
export default function Dashboard() 
    {
      var navigate=useNavigate()
   return(
    <div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         QuickComm
        </Typography>
        <Button onClick={()=>navigate('/signin')} color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
   
      <Grid container>
        <Grid item xs={2} >
          <Paper elevation={3} style={{flexDirection:'column', display:'flex',alignItems:'center',height:600,margin:10}}>
 
            <div >
              <img src={`${serverURL}/images/5.jpg`} style={{width:70,height:70,borderRadius:35,marginTop:10}}/>
            </div>
            <div style={{fontSize:12,fontWeight:'bold',letterSpacing:1}}>
               Aditya Singh
            </div>
            <div style={{fontSize:10,fontWeight:'bold',color:'grey'}}>
               adityasingh@gmail.com
            </div>
            
            <Divider style={{width:'90%',marginTop:10}} />
            <div>
              <List>
                <ListItem>
                  <ListItemButton >
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                      <img src='/dashboard.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                        Dashboard
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/displayallcategory')}>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                      <img src='/category.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                        Category
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>

                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/subcategory')} >
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/subcategory.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                        SubCategory
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
 
                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/brand')} >
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/brand-image.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                        Brands
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
 
                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/product')} >
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/products.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                        Products
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
 
                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/productdetail')} >
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/product-catalog.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                        Product Details
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
 
                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/productpicture')} >
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/product-image.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                        Products Image
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>

                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/mainbanner')} >
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/ribbon-folds.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                       Banners
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
                
                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/adoffers')} >
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/adimages.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                       Products Ad
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
               
                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/bankoffers')} >
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/bank-account.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                       Bank Offers
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>

                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/signin')} >
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/check-out.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                       Logout
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
 
 
              </List>
              </div> 
          </Paper>
        </Grid>
        <Grid item xs={10} >
         
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
        <Route element={<Bankandotheroffers/>} path="/bankoffers"></Route>
        
      </Routes> 
        </Grid>

      </Grid>
   
  </div>
   )
    }