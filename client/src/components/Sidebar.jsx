import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../utils/getUserDetails";
const Sidebar = () => {
    const [avatar, setAvatar] = useState()
    const location = useLocation()
    const navigate = useNavigate();
    const sidebarItems = [
        {
            name: "Dashboard",
            id: "1",
            link: "/"
        },
        {
            name: "Analytics",
            id: "2",
            link: "/analytics"
        },
        {
            name: "Settings",
            id: "3",
            link: "/settings"
        },

    ]

    async function logoutHandler() {
        const response = await fetch(`${import.meta.env.VITE_ORIGIN}/api/user/logoutuser`)
        const data = await response.json()

        if (data.success) {
            toast.success("Logout Successfull")
            localStorage.removeItem("accessToken")
            navigate('/login')
        } else {
            toast.error(data.message)
        }
    }

    useEffect(() => {
        fetchUserDetails().then((res) => setAvatar(res?.avatar?.url))
    }, [])
    return (
        <div className="hidden md:flex flex-column min-h-screen p-3 text-white bg-[#1E1E39]" style={{ width: "20%" }}>
            <Link to={'/'} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
                <span className="fs-4">SaaS UI</span>
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto mt-2">
                {
                    sidebarItems.map(item => {
                        return (
                            <li className="nav-item" key={item.id}>
                                <Link to={item.link} className={`nav-link ${location.pathname == item.link ? "active" : ""} text-white`} aria-current="page">
                                    <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={`${avatar ? avatar : "https://github.com/mdo.png"}`} alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>you</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><Link className="dropdown-item" to={'/'}>Dashboard</Link></li>
                    <li><Link className="dropdown-item" to={'/settings'}>Settings</Link></li>
                    <li><Link className="dropdown-item" to={'/settings'}>Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" onClick={logoutHandler}>Sign out</a></li>
                </ul>
            </div>
        </div>

    )
}

export default Sidebar