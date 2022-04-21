import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from 'containers/MainPage'
import { ContentPage } from 'containers/ContentPage'
// import { RootPage } from 'containers/Functional/RootPage'
import { RootPageHoc } from 'hoc/factory/RootPageHoc'
import { createContext } from 'react'
import { ContentMeta } from 'components'



export const globalContext = createContext(null)
const MainPageCombined = RootPageHoc(MainPage, ContentPage, {priority:'left'})
const ContentPageCombined = RootPageHoc(MainPage, ContentPage, {priority:'right'})

function App() {
  
  return (
    <div className="App">
      <ContentMeta/>
      <globalContext.Provider value={
          { // pseudo type define: fireGlobalContext
            firebase:{
              self:window.firebase,
              store:window.firestore,
              firebaseGSignin: window.firebaseGSignin,
              firebaseGSignout: window.firebaseGSignout
            }
          }
        }>
        
        <BrowserRouter >
          <Routes>
            <Route path='/' element={<MainPageCombined/>}></Route>
            <Route path='/:author' element={<MainPageCombined/>}></Route>
            {/* <Route path='/content1' element={<RootPage renderCode={'1'}/>}></Route>
            <Route path='/content2' element={<RootPage renderCode={'2'}/>}></Route> */}
            <Route path='/content/:id' element={<ContentPageCombined/>}></Route>
          </Routes>
        </BrowserRouter>
      </globalContext.Provider>
    </div>
  );
}

export default App;
