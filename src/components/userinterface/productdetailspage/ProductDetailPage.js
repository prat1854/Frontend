import Footer from '../homepage/Footer'
import Header from '../homepage/Header'
import * as React from 'react';
import { useState,useEffect } from 'react';
import { serverURL, getData, postData  } from "../../../services/FetchNodeAdminServices";
import { Divider,Grid, useMediaQuery, useTheme } from '@mui/material';
import ProductImageComponent from '../productdetailspage/ProductImageComponent'
import ProductDescription from '../productdetailspage/ProductDescription'
import ProductsScroll from '../homepage/ProductsScroll'
import { useLocation } from 'react-router-dom';
export default function ProductDetailPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    var location=useLocation()
    var p=location?.state?.product

    const [popularProducts,setPopularProducts]=useState([])
    const [similarProducts,setSimilarProducts]=useState([])
    const [product,setProduct]=useState(p || {}); // yeh pr yeh issue thi reading.map
    const [refresh,setRefresh]=useState(true)
    
    // Demo product data for popular and similar categories
    const demoProducts = [
        {
            productdetailid: 1,
            productdetailname: "Fresh Organic Apples",
            picture: "apple.webp",
            price: 120,
            offerprice: 99,
            weight: 1,
            weighttype: "kg",
            qty: 0
        },
        {
            productdetailid: 2,
            productdetailname: "Premium Bananas",
            picture: "banana.jpg",
            price: 80,
            offerprice: 65,
            weight: 1,
            weighttype: "kg",
            qty: 0
        },
        {
            productdetailid: 3,
            productdetailname: "Fresh Strawberries",
            picture: "straw.jpeg",
            price: 180,
            offerprice: 150,
            weight: 250,
            weighttype: "g",
            qty: 0
        },
        {
            productdetailid: 4,
            productdetailname: "Organic Oranges",
            picture: "orange.jpeg",
            price: 100,
            offerprice: 80,
            weight: 1,
            weighttype: "kg",
            qty: 0
        },
        {
            productdetailid: 5,
            productdetailname: "Fresh Blueberries",
            picture: "blueberry.jpeg",
            price: 220,
            offerprice: 190,
            weight: 200,
            weighttype: "g",
            qty: 0
        },
        {
            productdetailid: 6,
            productdetailname: "Premium Mangoes",
            picture: "Mangoes.jpeg",
            price: 150,
            offerprice: 130,
            weight: 1,
            weighttype: "kg",
            qty: 0
        },
        {
            productdetailid: 7,
            productdetailname: "Organic Grapes",
            picture: "grapes.jpeg",
            price: 130,
            offerprice: 110,
            weight: 500,
            weighttype: "g",
            qty: 0
        },
        {
            productdetailid: 8,
            productdetailname: "Fresh Watermelon",
            picture: "watermelon.jpeg",
            price: 80,
            offerprice: 70,
            weight: 2,
            weighttype: "kg",
            qty: 0
        }
    ];

    // Fetch popular products from the same category as the selected product
    const fetchPopularProducts = async () => {
        try {
            // Check if product has categoryid
            if (product?.categoryid) {
                const result = await postData('userinterface/fetch_products_by_category', { categoryid: product.categoryid });
                if (result.status) {
                    setPopularProducts(result.data);
                } else {
                    // Fallback to demo products if API call fails
                    setPopularProducts(demoProducts.slice(0, 8));
                }
            } else {
                // Use demo products if no category is available
                setPopularProducts(demoProducts.slice(0, 8));
            }
        } catch (error) {
        //    console.error("Error fetching popular products:", error);
            // Fallback to demo products on error
            setPopularProducts(demoProducts.slice(0, 8));
        }
    };

    // Fetch similar products based on the selected product's subcategory
    const fetchSimilarProducts = async () => {
        try {
            // Check if product has subcategoryid
            if (product?.subcategoryid) {
                const result = await postData('userinterface/fetch_products_by_subcategory', { subcategoryid: product.subcategoryid });
                if (result.status) {
                    setSimilarProducts(result.data);
                } else {
                    // Fallback to demo products if API call fails
                    setSimilarProducts(demoProducts.slice(2, 8).concat(demoProducts.slice(0, 2)));
                }
            } else {
                // Use demo products if no subcategory is available
                setSimilarProducts(demoProducts.slice(2, 8).concat(demoProducts.slice(0, 2)));
            }
        } catch (error) {
       //     console.error("Error fetching similar products:", error);
            // Fallback to demo products on error
            setSimilarProducts(demoProducts.slice(2, 8).concat(demoProducts.slice(0, 2)));
        }
    };

    // Initialize products data when component mounts or when product changes
    useEffect(() => {
        if (Object.keys(product).length > 0) {
            // If we have a product, fetch related products
            fetchPopularProducts();
            fetchSimilarProducts();
        } else {
            // Use demo products if no product is selected
            setPopularProducts(demoProducts.slice(0, 8));
            setSimilarProducts(demoProducts.slice(2, 8).concat(demoProducts.slice(0, 2)));
        }
    }, [product]);

    return (<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

        <div>
            <Header />
        </div>
    
        <Grid container>
            <Grid item xs={6}>
            <ProductImageComponent refresh={refresh} setRefresh={setRefresh} product={product} setProduct={setProduct}/>
            </Grid>
            <Grid item xs={6}>
            <ProductDescription product={product} setProduct={setProduct}  />
            </Grid>
         </Grid>   

    <div style={{
        backgroundColor: '#f5f6fa',
        borderRadius: 20,
        border: '1px solid #e0e0e0',
        marginBottom: 20,
        marginTop: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        height: 8,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)'
    }}>
    </div>

    <div style={{width:'90%', alignSelf:'center', marginTop:30}}>
       <ProductsScroll title={"Popular Category"} data={popularProducts} refresh={refresh} setRefresh={setRefresh} />
   </div>

   <div style={{
        backgroundColor: '#f5f6fa',
        borderRadius: 20, 
        border: '1px solid #e0e0e0',
        marginBottom: 20,
        marginTop: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        height: 8,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)'
    }}>
    </div>

   <div style={{width:'90%', alignSelf:'center', marginTop:30}}>
      <ProductsScroll title={"Similar Category"} data={similarProducts} refresh={refresh} setRefresh={setRefresh} />
    </div>

        {!isMobile && (
          <div style={{marginTop: 50}}>
              <Footer />
          </div>
        )}

    </div>)
}  