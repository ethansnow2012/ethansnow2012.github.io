import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from 'containers/MainPage'
import { ContentPage } from 'containers/ContentPage'
import { LandingPage } from 'containers/LandingPage'
import { Web3TestPage } from 'containers/Web3TestPage'
// import { RootPage } from 'containers/Functional/RootPage'
import { RootPageHoc, SingleRootPageHoc } from 'hoc/factory/RootPageHoc'
import { createContext } from 'react'
import { ContentMeta } from 'components'
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles



export const globalContext = createContext(null)
const MainPageCombined = RootPageHoc(MainPage, ContentPage, {priority:'left'})
const ContentPageCombined = RootPageHoc(MainPage, ContentPage, {priority:'right'})
const Landing = SingleRootPageHoc(LandingPage)
function App() {
  AOS.init({
    duration: 100,
    //easing:'cubic-bezier(0, 0.95, 0, 0.99)'
  })
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
            <Route path='/' element={<Landing/>}></Route>
            <Route path='/web3test' element={<Web3TestPage/>}></Route>
            <Route path='/:author' element={<MainPageCombined/>}></Route>
            <Route path='/content/:author/:id' element={<ContentPageCombined/>}></Route>
          </Routes>
        </BrowserRouter>
      </globalContext.Provider>
      <Toaster />
    </div>
  );
}

export default App;
