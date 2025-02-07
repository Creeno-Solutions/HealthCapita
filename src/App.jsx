import { Route, Routes,Navigate } from "react-router-dom";
import Header from "./Header/Header";
import HraAssesment from "./Pages/HRA/Hra/HraAssesment";
import Summarydetails from "./Pages/HRA/PersonalAndFamily/SummarryDetails";
import HraMainDashboard from "./Pages/HRA/Hra/HraDashboard/HraMainDashboard";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Dashboard from "./Pages/PhrDashboard/Dashboard";
import { useLocation } from "react-router-dom";
import Phr from "./Pages/PHR/Phr";
import OverviewPhrUpdate from './Pages/PHR/PhrNavbar/Overview/Allergies/AllergiesUpdate/OverviewPhrUpdate'




function App()   {
  const location = useLocation()
  console.log(location)
  const HideHeaderandFooter = location.pathname === '/Login'
  console.log(HideHeaderandFooter)
  return ( 
  <>
      {!HideHeaderandFooter && <Header />}
      <Routes>
        <Route path='/' element={<Navigate to='/Login' />} />
        <Route path="/phr" element={<Phr/>} />
        <Route path='/Login' element={<Login/>}/>
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/hraassessment/new" element={<HraAssesment />} />
        <Route path="/hraassessment/edit" element={<HraAssesment />} />
        <Route path="/HraDashboard/:id" element= {<HraMainDashboard/>} />
        <Route path='/assessment' element={<Summarydetails />} />
        <Route path='/OverviewPhrUpdate' element={<OverviewPhrUpdate/>} />
      </Routes>
   {!HideHeaderandFooter &&  <Footer/>}
    </>
  );
}

export default App;
