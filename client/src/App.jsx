
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import Analytics from './page/Analytics';
import Profile from './page/Profile';
import Dashboard from './page/Dashboard';
import Login from './page/Login';
import Signup from './page/Signup';
import ActiveUser from './page/ActiveUser';
import PrivateRoutes from './middleware/PrivateRoute';
import PublicRoutes from './middleware/PublicRoute';

function App() {

  const location = useLocation()

  return (
    <div className='flex overflow-hidden'>
      {
        location.pathname == "/login" || location.pathname == "/signup" ? null : <Sidebar />
      }
      <div className='flex flex-col w-full'>
        {
          location.pathname == "/login" || location.pathname == "/signup" ? null : <Header />
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
  )

}

export default App
