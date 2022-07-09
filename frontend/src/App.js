import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home'; 
import Buddying from './pages/Buddying'; 
import FoundProfile from './pages/FoundUserProfile';
import CustomizedTimeline from  './components/pastVolunteerEvents';
import BuddyProfile from  './components/BuddyProfile';
import OrganisationPage from './pages/organisationPage';


function App() {
  return (
    
    <div className="App">
      <NavBar /> 
      {/* <FoundProfile/> */}
<OrganisationPage/>
      {/* <Home /> */}
      {/* <Buddying />  */}
      {/* <ResponsiveDrawer/> */}
      {/* <BuddyProfile/>
      <CustomizedTimeline/> */}
      
    </div>
  );
}

export default App;
