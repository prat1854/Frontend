import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchNodeAdminServices";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import PlusMinusButton from "./PlusMinusButton";
 
export default function ProductsScroll({title,data,refresh,setRefresh}) {
  var scrollRef = useRef();
  const theme = useTheme();
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const md_matches=useMediaQuery(theme.breakpoints.up("md"))
  
  var cartData=useSelector((state)=>state?.cart)
  var keys=Object.keys(cartData)
 
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: md_matches?6:matches?3:2,
    slidesToScroll: 1,
    arrows: false,
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
 const handleNavigateProductDetail=(item)=>{
  navigate("/productdetailpage",{state:{product:item}})

 }
  const showImages = () => {
    return (Array.isArray(data) ? data : []).map((item) => {
      if (!item) return null;
      var price = item.price || 0;
      var offerprice = item.offerprice || 0;
      var op = price > 0 ? parseInt(((price - offerprice) / price) * 100) : 0;
      return (
        <div key={item.productdetailid} style={{ display: "flex", flexDirection: "column"}}>
        
        <div  onClick={()=>handleNavigateProductDetail(item)} style={{ alignSelf:'center',height:matches?180:80 }}>
          <img
            src={`${serverURL}/images/${item.picture || ''}`}
            style={{ width:md_matches?'80%':matches?'60%':'50%', borderRadius: 10 }}
            alt={item.productdetailname || 'Product'}
          />
          </div>

        <div style={{height:115}}>
          
          <div
            style={{
                fontWeight:500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
              width: "70%",
              
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: matches?"2":"1",
              WebkitBoxOrient: "vertical",
             
            }}
          >
            {item.productdetailname}
          </div>

          {item.productdetailname && item.productdetailname.length<=20?<div style={{  fontWeight:500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,}}>&nbsp;</div>:<></>}
          <div   style={{
                fontWeight:500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
          }}>
            {item.weight} {item.weighttype}
          </div>
          {offerprice>0?<div style={{marginTop:7,display:'flex',flexDirection:'column'}}>
          <div   style={{
                fontWeight:500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
          }}>
             <span>&#8377;</span>{offerprice}
          </div>
          <div   style={{
                fontWeight:500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
                color:'grey'
          }}>
            <div style={{display:'flex',alignItems:'center',fontSize:12}}> <s><span>&#8377;{price}</span></s><span style={{margin:5,width:60,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:2,background:'#e5f7ee',color:'#03753c'}}>{op}% OFF</span></div>
          </div>
          
          </div>:<div> <div   style={{
            marginTop:7,
            fontWeight:500,
            fontSize: 14,
            letterSpacing: -0.07,
            lineHeight: 1.428571428,
             
          }}>
             <span>&#8377;</span>{price}
             
          </div>
          <div style={{   lineHeight: 1.428571428,}}>&nbsp;</div>      
          </div>}
        </div>

          <div>
            <PlusMinusButton qty={keys.includes(item?.productdetailid)?cartData[item?.productdetailid].qty:0} onChange={(value)=>handleChange(value,item)}/>
          </div>
          </div>
     );
    });
  };
  const handleNext = () => {
    if (scrollRef.current) scrollRef.current.slickNext();
  };

  const handlePrev = () => {
    if (scrollRef.current) scrollRef.current.slickPrev();
  };

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
        <div style={{fontWeight: 900, textTransform: 'capitalize', fontSize:24, letterSpacing:-0.72, lineHeight: 1, color: '#141414', marginBottom:5}}>{title}</div>
        <div style={{ padding: '30px', textAlign: 'center', background: '#f9f9f9', borderRadius: 12, border: '1px dashed #e0e0e0', color: '#888' }}>
          No products available.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{fontWeight: 900,
    textTransform: 'capitalize',
    fontSize:24,
    letterSpacing:-0.72,
    lineHeight: 1,
    color: '#141414',marginBottom:5}}>{title}</div>
    <div style={{ position: "relative" }}>
      {matches ? (
        <div
          onClick={handleNext}
          style={{
            top: "43%",
            left: "0.3%",
            zIndex: 2,
            position: "absolute",
            background: "#b2bec3",
            opacity: 0.5,
            width: 30,
            height: 30,
            borderRadius: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <KeyboardArrowLeftIcon style={{ color: "#fff" }} />
        </div>
      ) : (
        <div></div>
      )}

      <Slider ref={scrollRef} {...settings}>
        {showImages()}
      </Slider>

      {matches ? (
        <div
          onClick={handlePrev}
          style={{
            top: "43%",
            right: "2.8%",
            zIndex: 2,
            position: "absolute",
            opacity: 0.5,
            background: "#b2bec3",
            width: 30,
            height: 30,
            borderRadius: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <KeyboardArrowRightIcon style={{ color: "#fff" }} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
    </div>
  );
}
