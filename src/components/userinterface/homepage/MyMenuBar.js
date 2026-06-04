import {useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {postData,getData} from '../../../services/FetchNodeAdminServices' 
import { Button,Menu,MenuBar, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MyMenuBar(){
const [category,setCategory]=useState([])   
const [subCategory,setSubCategory]=useState([])  

const [anchorEl, setAnchorEl] = useState(null)
const open = Boolean(anchorEl)
const navigate=useNavigate()
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
  fetchAllSubCategory(event.currentTarget.value)
};
const handleClose = () => {
  setAnchorEl(null);
};
//user_display_product_details_by_subcategory

const fetchAllProductDetailsBySubCategory=async(subcategoryid)=>{
  var result=await postData('userinterface/user_display_product_details_by_subcategory',{subcategoryid})
  navigate('/pagecategorydisplay',{state:{productData: (result && result.status && Array.isArray(result.data)) ? result.data : []}})
}

const fetchAllSubCategory=async(categoryid)=>{
  var result=await postData('userinterface/user_get_all_subcategory_by_categoryid',{categoryid})
  if (result && result.status && Array.isArray(result.data)) {
    setSubCategory(result.data)
  } else {
    setSubCategory([])
  }
}

const fetchAllCategory=async()=>{
  var result=await postData('userinterface/user_display_all_category',{status:'limit'})
  if (result && result.status && Array.isArray(result.data)) {
    setCategory(result.data)
  } else {
    setCategory([])
  }
}
useEffect(()=>{
    fetchAllCategory()
},[])

const showCategoryMenu=()=>{
  return (category || []).map((item)=>{
        return(<Button key={item.categoryid} value={item.categoryid} onClick={handleClick} style={{color:'#fff',fontWeight:'bold',marginLeft:10}}>{item.categoryname}</Button>)
    })
}


const showSubCategoryMenu=()=>{
  return (subCategory || []).map((item)=>{
        return(<MenuItem key={item.subcategoryid} onClick={()=>fetchAllProductDetailsBySubCategory(item.subcategoryid)} >{item.subcategoryname}</MenuItem>)
    })
}

  return(<div>
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{height:50,background:'#0c5273'}}>
        <Toolbar style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          
          {showCategoryMenu()}
          {/* <Button  style={{color:'#fff',fontWeight:'bold',marginLeft:10}}>All Category</Button> */}

          <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

     {showSubCategoryMenu()}
     
     

        </Menu>
          
        </Toolbar>
      </AppBar>
    </Box>
  </div>)

}