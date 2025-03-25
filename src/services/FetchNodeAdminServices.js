import axios from 'axios'
//const serverURL='http://192.168.29.195:5000' //mobile me access karne ke liye 

const serverURL='http://localhost:5000' // pc yeh laptop me access krni hai toh 
const currentDate=()=>{
  var d=new Date()
  var cd=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
  var ct=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
  return(cd+" "+ct)
}
const createDate=(date)=>{
  var d=new Date(date)
  var cd=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
  var ct=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
  return(cd+" "+ct)
}

const postData = async (url, body) => {
  try {
    const response = await axios.post(`${serverURL}/${url}`, body);
    //console.log(`✅ POST ${url} success:`, response.data);
    return response.data;
  } catch (error) {
   // console.error(`❌ POST ${url} failed:`, error?.response?.data || error.message);
    return error?.response?.data || { status: false, message: 'Unknown error occurred' };
  }

}

const getData=async(url)=>{
  try{
  var response= await axios.get(`${serverURL}/${url}`)  
  var result=response.data
  return result
  }
  catch(e)
  {
    return e.response.data
  }


}



export{ postData,serverURL,currentDate,getData,createDate}
