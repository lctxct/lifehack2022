import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home'; 
import Buddying from './pages/Buddying'; 

function App() {
  return (
    <div className="App">
      <NavBar /> 

      {/* <Home /> */}
      <Buddying /> 
    </div>
  );
}

export default App;
