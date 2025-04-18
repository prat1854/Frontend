import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import AdminLogin from "./components/admin/adminlogin/AdminLogin";
import Dashboard from "./components/admin/adminlogin/Dashboard";
import HomePage from "./components/userinterface/homepage/HomePage"
import PageCategoryDisplay from "./components/userinterface/pagedisplay/PageCategoryDisplay";
import ProductDetailPage from "./components/userinterface/productdetailspage/ProductDetailPage"
import CartDisplayPage from "./components/userinterface/mycart/CartDisplayPage"
import Login from "./components/userinterface/signin/Login"
import Otp from "./components/userinterface/signin/Otp"
import SetUp  from "./components/userinterface/signin/SetUp"
import Signin from "./components/admin/adminlogin/AdminLogin";
import MakePayment from "./components/userinterface/mycart/MakePayment";
import UserDashboard from "./components/userinterface/dashboard/UserDashboard";
import About from "./components/userinterface/dashboard/about";
import FAQ from "./components/userinterface/dashboard/faq";
import TermsAndConditions from "./components/userinterface/dashboard/TermsAndConditions";
import PrivacyPolicy from "./components/userinterface/dashboard/PrivacyPolicy";
function App() {
  return (
   <div>
    <Router>
      <Routes>
        <Route element={<AdminLogin/>} path="/adminlogin"></Route>
        <Route element={<Dashboard/>} path="/dashboard/*"></Route>


        // Earlier it was /homepage instead, now I changed it to /
        <Route element={<HomePage/>} path="/"></Route> 
        <Route element={<PageCategoryDisplay/>} path="/pagecategorydisplay"></Route>
        <Route element={<ProductDetailPage/>} path="/productdetailpage"></Route>
        <Route element={<CartDisplayPage/>} path="/cartdisplaypage"></Route>
        <Route element={<Login/>} path="/login"></Route>
        <Route element={<Otp/>} path="/otp"></Route>
        <Route element={<SetUp/>} path="/setup"></Route>
        <Route element={<Signin/>} path="/signin"></Route>
        <Route element={<MakePayment/>} path="/makepayment"></Route>
        <Route element={<UserDashboard/>} path="/userdashboard"></Route>
        <Route element={<About/>}path="/about"></Route>
        <Route element={<FAQ/>}path="/faq"></Route>
        <Route element={<TermsAndConditions/>} path="/terms"></Route>
        <Route element={<PrivacyPolicy/>} path="/privacy"></Route>
      </Routes>
    </Router>
   
   </div>
  );
}

export default App;
