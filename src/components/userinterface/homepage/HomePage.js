import Header from './Header'
import OfferScroll from './OfferScroll'
import AdScroll from './AdScroll'
import Footer from './Footer'
import ProductsScroll from './ProductsScroll'
import { getData,postData } from '../../../services/FetchNodeAdminServices'
import {useState,useEffect} from 'react'
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import { Box, Container, Typography, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';


export default function HomePage()
{   const[banners,setBanners]=useState([])
    const[bankOffer,setBankOffer]=useState([])
    const[adOffer,setAdOffer]=useState([])
    const[popularProducts,setPopularProducts]=useState([])
    const [refresh,setRefresh]=useState(false)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const user = useSelector(state => state.user);
    const userData = Object.values(user);
    const navigate = useNavigate();
    
  const fetchAllProductDetails = async (productstatus) => {
    var result = await postData('userinterface/display_all_productdetail_by_status', { productstatus });
    setPopularProducts(result.data);
};

    const fetchAllOffers=async()=>{
        var result=await getData('userinterface/all_adoffers')
        setAdOffer(result.data) 
   }
    const fetchAllBanners=async()=>{
         var result=await getData('userinterface/show_all_banner')
         setBanners(result.data) 
    }
    const fetchAllBankOffer=async()=>{
        var result=await getData('userinterface/show_all_bankoffer')
        setBankOffer(result.data) 
   }
    useEffect(function(){
      fetchAllBanners()
      fetchAllBankOffer()
      fetchAllOffers()
      fetchAllProductDetails('Trending')

    },[])

    return(
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
            <div>
                <Header />
            </div>
            
            <div style={{width:'82.6%',alignSelf:'center',marginTop:35}} >
                <OfferScroll state={"Offer"} data={adOffer} />
            </div>
            
            <div style={{width:'82%',alignSelf:'center',marginTop:40}} >
                <AdScroll data={banners} />
            </div>
            
            <div   style={{width:'82%',alignSelf:'center',marginTop:40}}  >
                <ProductsScroll  refresh={refresh} setRefresh={setRefresh} title={"Popular"} data={popularProducts} />
              
            </div>
            
            <div style={{width:'82%',alignSelf:'center',marginTop:40}} >
                <ProductsScroll refresh={refresh} setRefresh={setRefresh}  title={"Top Brands"} data={popularProducts} />
            </div>
            
            <Box sx={{ 
                width: { xs: '95%', sm: '90%', md: '82%' }, 
                alignSelf: 'center', 
                marginTop: 6,
                marginBottom: 3
            }}>
                <Footer />
            </Box>
        </div>
    )
}