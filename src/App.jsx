// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
// } from 'react-router-dom'
import './styles/app.scss'
import Canvas from './compoentns/Canvas'
import SettingBar from './compoentns/SettingBar'
import Toolbar from './compoentns/Toolbar'

// import RootLayout from './layout/RootLayout'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
//       <Route path="/:id">
//         <Toolbar />
//         <SettingBar />
//         <Canvas />
//       </Route>
//     </Route>,
//     // <Route path="/" element={<RootLayout/>}>
//     //   <Route path="/:id">
//     //     <Toolbar />
//     //     <SettingBar />
//     //     <Canvas />
//     //   </Route>
//     // </Route>,
//   ),
// )

function App() {
  return (
    <div className="app">
      <Toolbar />
      <SettingBar />
      <Canvas />
    </div>
    // <RouterProvider router={router}

    // <div className="app">
    //   <Switch>
    //     <Route path="/:id">
    //       <Toolbar />
    //       <SettingBar />
    //       <Canvas />
    //     </Route>
    //     <Redirect to={`f${(+new Date()).toString(16)}`} />
    //   </Switch>
    // </div>
  )
}

export default App
