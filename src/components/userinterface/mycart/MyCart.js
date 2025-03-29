import { postData,serverURL } from "../../../services/FetchNodeAdminServices"
import CartButton from "./CartButton";
import { Divider } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';
import PlusMinusButton from "../homepage/PlusMinusButton"
import { MapPin,User,Home,Pencil } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Drawer, Button, TextField, Grid, Paper } from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Swal from 'sweetalert2';

export default function MyCart({refresh,setRefresh})
{ const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const [open, setOpen] = useState(false);
    var dispatch=useDispatch()
    var cartData=useSelector((state)=>state.cart)
    var data =Object.values(cartData) 
    var keys =Object.keys(cartData) 
    var user=useSelector((state)=>state.user)
    var userData=Object.values(user)
    const navigate = useNavigate();

    // State variables for address form
    const [pinCode, setPinCode] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [floorNo, setFloorNo] = useState('');
    const [towerNo, setTowerNo] = useState('');
    const [building, setBuilding] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [selectedAddressType, setSelectedAddressType] = useState('');

    var totalamount=data.reduce((f,s)=>{
     var ap=0
      if(s.offerprice>0)
     {
      ap=s.offerprice*s.qty
     }
     else
     {
      ap=s.price*s.qty
     }
     return f+ap
    },0)

    const showAddress = () => {
      // Only show address if user is logged in
      if (!userData || userData.length === 0) {
        return null; // Return nothing if no user data
      }
      
      // Debug log to see what data we have
      //console.log("User data in showAddress:", userData[0]);
      
      const handleChangeAddress = () => {
            // Pre-populate form fields with existing address data
            if (userData[0]) {
              setPinCode(userData[0].pincode || '');
              setHouseNo(userData[0].houseno || '');
              setFloorNo(userData[0].floorno || '');
              setTowerNo(userData[0].towerno || '');
              setBuilding(userData[0].building || '');
              setAddress(userData[0].address || '');
              setLandmark(userData[0].landmark || '');
              setCity(userData[0].city || '');
              setState(userData[0].state || '');
            }
            setOpen(true); // Open drawer
      };
    
      return (
        <div
          style={{
            fontFamily: 'JioType, Helvetica, Arial, sans-serif',
            letterSpacing: -0.5,
            lineHeight: 1.4,
            marginTop: 30,
            marginLeft: 100,
            border: '1px solid #e0e0e0',
            borderRadius: 20,
            padding: 24,
            width: '35%',
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            position: 'relative',
          }}
        >
          {/* Change Address Button */}
          <div
            onClick={handleChangeAddress}
            style={{
              position: 'absolute',
              top: 20,
              right: 24,
              cursor: 'pointer',
              fontSize: 14,
              color: '#007bff',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Pencil size={14} />
            Change
          </div>
    
          <div
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: '#141414',
              marginBottom: 15,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <MapPin size={matches?20:15} /> Delivery Address
          </div>
    
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#333', display: 'flex', alignItems: 'center', gap: 6 }}>
              <User size={16} />
              {userData[0].firstname} {userData[0].lastname}
            </div>
    
            {/* Show address if any address field is available */}
            {(userData[0].address || userData[0].houseno || userData[0].pincode) && (
              <>
                {userData[0].address && (
                  <div style={{ color: '#555', fontSize: 14 }}>
                    <Home size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                    {userData[0].address}
                  </div>
                )}
                
                {(userData[0].building || userData[0].towerno) && (
                  <div style={{ fontSize: 14, color: '#555' }}>
                    {userData[0].building && userData[0].building}{userData[0].building && userData[0].towerno && ', '}
                    {userData[0].towerno && userData[0].towerno}
                    {userData[0].floorno && <span>, Floor: {userData[0].floorno}</span>}
                  </div>
                )}
                
                {userData[0].houseno && (
                  <div style={{ fontSize: 14, color: '#555' }}>House No: {userData[0].houseno}</div>
                )}
                
                {(userData[0].state || userData[0].city || userData[0].pincode) && (
                  <div style={{ fontSize: 14, color: '#555' }}>
                    {userData[0].state && userData[0].state}{userData[0].state && (userData[0].city || userData[0].pincode) && ', '}
                    {userData[0].city && userData[0].city}{userData[0].city && userData[0].pincode && ' - '}
                    {userData[0].pincode && userData[0].pincode}
                  </div>
                )}
              </>
            )}
            
            {/* Show prompt if no address */}
            {!userData[0].address && !userData[0].houseno && !userData[0].pincode && (
              <div style={{ fontSize: 14, color: '#f44336' }}>
                Please add your delivery address.
              </div>
            )}
          </div>
        </div>
      );
    };

    const handleChange=(value,item)=>{
      if(value==0)
      {
        dispatch({type:"DELETE_CART",payload:[item.productdetailid]})  
      }
      else
      {
      item['qty']=value
      dispatch({type:"ADD_CART",payload:[item.productdetailid,item]})
      }
       setRefresh(!refresh)
     }
        
      const CartDetails=()=>{
        return data.map((item,index)=>{
            var op=(item.price-item.offerprice)*item.qty
         return(
        <div >
            

        <div style={{display:'flex',alignItems:'center'}}>
            <div style={{marginLeft:matches?40:20,width:matches?'45%':'52%'}}>
                <img src={`${serverURL}/images/${item.picture}`} style={{width:matches?'25%':'60%',cursor:'pointer'}}/>
            </div>

           <div style={{display:'flex',flexDirection:'column',marginTop:'3%',marginLeft:matches?-200:-30}}>
                <div style={{cursor:'pointer',color:'rgba(0, 0, 0, .65)',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:528,fontSize:'.875rem',letterSpacing:-.07,lineHeight:1.4285714286}}>{item.productdetailname}</div>
                {item.offerprice>0?<>
                <div style={{display:'flex',alignItems:'center',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:16,letterSpacing:-0.08,lineHeight: 1.5,color:'#141414',marginTop:2}}>
                       &#8377;{item.offerprice*item.qty}&nbsp;<div style={{color:'#b5b5b5',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:14,letterSpacing:-0.07,lineHeight: 1.4285714286}}><s>&#8377;{item.price*item.qty}</s></div>
                </div>
                <div>
                <div style={{width:90,display:'flex',alignItems:'center',borderRadius:2,background:'#e5f7ee',color:'#03753c',fontSize:12,fontWeight:750,marginLeft:1,marginTop:4}}>You Save &#8377;{op} </div>
                </div></>:<>
                <div style={{display:'flex',alignItems:'center',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:16,letterSpacing:-0.08,lineHeight: 1.5,color:'#141414',marginTop:2}}>
                       &#8377;{item.price*item.qty}
                </div>
              
                </>}
                <div style={{display:'flex',alignItems:'center'}}>
                <div style={{color:'#b5b5b5',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:12,letterSpacing:-0.07,lineHeight: 1.4285714286,marginTop:4}} >
                 Sold by:
                </div>
                <div style={{color:'#141414',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:12,letterSpacing:-0.07,lineHeight: 1.4285714286,marginTop:4,marginLeft:2}}>
                Reliance Retail
                </div>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                <div style={{color:'#b5b5b5',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:12,letterSpacing:-0.07,lineHeight: 1.4285714286,marginTop:3}}>
                Size:
                </div>
                <div style={{color:'#141414',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:12,letterSpacing:-0.07,lineHeight: 1.4285714286,marginTop:4,marginLeft:2}}>
                {item.weight} {item.weighttype}    
                </div>
                </div>
            <div style={{marginLeft:matches?400:10,marginBottom:15}}>
            <PlusMinusButton qty={keys.includes(item?.productdetailid+"")?item?.qty:0} onChange={(value)=>handleChange(value,item)}/>
            </div>
          </div>
    
            
        </div>
        {index < data.length - 1 && (
            <Divider variant="middle" style={{width:'95%'}}/>
          )}
        </div>
        
             
         )
        })
       }

    // Function to handle form submission
    const handleSubmitAddress = async () => {
      // Ensure body matches the exact property names expected by the backend
      const body = {
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
      
      //console.log("Submitting address data:", body);
      
      var response = await postData('userinterface/submit_user_address', body);
      if(response.status) {
        // Store with same property names as the backend expects
        var userDataWithAddress = {...userData[0], ...body};
        dispatch({type: "ADD_USER", payload: [userData[0]?.userid, userDataWithAddress]});
        Swal.fire({
          icon: "success",
          text: response.message,
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
        setOpen(false);
        setRefresh(!refresh);
      } else {
        Swal.fire({
          icon: "error",
          text: response.message,
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
      }
    };

    // Handle address type selection
    const handleAddressTypeSelect = (type) => {
      setSelectedAddressType(type);
    };

    // Handle drawer close
    const handleClose = () => {
      setOpen(false);
    };

    // Handle using current location
    const handleUseCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(
              "Latitude:",
              position.coords.latitude,
              "Longitude:",
              position.coords.longitude
            );
            alert(
              `Location fetched: ${position.coords.latitude}, ${position.coords.longitude}`
            );
          },
          (error) => {
            console.error("Error fetching location:", error);
            alert("Unable to fetch location. Please enable location services.");
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    return(
        <div >
      
        
        {userData?.length>0?<div>{showAddress()}</div>:<div></div>}

        <div>
        <div style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:24,letterSpacing:-0.72,lineHeight: 1,marginTop:25,marginLeft:100}}>
            My Cart
         </div>
         <div style={{border:'0.5px solid #e2e2e2',borderRadius:20,marginLeft:'10%',marginTop:25,width:'80%'}}>
         <div style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:'1rem',letterSpacing:-0.72,lineHeight: 1.25,marginLeft:30,marginTop:25,marginBottom:20}}>Scheduled Delivery Basket</div>
         <div style={{marginRight:'5%',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:'1rem',letterSpacing:-0.08,lineHeight: 1.25,color:'#141414',marginTop:-40,marginLeft:matches?'90%':'80%'}}> &#8377;{totalamount}</div>  
           {CartDetails()}
          </div>
        </div>
             
        {/* Address Drawer */}
        <Drawer anchor="right" open={open} onClose={handleClose}>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {addressView()}
          </div>
        </Drawer>
        </div>
    )

    // Address Form View
    function addressView() {
      return (
        <div>
          <Paper style={{width:380,height:650,borderRadius:15,justifySelf:'right'}}>
            <div style={{marginLeft:25}}>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{marginTop:30,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:18,letterSpacing:0.15,lineHeight: 1}}>
                  Edit Address
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
              
              <div style={{marginTop:15,display:"flex", cursor:'pointer'}} onClick={handleUseCurrentLocation}> 
                <MyLocationIcon style={{fontSize:20,color:'#0078ad'}} />
                <div style={{color:'#0078ad',fontWeight: 500,fontSize: 13.5,letterSpacing: 0.25,lineHeight: 1.4285714286}}>
                  Use Current Location
                </div>
              </div>
              <div style={{fontWeight: 700,fontSize: 11.5,letterSpacing: 0.07,lineHeight: 1.4285714286,color: 'rgba(0, 0, 0, .65)',overflow: "hidden",textOverflow: 'ellipsis',display:"-webkit-box",webkitLineClamp: "1",webkitBoxOrient: "vertical",marginLeft:20}}>
                Using GPS
              </div>
              <Grid container spacing={1}>
                <Grid item xs={12} style={{width:'90%',marginTop:5}}>
                  <TextField onChange={(e)=>setPinCode(e.target.value)} label="Pin Code" variant="standard" fullWidth defaultValue={userData[0]?.pincode || ''} />
                </Grid>
                <Grid item xs={6} style={{marginTop:5,width:'45%'}}>
                  <TextField onChange={(e)=>setHouseNo(e.target.value)} label="House No." variant="standard" fullWidth defaultValue={userData[0]?.houseno || ''} />
                </Grid>
                <Grid item xs={6} style={{marginTop:5,width:'45%'}}>
                  <TextField onChange={(e)=>setFloorNo(e.target.value)} label="Floor No." variant="standard" fullWidth defaultValue={userData[0]?.floorno || ''} />
                </Grid>
                <Grid item xs={12} style={{width:'90%',marginTop:5}}>
                  <TextField onChange={(e)=>setTowerNo(e.target.value)} label="Tower No." variant="standard" fullWidth defaultValue={userData[0]?.towerno || ''} />
                </Grid>
                <Grid item xs={12} style={{width:'90%',marginTop:5}}>
                  <TextField onChange={(e)=>setBuilding(e.target.value)} label="Building / Apartment Name" variant="standard" fullWidth defaultValue={userData[0]?.building || ''} />
                </Grid>
                <Grid item xs={12} style={{width:'90%',marginTop:5}}>
                  <TextField onChange={(e)=>setAddress(e.target.value)} label="Address" variant="standard" fullWidth defaultValue={userData[0]?.address || ''} />
                </Grid>
                <Grid item xs={12} style={{width:'90%',marginTop:5}}>
                  <TextField onChange={(e)=>setLandmark(e.target.value)} label="Landmark / Area" variant="standard" fullWidth defaultValue={userData[0]?.landmark || ''} />
                </Grid>
                <Grid item xs={12} style={{width:'90%',marginTop:5}}>
                  <TextField onChange={(e)=>setCity(e.target.value)} label="City" variant="standard" fullWidth defaultValue={userData[0]?.city || ''} />
                </Grid>
                <Grid item xs={12} style={{width:'90%',marginTop:5}}>
                  <TextField onChange={(e)=>setState(e.target.value)} label="State" variant="standard" fullWidth defaultValue={userData[0]?.state || ''} />
                </Grid>
                
                <Grid item xs={12}>
                  <Button onClick={handleSubmitAddress} style={{borderRadius:25,height:53,marginTop:10,color:'#fff',background:'#0078ad',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:14,letterSpacing:-0.07,lineHeight: 1.4285714286,width:'95%'}} fullWidth>Save and Proceed</Button>
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
              <TextField label="Add New Address Type" variant="standard" placeholder="Eg: Club House, Kumar's Home" fullWidth /> 
            </div>
          </Paper>
        </div>
      );
    }
}