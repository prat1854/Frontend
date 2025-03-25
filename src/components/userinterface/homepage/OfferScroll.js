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
import { auto } from "@popperjs/core";
export default function OfferScroll({state,addata}){
    var scrollRef=useRef()
    const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: matches?3:2,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:2000,
        pauseOnHover:true,
      };   
     
    
      const data = ['a1.webp', 'a2.webp', 'a3.webp', 'a4.webp', 'a5.webp'];

      const showImages = () => {
       //   console.log("Data Array:", data);
      // console.log("Rendering Images...");
      
      return data.map((item, index) => {
          return (
              <div key={index}>
                      <img 
                        src={ `${serverURL}/images/${item}`}  // 
                        
                        style={{ width: '97%', gridTemplateColumns: "repeat(3, 1fr)", borderRadius: 10 }} 
                        alt={`Banner ${index + 1}`}
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

   {matches?<div onClick={handleNext} style={{top:'20%',left:'0.8%',zIndex:2,position:'absolute', background:'#b2bec3',opacity:0.5, width:30,height:30,borderRadius:15,display:'flex',alignItems:'center',justifyContent:'center'}}>
    <KeyboardArrowLeftIcon  style={{color:'#fff'}} />
    </div>:<div></div>}

 <Slider ref={scrollRef} {...settings}>
    {showImages()}
 </Slider>

{matches?<div onClick={handlePrev} style={{top:'20%',right:'2.8%',zIndex:2,position:'absolute',opacity:0.5, background:'#b2bec3',width:30,height:30,borderRadius:15,display:'flex',alignItems:'center',justifyContent:'center'}}>
    <KeyboardArrowRightIcon  style={{color:'#fff'}} />
    </div>:<div></div>}

    {/* New Image Section */}
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <img
            src={`${serverURL}/images/bannerdown.webp`} // Replace with your actual image name
            style={{ width: '100%', borderRadius: 10 }}
            alt="New Image"
        />
    </div>
</div>)

}