import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Slider from "@mui/material/Slider";
import { postData } from '../../../services/FetchNodeAdminServices';
import { Avatar, Divider, Grid, Paper,List,ListItem,ListItemButton,ListItemIcon,ListItemText } from '@mui/material';


const Accordion = styled((props) => (
      <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
      border: `0px solid ${theme.palette.divider}`,
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&::before': {
        display: 'none',
      },
    }));
    
    const AccordionSummary = styled((props) => (
      <MuiAccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ fontSize: '1.5rem', color: '#0652DD' }} />}
        {...props}
      />
    ))(({ theme }) => ({
      
      flexDirection: 'row-reverse',
      '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
      },
      '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
      },
      ...theme.applyStyles('white', {
        backgroundColor: 'inherit',
      }),
    }));
    
    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
      padding: theme.spacing(2),
     // borderBottom: '1px solid #e0e0e0',
    }));



export default function ShowCategory({data,scid,productData}) {

     const theme = useTheme();
     const matches = useMediaQuery(theme.breakpoints.up('md'));
     const [expanded, setExpanded] = React.useState('panel1');
     const [brands,setBrands]=React.useState([]) 
     const [filteredBrands,setFilteredBrands]=React.useState([])

     const fetchAllBrands=async(subcategoryid)=>{
      var result=await postData('userinterface/user_get_all_brand_by_subcategoryid',{subcategoryid:subcategoryid})
      const brandList = result && result.status && Array.isArray(result.data) ? result.data : []
      setBrands(brandList)
      
      // Filter brands based on products
      if(productData && productData.length > 0) {
        const productBrandIds = [...new Set((productData || []).map(product => product?.brandid))]
        const filtered = brandList.filter(brand => brand && productBrandIds.includes(brand.brandid))
        setFilteredBrands(filtered)
      } else {
        setFilteredBrands(brandList)
      }
    }

    const showAllBrands=()=>{
    return (filteredBrands || []).map((item)=>{
      return <div key={item?.brandid} style={{
        fontWeight:500,
        fontSize: 14,
        letterSpacing: -0.07,
        lineHeight: 1.4285714286,
        marginBottom:5}}>
          {item?.brandname}
      </div>
    })

    }

    React.useEffect(()=>{
   
      setExpanded(scid);
      fetchAllBrands(scid)
    },[scid,productData])

     const handleChange = (panel) => (event, newExpanded) => {
      fetchAllBrands(panel)
      setExpanded(newExpanded ? panel : false);
          
         };
  


   const [range, setRange] = React.useState([0, 30]);
   function handleChanges(event, newValue) {
            setRange(newValue);
         }

      const [range1, setRange1] = React.useState([0, 30]);
     function handleChange1(event, newValue) {
                  setRange1(newValue);
               }


    const showAllSubCategory=()=>{
      return (data || []).map((item)=>{
        return<div key={item.subcategoryid}><Accordion expanded={expanded ===item.subcategoryid} onChange={handleChange(item.subcategoryid)} style={{marginBottom:10}}  >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"style={{ display: 'flex',alignItems: 'center',flexGrow: 1,marginBottom:-15}} >
          <Typography style={{
           fontWeight: 700,
           fontSize: 14.5,
           letterSpacing: -0.07,
           lineHeight: 1.4285714286,
            width:'100%', 
            color: 'rgba(0, 0, 0, .65)',
            overflow: "hidden",
            textOverflow: 'ellipsis',
            display:"-webkit-box",
            webkitLineClamp: "1",
            webkitBoxOrient: "vertical",}} >{item.subcategoryname}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{marginLeft:30,marginTop:-5}}>
          {showAllBrands()}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Divider style={{width:'90%'}} />
      </div>
      })
    }


     return (
           <div>
            {matches?<div style={{display:'flex',flexDirection:'column'}}>
                  <div>
                    <Box  sx={{marginLeft:10,display: 'flex', flexWrap: 'wrap','& > :not(style)': { m: 1, width: 270, height: 500,}}}>
                      <section elevation={3}  style={{position:'relative',padding: 16,borderRadius: 24,border: '1px solid #e0e0e0',overflow: 'hidden'}}>
                        <div style={{padding:15,borderRadius:24,fontWeight: 900,fontSize: 24,letterSpacing: -0.72,lineHeight: 1 }}>Category</div>
                        <div style={{float:'left',width:300,overflowY:'auto',height: 450}}>

                       {showAllSubCategory()}
               </div>
              </section>
             </Box>
            </div>

           <div style={{marginTop:10}}>
             <Box  sx={{marginLeft:10,display: 'flex', flexWrap: 'wrap','& > :not(style)': { m: 1, width: 250, height: 800,}}}>
                      <section elevation={3}  style={{position:'relative',padding: 16,borderRadius: 24,border: '1px solid #e0e0e0',overflow: 'hidden'}}>
                        <div style={{marginBottom:12,paddingLeft:15,borderRadius:24,fontWeight: 900,fontSize: 24,letterSpacing: -0.72,lineHeight: 1 }}>Filters</div>
                        
                        <div style={{display: 'flex',alignItems: 'center',clear: 'both',paddingLeft:15,fontWeight: 800,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,color:'#141414',webkitFontSmoothing: 'antialiased'}}>
                        Availability</div>

                       <div style={{paddingLeft:8,display: 'flex', marginTop: 12,marginBottom: 12 }}>
                        <label style={{ fontWeight: 500,fontSize: 15,letterSpacing: -0.07,lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start',color: 'rgba(0, 0, 0, .65)',cursor: 'pointer',position: 'relative'}}> 
                          <span><input type='checkBox' style={{marginLeft: '0.90em',display: 'inline-block', width: '1.25em',height: '1.25em',marginRight: 9,border: '1 solid rgba(0, 0, 0, .65)',borderRadius: 4}} name='stock' id='instock' value={1} autoComplete='off'/></span>
                            <span>
                           Include Out of stock
                             </span>
                        </label>
                       </div>

                       <Divider style={{width:'100%',marginTop:10,marginBottom:10}} />
                            
                       <div style={{display: 'flex',alignItems: 'center',clear: 'both',paddingLeft:15,fontWeight: 800,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,color:'#141414',webkitFontSmoothing: 'antialiased'}}>
                       Brand</div>

                       {(filteredBrands || []).map((brand) => (
                         <div key={brand?.brandid} style={{paddingLeft:8,display: 'flex', marginTop: 12,marginBottom: 12 }}>
                           <label style={{ fontWeight: 500,fontSize: 15,letterSpacing: -0.07,lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start',color: 'rgba(0, 0, 0, .65)',cursor: 'pointer',position: 'relative'}}> 
                             <span><input type='checkBox' style={{marginLeft: '0.90em',display: 'inline-block', width: '1.25em',height: '1.25em',marginRight: 9,border: '1 solid rgba(0, 0, 0, .65)',borderRadius: 4}} name='brand' value={brand?.brandid} autoComplete='off'/></span>
                               <span>
                               {brand?.brandname}
                               </span>
                           </label>
                         </div>
                       ))}

                       <Divider style={{width:'100%',marginTop:10,marginBottom:10}} />
                       
                       <div style={{display: 'flex',alignItems: 'center',marginBottom:15,clear: 'both',paddingLeft:15,fontWeight: 800,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,color:'#141414',webkitFontSmoothing: 'antialiased'}}>
                       Price</div>

                       {/* Price Range Slider */}
                       <div style={{paddingLeft:15, paddingRight:15, marginBottom:20}}>
                         <Box sx={{ width: '100%' }}>
                           <Slider
                             value={range}
                             onChange={handleChanges}
                             valueLabelDisplay="auto"
                             min={0}
                             max={10000}
                             step={100}
                           />
                           <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10}}>
                             <div style={{fontWeight: 500, fontSize: 14}}>₹{range[0]}</div>
                             <div style={{fontWeight: 500, fontSize: 14}}>₹{range[1]}</div>
                           </div>
                         </Box>
                       </div>

                       <Divider style={{width:'100%',marginTop:10,marginBottom:10}} />
                       
                       {/* Discount Section */}
                       <div style={{display: 'flex',alignItems: 'center',clear: 'both',paddingLeft:15,fontWeight: 800,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,color:'#141414',webkitFontSmoothing: 'antialiased', marginBottom:15}}>
                         Discount</div>
                       
                       <div style={{paddingLeft:8,display: 'flex', marginTop: 12,marginBottom: 12, flexDirection: 'column' }}>
                         <label style={{ fontWeight: 500,fontSize: 15,letterSpacing: -0.07,lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start',color: 'rgba(0, 0, 0, .65)',cursor: 'pointer',position: 'relative', marginBottom: 8}}> 
                           <span><input type='radio' name='discount' style={{marginLeft: '0.90em',display: 'inline-block', width: '1.25em',height: '1.25em',marginRight: 9,border: '1 solid rgba(0, 0, 0, .65)',borderRadius: 4}} value='10' autoComplete='off'/></span>
                           <span>10% and above</span>
                         </label>
                         <label style={{ fontWeight: 500,fontSize: 15,letterSpacing: -0.07,lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start',color: 'rgba(0, 0, 0, .65)',cursor: 'pointer',position: 'relative', marginBottom: 8}}> 
                           <span><input type='radio' name='discount' style={{marginLeft: '0.90em',display: 'inline-block', width: '1.25em',height: '1.25em',marginRight: 9,border: '1 solid rgba(0, 0, 0, .65)',borderRadius: 4}} value='20' autoComplete='off'/></span>
                           <span>20% and above</span>
                         </label>
                         <label style={{ fontWeight: 500,fontSize: 15,letterSpacing: -0.07,lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start',color: 'rgba(0, 0, 0, .65)',cursor: 'pointer',position: 'relative', marginBottom: 8}}> 
                           <span><input type='radio' name='discount' style={{marginLeft: '0.90em',display: 'inline-block', width: '1.25em',height: '1.25em',marginRight: 9,border: '1 solid rgba(0, 0, 0, .65)',borderRadius: 4}} value='30' autoComplete='off'/></span>
                           <span>30% and above</span>
                         </label>
                         <label style={{ fontWeight: 500,fontSize: 15,letterSpacing: -0.07,lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start',color: 'rgba(0, 0, 0, .65)',cursor: 'pointer',position: 'relative'}}> 
                           <span><input type='radio' name='discount' style={{marginLeft: '0.90em',display: 'inline-block', width: '1.25em',height: '1.25em',marginRight: 9,border: '1 solid rgba(0, 0, 0, .65)',borderRadius: 4}} value='50' autoComplete='off'/></span>
                           <span>50% and above</span>
                         </label>
                       </div>

                       <Divider style={{width:'100%',marginTop:10,marginBottom:10}} />
                 </section>
               </Box>
              </div>
             
            </div>:<></>
            }

      </div>
     )

}