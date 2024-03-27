import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import FileUploadComponent from './pages/File';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/file' element={<FileUploadComponent/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
