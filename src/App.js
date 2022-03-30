import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from 'containers/MainPage'
import { RecolePage } from 'containers/RecolePage'

function App() {
  return (
    <div className="App">

      <BrowserRouter >
        <Routes>
          <Route path='/' element={<MainPage/>}></Route>
          <Route path='/recole' element={<RecolePage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
