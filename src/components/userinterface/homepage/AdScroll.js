import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchNodeAdminServices";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRef } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { setRef } from "@mui/material";
export default function AdScroll({addata}){
    var scrollRef=useRef()
    const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: matches ?  3:1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:2000,
        pauseOnHover:true,
        pauseOnFocus:true,
      };   
      const data = ['c1.webp', 'c2.webp', 'c3.webp', 'c4.webp', 'c5.webp'];

      const showImages = () => {
          return data.map((item, index) => {
              return (
                  <div key={index}>
                     <img 
                        src={`${serverURL}/images/${item}`}  
        style={{ 
        width: "100%", 
        borderRadius: "24px", 
        overflow: "hidden", 
        display: "block", 
        maxWidth: "384px" 
        }}
/>

                  </div>
              );
          });
      };

const handleNext=()=>{
scrollRef.current.slickNext()
}

const handlePrev=()=>{
    scrollRef.current.slickPrev()
}

return(<div  style={{position:'relative'}}>

   {matches?<div onClick={handleNext} style={{top:'43%',left:'0.8%',zIndex:2,position:'absolute', background:'#b2bec3',opacity:0.5, width:30,height:30,borderRadius:15,display:'flex',alignItems:'center',justifyContent:'center'}}>
    <KeyboardArrowLeftIcon  style={{color:'#fff'}} />
    </div>:<div></div>}

 <Slider ref={scrollRef} {...settings}>
    {showImages()}
 </Slider>

{matches?<div onClick={handlePrev} style={{top:'43%',right:'2.8%',zIndex:2,position:'absolute',opacity:0.5, background:'#b2bec3',width:30,height:30,borderRadius:15,display:'flex',alignItems:'center',justifyContent:'center'}}>
    <KeyboardArrowRightIcon  style={{color:'#fff'}} />
    </div>:<div></div>}
</div>)

}