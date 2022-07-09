import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home'; 
import Buddying from './pages/Buddying'; 
import FoundProfile from './pages/FoundUserProfile';
import CustomizedTimeline from  './components/PastVolunteerEvents';
import BuddyProfile from  './components/BuddyProfile';
import OrganisationPage from './pages/OrganisationPage';

import NotFound from './pages/NotFound'; 
import { useState } from 'react'; 

function App() {
  const [currentPage, setCurrentPage] = useState(0); 

  const setPage = page => {
    console.log(page); 
    setCurrentPage(page); 
  }

  return (
    
    <div className="App">
      <NavBar setPage={setPage}/> 
      
      {/* {currentPage === 0 && <Home />} */}
      {currentPage == 0 && <OrganisationPage/>}
      {currentPage === 1 && <Buddying />}
      {currentPage === 2 && <NotFound />}
      {currentPage > 2 && <NotFound />}
    
    </div>
  );
}

export default App;
