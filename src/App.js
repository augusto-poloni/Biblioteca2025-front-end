import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Menu from './componentes/Menu';
import Home from './paginas/Home';
import FormCategoria from './paginas/FormCategoria';
import ListaCategoria from './paginas/ListaCategoria';

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/categorias' element={<ListaCategoria/>}/>
          <Route path='/categoria' element={<FormCategoria/>}/>
          <Route path='/categoria/:id' element={<FormCategoria/>}/>
          <Route path='*' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
    
  );
}

export default App;
