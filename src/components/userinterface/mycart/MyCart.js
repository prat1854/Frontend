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
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    const showAddress=()=>{
      
      if(userData && userData.length>0 && userData[0].address) {
        return (
          <div style={{ width: '58%', display: 'flex', justifyContent: 'flex-end' }}>
          <Paper style={{
            padding: 16,
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            maxWidth: '550px',
            width: '100%', // optional: you can keep this for responsiveness
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7, width: '100%' }}>
              <div style={{ fontWeight: 600, fontSize: 16 }}>Delivery Address</div>
              <Button
                size="small"
                style={{
                  color: '#0078ad',
                  textTransform: 'none',
                  fontWeight: 500,
                  marginRight: -8
                }}
                onClick={() => setOpen(true)}
              >
                Change
              </Button>
            </div>
        
            <div style={{
              fontWeight: 500,
              marginTop: 8,
              display: 'flex',
              alignItems: 'center'
            }}>
              <User size={18} style={{ marginRight: 6, color: '#505050' }} />
              {userData[0].firstname} {userData[0].lastname}
            </div>
        
            <div style={{
              marginTop: 6,
              display: 'flex',
              alignItems: 'flex-start'
            }}>
              <Home size={18} style={{ marginRight: 6, marginTop: 3, color: '#505050' }} />
              <div style={{
                maxWidth: '460px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordWrap: 'break-word'
              }}>
                {userData[0].address}{userData[0].building && `, ${userData[0].building}`}
                {userData[0].towerno && `, Tower ${userData[0].towerno}`}
                {userData[0].floorno && `, Floor ${userData[0].floorno}`}
                {userData[0].houseno && `, House No: ${userData[0].houseno}`}
                <div>
                  {userData[0].city && `${userData[0].city}, `}
                  {userData[0].state && `${userData[0].state}, `}
                  {userData[0].pincode && userData[0].pincode}
                </div>
              </div>
            </div>
          </Paper>
        </div>
        
        )
      } else {
        return (
          <Paper style={{
            padding:16, 
            borderRadius:8, 
            boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
            maxWidth: '550px',
            marginLeft: isMobile ? 10 : 45,   
           }}>
            <div style={{fontWeight:600, marginBottom:15}}>Delivery Address</div>
            <div style={{
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
              justifyContent:'center',
              padding:'16px 0'
            }}>
              <MapPin size={36} style={{color:'#0078ad', marginBottom:12}} />
              <div style={{color:'#505050', marginBottom:16}}>Please add your delivery address</div>
              <Button 
                variant="contained" 
                onClick={()=>setOpen(true)}
                style={{
                  backgroundColor:'#0078ad',
                  textTransform:'none',
                  borderRadius:25,
                  padding:'8px 20px'
                }}
              >
                Add Address
              </Button>
            </div>
          </Paper>
        )
      }
    }

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

    return(
      <div
        style={{
          padding: '30px 20px',
          maxWidth: '100%',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {userData?.length > 0 ? <div>{showAddress()}</div> : <div></div>}

        <div>
          <div
            style={{
              fontFamily: 'JioType, helvetica, arial, sans-serif',
              fontWeight: 700,
              fontSize: '24px',
              marginTop: '25px',
              marginBottom: '20px',
              marginLeft: '45px',
              textAlign: 'left',
            }}
          >
            My Cart
          </div>

          <div
            style={{
              border: '1px solid #e2e2e2',
              borderRadius: 12,
              marginBottom: 30,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              width: '100%',
              maxWidth: '990px',
              margin: '0 auto',
            }}
          >
            {/* Header Box */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 20px',
                borderBottom: '1px solid #f0f0f0',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  fontFamily: 'JioType, helvetica, arial, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  marginBottom: '5px',
                }}
              >
                Scheduled Delivery Basket
              </div>
              <div
                style={{
                  fontFamily: 'JioType, helvetica, arial, sans-serif',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: '#141414',
                }}
              >
                ₹{totalamount}
              </div>
            </div>

            {/* Cart Details */}
            <div style={{ padding: '10px' }}>{CartDetails()}</div>
          </div>
        </div>
        
        {/* Address Drawer */}
        <Drawer 
          anchor="right" 
          open={open} 
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: 420,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              overflowY: 'auto'
            }
          }}
        >
          {addressView()}
        </Drawer>
      </div>
    )

    // Address Form View
    function addressView() {
      return (
        <div>
          <Paper style={{width:380, padding:20, borderRadius:12, justifySelf:'right'}}>
            <div style={{
              display:'flex',
              justifyContent:'space-between',
              alignItems:'center',
              marginBottom:24
            }}>
              <div style={{
                fontFamily:'JioType, helvetica, arial, sans-serif',
                fontWeight:700,
                fontSize:18
              }}>
                {userData[0]?.address ? 'Edit Address' : 'Add New Address'}
              </div>
              <Button 
                variant="outlined" 
                size="small"
                onClick={handleClose}
                style={{
                  borderRadius:20,
                  textTransform:'none',
                  minWidth:0,
                  padding:'4px 12px'
                }}
              >
                Close
              </Button>
            </div>
            
            <div style={{
              display:'flex',
              alignItems:'center',
              marginBottom:16
            }}>
              <MyLocationIcon 
                style={{
                  color:'#0078ad',
                  marginRight:8,
                  fontSize:20
                }} 
              />
              <Button
                variant="text"
                style={{
                  color:'#0078ad',
                  textTransform:'none',
                  padding:0,
                  fontWeight:500
                }}
                onClick={handleUseCurrentLocation}
              >
                Use Current Location
              </Button>
            </div>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField 
                  onChange={(e)=>setPinCode(e.target.value)} 
                  label="Pin Code" 
                  variant="outlined" 
                  fullWidth 
                  defaultValue={userData[0]?.pincode || ''} 
                  size="small"
                  InputProps={{
                    style: { borderRadius: 8 }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  onChange={(e)=>setHouseNo(e.target.value)} 
                  label="House No." 
                  variant="outlined" 
                  fullWidth 
                  defaultValue={userData[0]?.houseno || ''} 
                  size="small"
                  InputProps={{
                    style: { borderRadius: 8 }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  onChange={(e)=>setFloorNo(e.target.value)} 
                  label="Floor No." 
                  variant="outlined" 
                  fullWidth 
                  defaultValue={userData[0]?.floorno || ''} 
                  size="small"
                  InputProps={{
                    style: { borderRadius: 8 }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  onChange={(e)=>setTowerNo(e.target.value)} 
                  label="Tower No." 
                  variant="outlined" 
                  fullWidth 
                  defaultValue={userData[0]?.towerno || ''} 
                  size="small"
                  InputProps={{
                    style: { borderRadius: 8 }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  onChange={(e)=>setBuilding(e.target.value)} 
                  label="Building / Apartment Name" 
                  variant="outlined" 
                  fullWidth 
                  defaultValue={userData[0]?.building || ''} 
                  size="small"
                  InputProps={{
                    style: { borderRadius: 8 }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  onChange={(e)=>setAddress(e.target.value)} 
                  label="Address" 
                  variant="outlined" 
                  fullWidth 
                  multiline
                  rows={2}
                  defaultValue={userData[0]?.address || ''} 
                  size="small"
                  InputProps={{
                    style: { borderRadius: 8 }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  onChange={(e)=>setLandmark(e.target.value)} 
                  label="Landmark / Area" 
                  variant="outlined" 
                  fullWidth 
                  defaultValue={userData[0]?.landmark || ''} 
                  size="small"
                  InputProps={{
                    style: { borderRadius: 8 }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  onChange={(e)=>setCity(e.target.value)} 
                  label="City" 
                  variant="outlined" 
                  fullWidth 
                  defaultValue={userData[0]?.city || ''} 
                  size="small"
                  InputProps={{
                    style: { borderRadius: 8 }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  onChange={(e)=>setState(e.target.value)} 
                  label="State" 
                  variant="outlined" 
                  fullWidth 
                  defaultValue={userData[0]?.state || ''} 
                  size="small"
                  InputProps={{
                    style: { borderRadius: 8 }
                  }}
                />
              </Grid>
            </Grid>

            <div style={{marginTop:24}}>
              <div style={{
                marginBottom:16,
                fontWeight:600,
                fontSize:16
              }}>
                Address Type
              </div>
              <div style={{
                display:'flex',
                gap:12,
                marginBottom:16
              }}>
                <Button 
                  variant={selectedAddressType === 'Home' ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleAddressTypeSelect('Home')}
                  style={{
                    borderRadius:20,
                    textTransform:'none',
                    minWidth:80
                  }}
                >
                  Home
                </Button>
                <Button 
                  variant={selectedAddressType === 'Work' ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleAddressTypeSelect('Work')}
                  style={{
                    borderRadius:20,
                    textTransform:'none',
                    minWidth:80
                  }}
                >
                  Work
                </Button>
                <Button 
                  variant={selectedAddressType === 'Other' ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleAddressTypeSelect('Other')}
                  style={{
                    borderRadius:20,
                    textTransform:'none',
                    minWidth:80
                  }}
                >
                  Other
                </Button>
              </div>

            </div>
            
            <Button 
              variant="contained"
              fullWidth
              onClick={handleSubmitAddress}
              style={{
                marginTop:24,
                borderRadius:25,
                padding:'10px 0',
                textTransform:'none',
                backgroundColor:'#0078ad',
                fontWeight:600
              }}
            >
              Save Address
            </Button>
          </Paper>
        </div>
      );
    }
}