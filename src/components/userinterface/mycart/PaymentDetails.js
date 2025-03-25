import { Divider,Paper,Grid,TextField,Button } from "@mui/material"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { useState } from "react";
import StepLabel from '@mui/material/StepLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { postData } from "../../../services/FetchNodeAdminServices";
import Drawer from '@mui/material/Drawer';
import MyLocationIcon from '@mui/icons-material/MyLocation';
export default function PaymentDetails(){
  const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    var [open,setOpen]=useState(false)
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
const handleClose=(bool)=>{
  setOpen(bool)
}
  const handlePlaceOrder=async()=>{
   if(userData.length==0) 
   { 
   navigate('/login')
   }
   else
   {
    var response=await postData('userinterface/check_user_address',{userid:userData[0]?.userid})
    if(response.status)
    { //dispatch({type:"ADD_USER",payload:[response.data.userid,response.data]})
    //navigate('/cartdisplaypage')
     alert('payment')
    }
    else
    {
      setOpen(true)
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
 
 const addressView=()=>{
  return (
    <div>
  <Paper style={{width:380,height:650,borderRadius:15,justifySelf:'right'}}>
        <div style={{marginLeft:25}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
           <div style={{marginTop:30,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:18,letterSpacing:0.15,lineHeight: 1}}>
            Add Address
           </div>
           <div>
           <img src={'/cross.png'} style={{width:15,height:15,marginTop:30,marginRight:20}}/> 
           </div>
        </div>
        <div style={{marginTop:30,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:14,letterSpacing:0.15,lineHeight: 1}}>
            Address Details
        </div>
        
       <div style={{marginTop:15,display:"flex"}}>
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
       <TextField  label="Pin Code" variant="standard" fullWidth />
       </Grid>
       <Grid item xs={6}  style={{marginTop:5,width:'45%'}} >
       <TextField  label="House No." variant="standard" fullWidth />
       </Grid>
       <Grid item xs={6}  style={{marginTop:5,width:'45%'}} >
       <TextField  label="Floor No." variant="standard" fullWidth />
       </Grid>
       <Grid item xs={12}  style={{width:'90%',marginTop:5}} >
       <TextField  label="Tower No." variant="standard" fullWidth />
       </Grid>
       <Grid item xs={12}  style={{width:'90%',marginTop:5}} >
       <TextField  label="Building / Apartment Name" variant="standard" fullWidth />
       </Grid>
       <Grid item xs={12}  style={{width:'90%',marginTop:5}} >
       <TextField  label="Address" variant="standard" fullWidth />
       </Grid>
       <Grid item xs={12}  style={{width:'90%',marginTop:5}} >
       <TextField  label="Landmark / Area" variant="standard" fullWidth />
       </Grid>
       <Grid item xs={12}  style={{width:'90%',marginTop:5}} >
       <TextField  label="City, State" variant="standard" fullWidth />
       </Grid>
       <Grid item xs={12}>
       <Button style={{borderRadius:25,height:53,marginTop:10,color:'#fff',background:'#0078ad',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:14,letterSpacing:-0.07,lineHeight: 1.4285714286,width:'95%'}} fullWidth>Save and Proceed</Button>
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
            <div style={{cursor:'pointer',width:70,height:28,border:'1px solid #ddd',display:'flex',justifyContent:'center',borderRadius:15,padding:3,color:'#0078ad',marginTop:2,fontWeight: 500,fontSize: 15,letterSpacing: 0.25,lineHeight: 1.4285714286,alignItems:'center'}}>
                    Home
            </div>
            <div style={{cursor:'pointer',width:70,height:28,border:'1px solid #ddd',display:'flex',justifyContent:'center',borderRadius:15,padding:3,color:'#0078ad',marginTop:2,fontWeight: 500,fontSize: 15,letterSpacing: 0.25,lineHeight: 1.4285714286,alignItems:'center'}}>
                    Work
            </div>
            <div style={{cursor:'pointer',width:70,height:28,border:'1px solid #ddd',display:'flex',justifyContent:'center',borderRadius:15,padding:3,color:'#0078ad',marginTop:2,fontWeight: 500,fontSize: 15,letterSpacing: 0.25,lineHeight: 1.4285714286,alignItems:'center'}}>
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
      <Button style={{border:'1px solid #ddd',borderRadius:25, width:matches?'91%':'93%',height:53,marginTop:10,color:'#fff',background:'#0078ad',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:14,letterSpacing:-0.07,lineHeight: 1.4285714286}} onClick={handlePlaceOrder} fullWidth>Place Order</Button>
     </div>
     <Drawer anchor={"right"} open={open} onClose={()=>handleClose(false)}>
      {addressView()}
      </Drawer>
        </div>
    )
}