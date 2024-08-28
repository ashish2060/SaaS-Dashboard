import { Navigate, Outlet } from 'react-router-dom'
const PublicRoutes = () => {
    let token = JSON.parse(localStorage.getItem('accessToken'))

    return (
        token ? <Navigate to='/' /> : <Outlet />
    )
}

export default PublicRoutes;