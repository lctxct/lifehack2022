import './App.css';
import Home from './pages/Home'; 
import  ResponsiveDrawer from './pages/FoundUserProfile'
import ResponsiveAppBar from './components/NavBar'
function App() {
  return (
    
    <div className="App">
      {/* <Home /> */}
      
      <ResponsiveDrawer/>
    </div>
  );
}

export default App;
