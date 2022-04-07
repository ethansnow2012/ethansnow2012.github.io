import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from 'containers/MainPage'
import { ContentPage } from 'containers/ContentPage'
// import { RootPage } from 'containers/Functional/RootPage'
import { RootPageHoc } from 'hoc/factory/RootPageHoc'
import { createContext } from 'react'

export const globalContext = createContext(null)

function App() {
  return (
    <div className="App">
      <globalContext.Provider value={
          {
            firebase:{
              self:window.firebase,
              firebaseGSignin: window.firebaseGSignin,
              firebaseGSignout: window.firebaseGSignout
            }
          }
        }>
        
        <BrowserRouter >
          <Routes>
            <Route path='/' element={RootPageHoc(MainPage, ContentPage, {priority:'left'})}></Route>
            {/* <Route path='/content1' element={<RootPage renderCode={'1'}/>}></Route>
            <Route path='/content2' element={<RootPage renderCode={'2'}/>}></Route> */}
            <Route path='/content/:id' element={RootPageHoc(MainPage, ContentPage, {priority:'right'})}></Route>
          </Routes>
        </BrowserRouter>
      </globalContext.Provider>
    </div>
  );
}

export default App;
