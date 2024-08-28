import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {
    let token = JSON.parse(localStorage.getItem('accessToken'))

    return (
        token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes;