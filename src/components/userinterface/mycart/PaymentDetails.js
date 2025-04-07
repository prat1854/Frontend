import { Divider,Paper,Grid,TextField,Button } from "@mui/material"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { useState ,useEffect } from "react";
import StepLabel from '@mui/material/StepLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { postData, serverURL } from "../../../services/FetchNodeAdminServices";
import Drawer from '@mui/material/Drawer';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Swal from 'sweetalert2';
import useRazorpay from "react-razorpay";
export default function PaymentDetails(){
  const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const [open,setOpen]=useState(false)
    var dispatch=useDispatch()
    var cartData=useSelector((state)=>state.cart)
    var user=useSelector((state)=>state.user)
    var userData=Object.values(user)
    var data =Object.values(cartData) 
    var keys =Object.keys(cartData) 
    var navigate=useNavigate()

    var totalamount=data.reduce((f,s)=>{
      var ap=0
          
       ap=s.price*s.qty
      return f+ap
     },0)



/*** states address */
const [userId,setUserId]=useState('')
const [pinCode,setPinCode]=useState('')
const [houseNo,setHouseNo]=useState('')
const [floorNo,setFloorNo]=useState('')
const [towerNo,setTowerNo]=useState('')
const [building,setBuilding]=useState('')
const [address,setAddress]=useState('')
const [landmark,setLandmark]=useState('')
const [city,setCity]=useState('')
const [state,setState]=useState('')
const [userAddress,setUserAddress]=useState([])
const [btnTxt,setBtnTxt]=useState('Place Order')
  
/**** */
const handlePayment = () => {
  try {
    const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: (totalamount-discount)*100, // Razorpay expects amount in paise (100 paise = 1 INR)
      currency: "INR",
      name: "QuickCom",
      description: "Test Transaction",
      image: `${serverURL}/images/logo.png`,

      handler: (res) => {
      //  console.log("Payment successful:", res);
        
        // Save order to Redux
        saveOrderToDatabase(res.razorpay_payment_id);
      },
      prefill: {
        name: userData[0]?.firstname + " " + userData[0]?.lastname,
        email: userData[0]?.emailaddress,
        contact: userData[0]?.mobileno,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
   // console.error("Razorpay error:", error);
    alert("Payment failed to initialize. Please try again.");
  }
}

const saveOrderToDatabase = async (paymentId) => {
  try {
    // Prepare order data
    const orderItems = data.map(item => ({
      productid: item.productid,
      productdetailid: item.productdetailid,
      name: item.productname,
      price: item.offerprice > 0 ? item.offerprice : item.price,
      qty: item.qty,
      image: item.picture
    }));
    
    // Prepare order details
    const orderData = {
      orderid: 'ORD' + Date.now(), // Generate a unique order ID
      userid: userData[0]?.userid,
      orderdate: new Date().toISOString(),
      paymentid: paymentId,
      status: 'Processing',
      amount: totalamount - discount,
      items: orderItems,
      address: {
        address: userData[0]?.address,
        city: userData[0]?.city,
        state: userData[0]?.state,
        pincode: userData[0]?.pincode
      }
    };
    
    // Save to Redux
    dispatch({type: 'ADD_ORDER', payload: orderData});
    
    // Clear the cart and navigate to dashboard
    dispatch({type: 'CLEAR_CART', payload: []});
    
    // Show success message and navigate
    Swal.fire({
      icon: "success",
      text: "Order placed successfully!",
      showConfirmButton: false,
      timer: 1500,
      toast: true
    });
    
    // Navigate to dashboard after a short delay
    setTimeout(() => {
      navigate('/userdashboard');
    }, 1500);

    // Send order confirmation email
    try {
      const emailData = {
        to: userData[0]?.emailaddress,
        subject: `Order Confirmation - ${orderData.orderid}`,
        orderData: orderData,
        customerName: `${userData[0]?.firstname} ${userData[0]?.lastname}`
      };
      
      // Make API call to send email confirmation
      // Note: Backend endpoint needs to be implemented at 'userinterface/send_order_confirmation'
      // The backend should use a service like Nodemailer to send emails with order details
      const emailResponse = await postData('userinterface/send_order_confirmation', emailData);
      console.log("Email confirmation sent:", emailResponse);
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Don't halt the process if email fails
    }
  } catch (error) {
    console.error("Error saving order:", error);
    // Show error but still navigate
    Swal.fire({
      icon: "error",
      text: "Error saving order details, but payment was successful.",
      showConfirmButton: false,
      timer: 2000,
      toast: true
    });
    
    // Clear cart and navigate anyway
    dispatch({type: 'CLEAR_CART', payload: []});
    navigate('/homepage');
  }
}

useEffect(function(){
const script = document.createElement("script");
script.src = "https://checkout.razorpay.com/v1/checkout.js";
script.async = true;
document.body.appendChild(script);

},[])

    const [selectedAddressType, setSelectedAddressType] = useState('');

    const handleAddressTypeSelect = (type) => {
      setSelectedAddressType(type);
    };

    const handleClose = () => {
      setOpen(false); //  Close the Drawer
    };


    const handleSubmitAddress=async()=>{
      var body={
        userid: userData[0]?.userid, 
        pincode: pinCode, 
        houseno: houseNo, 
        floorno: floorNo, 
        towerno: towerNo, 
        building: building, 
        address: address, 
        landmark: landmark, 
        city: city, 
        state: state
      };
      var response=await postData('userinterface/submit_user_address',body);
      if(response.status)
        { 
          var userDataWithAddress={...userData[0],...body};
           dispatch({type:"ADD_USER",payload:[userData[0]?.userid,userDataWithAddress]});
           Swal.fire({
             
            icon: "success",
            text:response.message,
            showConfirmButton: false,
            timer: 1500,
            toast:true
          });
          navigate('/cartdisplaypage')
        }
        else
        {
          Swal.fire({
             
            icon: "error",
            text:response.message,
            showConfirmButton: false,
            timer: 1500,
            toast:true
          });
        }
      setOpen(false)
    }
     


    const ShowAddress=()=>{
      return userAddress.map((item)=>{
        return <div>
        <div>{userData[0].firstname} {userData[0].lastname} </div>
        <div>{userData[0].address}</div>
        <div>{userData[0].building},{userData[0].towerno},{userData[0].floorno}</div>
        <div>House No:{userData[0].houseno}</div>
        <div>{userData[0].state},{userData[0].city},{userData[0].pincode}</div>
      </div>
    })
    } 


const handlePlaceOrder=async()=>{
  if(btnTxt==="Make Payment") {
     handlePayment(); // Call payment handler directly instead of navigating
  }
  else {
   if(userData.length==0) { 
     navigate('/login');
   }
   else {
     // Check directly if user has address in Redux store before making API call
     if(userData[0].address) {
       // User has address, update button and show payment option
       setBtnTxt("Make Payment");
     } else {
       // No address, show address form
       setOpen(true);
     }
   }
  }
}







    var discount=data.reduce((f,s)=>{
      var ap=0
       if(s.offerprice>0)
      {
       ap=(s.price-s.offerprice)*s.qty
      }
       
      return f+ap
     },0)
 
     const handleUseCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            alert(
              `Location fetched: ${position.coords.latitude}, ${position.coords.longitude}`
            );
          },
          (error) => {
            alert("Unable to fetch location. Please enable location services.");
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }; 




 const addressView=()=>{
  return (
    <div>
  <Paper style={{width:380,height:650,borderRadius:15,justifySelf:'right'}}>
        <div style={{marginLeft:25}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
           <div style={{marginTop:30,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:18,letterSpacing:0.15,lineHeight: 1}}>
            Add Address
           </div>
           <button style={{
             border: 'none',
             borderRadius: '5px',
             padding: '5px 10px',
             backgroundColor: '#0078ad',
             color: '#fff',
             fontFamily: 'JioType, helvetica, arial, sans-serif',
             fontWeight: 700,
             fontSize: '12px',
             cursor: 'pointer',
             marginTop: '30px',
             marginRight: '20px'
           }} onClick={handleClose}>Close</button>
        </div>
        <div style={{marginTop:30,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:14,letterSpacing:0.15,lineHeight: 1}}>
            Address Details
        </div>
        
       <div style={{marginTop:15,display:"flex" , cursor:'pointer'}} onClick={handleUseCurrentLocation} > 
        <MyLocationIcon  style={{fontSize:20,color:'#0078ad'}} />
        <div style={{color:'#0078ad',fontWeight: 500,fontSize: 13.5,letterSpacing: 0.25,lineHeight: 1.4285714286}}>
        Use Current Location
        </div>
       </div>
       <div style={{fontWeight: 700,fontSize: 11.5,letterSpacing: 0.07,lineHeight: 1.4285714286,color: 'rgba(0, 0, 0, .65)',overflow: "hidden",textOverflow: 'ellipsis',display:"-webkit-box",webkitLineClamp: "1",webkitBoxOrient: "vertical",marginLeft:20}}>
        Using GPS
       </div>
       <Grid container spacing={1}>
       <Grid item xs={12}  style={{width:'90%',marginTop:5}} >
       <TextField  onChange={(e)=>setPinCode(e.target.value)} label="Pin Code" variant="standard" fullWidth />
       </Grid>
       <Grid item xs={6}  style={{marginTop:5,width:'45%'}} >
       <TextField  onChange={(e)=>setHouseNo(e.target.value)}   label="House No." variant="standard" fullWidth />
       </Grid>
       <Grid item xs={6}  style={{marginTop:5,width:'45%'}} >
       <TextField  onChange={(e)=>setFloorNo(e.target.value)} label="Floor No." variant="standard" fullWidth />
       </Grid>
       <Grid item xs={12}  style={{width:'90%',marginTop:5}} >
       <TextField  onChange={(e)=>setTowerNo(e.target.value)} label="Tower No." variant="standard" fullWidth />
       </Grid>
       <Grid item xs={12}  style={{width:'90%',marginTop:5}} >
       <TextField  onChange={(e)=>setBuilding(e.target.value)} label="Building / Apartment Name" variant="standard" fullWidth />
       </Grid>
       <Grid item xs={12}  style={{width:'90%',marginTop:5}} >
       <TextField  onChange={(e)=>setAddress(e.target.value)} label="Address" variant="standard" fullWidth />
       </Grid>
       <Grid item xs={12}  style={{width:'90%',marginTop:5}} >
       <TextField  onChange={(e)=>setLandmark(e.target.value)} label="Landmark / Area" variant="standard" fullWidth />
       </Grid>
       <Grid item xs={12}  style={{width:'90%',marginTop:5}} >
       <TextField  onChange={(e)=>setCity(e.target.value)}  label="City" variant="standard" fullWidth />
       </Grid>
       <Grid item xs={12}  style={{width:'90%',marginTop:5}} >
       <TextField  onChange={(e)=>setState(e.target.value)}  label="State" variant="standard" fullWidth />
       </Grid>
      
          

       <Grid  item xs={12}>
       <Button onClick={handleSubmitAddress} style={{borderRadius:25,height:53,marginTop:10,color:'#fff',background:'#0078ad',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:14,letterSpacing:-0.07,lineHeight: 1.4285714286,width:'95%'}} fullWidth>Save and Proceed</Button>
       </Grid>
       </Grid>       
       </div>
       </Paper>
       <Paper style={{width:380,height:250,borderRadius:15,justifySelf:'right',marginTop:40}}>
        <div>
        <div  style={{padding:25,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:14,letterSpacing:0.15,lineHeight: 1}}>
         Delivery Contact Details
        </div>
        <div style={{fontWeight: 500,fontSize: 11.5,letterSpacing: 0.15,lineHeight: 1.4285714286,color: 'rgba(0, 0, 0, .65)',webkitLineClamp: "1",webkitBoxOrient: "vertical",marginTop:15,marginLeft:20}}>
        This mobile number will receive an OTP, required for collecting the order.
        </div>
        <Grid container spacing={1}>
        <Grid item xs={12}  style={{width:'90%',marginTop:5,marginLeft:20}} >
         <TextField  label="Receiver's Name" variant="standard" fullWidth /> 
        </Grid>
        <Grid item xs={12}  style={{width:'90%',marginTop:5,marginLeft:20}} >
         <TextField  label="Receiver's Number" variant="standard" fullWidth /> 
        </Grid>
        </Grid>
        </div>
       </Paper>
       <Paper style={{width:380,height:250,borderRadius:15,justifySelf:'right',marginTop:40}}>
        <div style={{padding:25,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:15,letterSpacing:0.15,lineHeight: 1}}>
                Save as
        </div>
        <div style={{display:'flex',marginLeft:20,justifyContent:'space-evenly'}}>
            <div style={{cursor:'pointer',width:70,height:28,border:'1px solid #ddd',display:'flex',justifyContent:'center',borderRadius:15,padding:3,color:selectedAddressType === 'Home' ? '#fff' : '#0078ad',backgroundColor:selectedAddressType === 'Home' ? '#0078ad' : 'transparent',marginTop:2,fontWeight: 500,fontSize: 15,letterSpacing: 0.25,lineHeight: 1.4285714286,alignItems:'center'}} onClick={() => handleAddressTypeSelect('Home')}>
                    Home
            </div>
            <div style={{cursor:'pointer',width:70,height:28,border:'1px solid #ddd',display:'flex',justifyContent:'center',borderRadius:15,padding:3,color:selectedAddressType === 'Work' ? '#fff' : '#0078ad',backgroundColor:selectedAddressType === 'Work' ? '#0078ad' : 'transparent',marginTop:2,fontWeight: 500,fontSize: 15,letterSpacing: 0.25,lineHeight: 1.4285714286,alignItems:'center'}} onClick={() => handleAddressTypeSelect('Work')}>
                    Work
            </div>
            <div style={{cursor:'pointer',width:70,height:28,border:'1px solid #ddd',display:'flex',justifyContent:'center',borderRadius:15,padding:3,color:selectedAddressType === 'Other' ? '#fff' : '#0078ad',backgroundColor:selectedAddressType === 'Other' ? '#0078ad' : 'transparent',marginTop:2,fontWeight: 500,fontSize: 15,letterSpacing: 0.25,lineHeight: 1.4285714286,alignItems:'center'}} onClick={() => handleAddressTypeSelect('Other')}>
                    Other
            </div>
           </div>
           <div style={{marginTop:10,marginLeft:25,width:'90%'}}>
           <TextField  label="Add New Address Type" variant="standard" placeholder="Eg: Club House, Kumar's Home" fullWidth /> 
           </div>
       </Paper></div>)
 
 }


  const steps = ['Your Cart', 'Review', 'Payment'];
    return(
      <div style={{display:'flex',flexDirection:'column',marginTop:28}}>
        <div style={{marginLeft:-20,padding:15,marginTop:40,borderRadius:25,width:matches?'86%':'90%',background:'#e5f1f7'}}>
        <Stepper activeStep={0} alternativeLabel >
        {steps.map((label) => (
          <Step key={label} > 
            <StepLabel  ><b>{label }</b></StepLabel>
          </Step>
        ))}
      </Stepper>
        </div>
        <div style={{marginTop:-50,marginLeft:-20}}>  
            <div style={{border:'0.5px solid #e2e2e2',marginTop:70,borderRadius:20,width:matches?'89%':'92%',display:'flex',flexDirection:'column'}}>
        <div style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:'1rem',letterSpacing:-0.72,lineHeight: 1.25,marginLeft:28,marginBottom:20,marginTop:20}}>
            Payment Details
        </div>
        <div style={{display:'flex',marginBottom:5,justifyContent:"space-between"}}>
            <div style={{color:'rgba(0, 0, 0, .65)',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:550,fontSize:'1rem',letterSpacing:-0.07,lineHeight: 1.4285714286,marginLeft:30}}>
              MRP Total
            </div>
            <div style={{color:'rgba(0, 0, 0, .65)',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:550,fontSize:'1rem',letterSpacing:-0.07,lineHeight: 1.4285714286,marginRight:20}}>
            &#8377;{totalamount.toFixed(2)}
            </div>
        </div>
        <Divider variant="middle"/>
        <div style={{display:'flex',marginTop:15,marginBottom:5,justifyContent:"space-between"}}>
            <div style={{color:'rgba(0, 0, 0, .65)',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:550,fontSize:'1rem',letterSpacing:-0.07,lineHeight: 1.4285714286,marginLeft:30}}>
              Product Discount
            </div>
            <div style={{color:'#00b259',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:550,fontSize:'1rem',letterSpacing:-0.07,lineHeight: 1.4285714286,marginRight:20}}>
            - &#8377;{discount.toFixed(2)}
            </div>
        </div>
        <Divider variant="middle"/>
        <div style={{display:'flex',marginTop:15,marginBottom:5,justifyContent:"space-between"}}>
            <div style={{color:'rgba(0, 0, 0, .65)',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:550,fontSize:'1rem',letterSpacing:-0.07,lineHeight: 1.4285714286,marginLeft:30}}>
              Delivery Fee
            </div>
            <div style={{color:'#00b259',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:550,fontSize:'1rem',letterSpacing:-0.07,lineHeight: 1.4285714286,marginRight:20}}>
             Free
            </div>
        </div>
        <Divider variant="middle"/>
        <div style={{display:'flex',marginTop:15,marginBottom:10,justifyContent:"space-between"}}>
            <div style={{color:'rgba(0, 0, 0, .65)',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:'1rem',letterSpacing:-0.07,lineHeight: 1.4285714286,marginLeft:30}}>
              Total
            </div>
            <div style={{color:'#141414',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:'1rem',letterSpacing:-0.07,lineHeight: 1.4285714286,marginRight:20}}>
            &#8377;{(totalamount-discount).toFixed(2)}
            </div>
        </div>
        <div style={{display:'flex',justifyContent:'right',color:'#00b259',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:16,letterSpacing:-0.07,lineHeight: 1.4285714286,marginLeft:230,marginBottom:10,marginRight:20}}>
             You Saved &#8377;{discount.toFixed(2)}
        </div>
    </div>
      <Button style={{border:'1px solid #ddd',borderRadius:25, width:matches?'91%':'93%',height:53,marginTop:10,color:'#fff',background:'#0078ad',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:14,letterSpacing:-0.07,lineHeight: 1.4285714286}} onClick={handlePlaceOrder} fullWidth>{btnTxt}</Button>
     </div>
     <Drawer anchor="right" open={open} onClose={handleClose}>
     <div style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {addressView()}
    </div>
</Drawer>

        </div>
    )
}