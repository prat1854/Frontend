import { useEffect,useState } from 'react'
import Footer from '../homepage/Footer'
import Header from '../homepage/Header'
import ShowCategory from './ShowCategory'
import ProductDetailsCategory from '../pagedisplay/ProductDetailsCategory'
import { postData,getData } from '../../../services/FetchNodeAdminServices'
import { useLocation } from 'react-router-dom'

export default function PageCategoryDisplay()
{    const [category,setCategory]=useState([])
  const [refresh,setRefresh]=useState(false)

  var location=useLocation()
  var productData=location?.state?.productData 
   
  
  const fetchAllCategory=async()=>{
    var result=await getData('userinterface/user_display_all_subcategory')
    console.log('Category API Response:', result)
    setCategory(result.data)
  }
  useEffect(()=>{
      fetchAllCategory()
  },[])

  console.log('Current category state:', category)
  console.log('Current productData:', productData)
  
       return(<div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
              
              <div>
              <Header />
              </div>

              <div style={{marginTop: 50,display: 'flex',flexDirection:'column',position: 'relative',backgroundColor: '#fff'}}>
                <span style={{display:'flex',backgroundColor: '#fff'}}>
                  <ShowCategory data={category} scid={productData?.[0]?.subcategoryid} productData={productData}/>
                 <ProductDetailsCategory  refresh={refresh} setRefresh={setRefresh} productData={productData}/>
                 </span>
              </div>
             
              <div>
              <Footer/>
              </div>
             
         </div>)
}  