
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom';
import Analytics from './page/Analytics';
import Profile from './page/Profile';
import Dashboard from './page/Dashboard';
import Login from './page/Login';
import Signup from './page/Signup';
import ActiveUser from './page/ActiveUser';
import PrivateRoutes from './middleware/PrivateRoute';
import PublicRoutes from './middleware/PublicRoute';
import UserContextProvider from './context/userContext';


function App() {

  const location = useLocation()

  function activateUser() {
    if (location.pathname) {
      let arr = location.pathname.split('/')
      return arr[2]
    }
  }


  return (
    <UserContextProvider>

      <div className='flex overflow-hidden'>
        {
          location.pathname == "/login" || location.pathname == "/signup" || location.pathname == `/activate-user/${activateUser()}` ? null : <Sidebar />
        }
        <div className='flex flex-col w-full'>
          {
            location.pathname == "/login" || location.pathname == "/signup" || location.pathname == `/activate-user/${activateUser()}` ? null : <Header />
          }

          <Routes >
            <Route element={<PrivateRoutes />}>
              <Route path='/analytics' element={<Analytics />} />
              <Route path='/settings' element={<Profile />} />
              <Route path='/' element={<Dashboard />} />
            </Route>

            <Route element={<PublicRoutes />}>
              <Route path='/activate-user/:token' element={<ActiveUser />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Route>


          </Routes>
        </div>

      </div>
    </UserContextProvider>
  )

}

export default App
