import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from 'containers/MainPage'
import { ContentPage } from 'containers/ContentPage'
// import { RootPage } from 'containers/Functional/RootPage'
import { RootPageHoc } from 'hoc/factory/RootPageHoc'


function App() {
  return (
    <div className="App">

      <BrowserRouter >
        <Routes>
          <Route path='/' element={RootPageHoc(MainPage, ContentPage, {priority:'left'})}></Route>
          {/* <Route path='/content1' element={<RootPage renderCode={'1'}/>}></Route>
          <Route path='/content2' element={<RootPage renderCode={'2'}/>}></Route> */}
          <Route path='/xcontent' element={RootPageHoc(MainPage, ContentPage, {priority:'right'})}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
