import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom';
import {Home, ProductDetail, Purchases} from "./pages"
import {LoadingScreen, NavBar} from './components/';
import { useSelector } from 'react-redux';


function App() {
  const isLoading= useSelector(state=> state.isLoading);
  return (
    <div className="App">
    <HashRouter>
      {isLoading&&<LoadingScreen/>}
      <NavBar/>
        <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='/product/:id' element={<ProductDetail/>}/>
          <Route path='/purchases' element={<Purchases/>}/>
          
        </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
