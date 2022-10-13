import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from 'react-router-dom'
import './styles/app.scss'
import Canvas from './compoentns/Canvas'
import SettingBar from './compoentns/SettingBar'
import Toolbar from './compoentns/Toolbar'

import RootLayout from './layout/RootLayout'

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<RootLayout />}>
            <Route
              index
              loader={() => redirect(`/f${new Date().getTime().toString(16)}`)}
            />
            <Route
              path="/:id"
              element={
                <>
                  <Toolbar />
                  <SettingBar />
                  <Canvas />
                </>
              }
            ></Route>
          </Route>,
        ),
      )}
    />
  )
}

export default App
