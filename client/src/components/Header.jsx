import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { fetchUserDetails } from "../utils/getUserDetails"
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
    const [user, setUser] = useState(null)
    const [openSidebar, setOpenSidebar] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetchUserDetails().then((res) => setUser(res))
    }, [])

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
            name: "Profile",
            id: "3",
            link: "/settings"
        },

    ]

    return (
        <div>
            <div className="w-full flex bg-[#222143] justify-between items-center px-6">
                < h1 className="text-white text-2xl" > Hello {user?.name}</h1 >

                <div className="flex items-center">

                    <div className="hidden md:block mt-3 dropdown text-end">
                        <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle text-white" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={`${user?.avatar?.url ? user?.avatar?.url : "https://github.com/mdo.png"}`} alt="img" className="w-10 h-10 rounded-full" />
                        </a>
                        <ul className="dropdown-menu text-small">
                            <li><Link className="dropdown-item" to={"/settings"}>Settings</Link></li>
                            <li><Link className="dropdown-item" to={"/settings"}>Profile</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a href="#" className="dropdown-item" onClick={logoutHandler}>Sign out</a></li>
                        </ul>
                    </div>
                </div>

                {/* for small screen */}
                <div className="block md:hidden text-white p-2">
                    <div className="bg-[#1b1a37] w-fit h-fit rounded-full p-3" onClick={() => { setOpenSidebar((prev) => !prev) }}>
                        <GiHamburgerMenu size={25} />
                    </div>

                </div>

            </div>


            {
                openSidebar && <div className="w-screen relative h-screen z-10">
                    <div className="absolute right-0 h-full w-full bg-[unset]" >
                        <div className="float-left text-gray-100 h-full bg-[#292846] opacity-20 text-2xl flex justify-center mx-auto w-[40%] text-center" onClick={() => setOpenSidebar((prev) => !prev)}>Click here to close sidebar</div>
                        <div className="w-[60%] h-full bg-[#292846] flex flex-col items-center float-right" >
                            <ul className="nav nav-pills flex-column gap-2 h-fit">
                                {
                                    sidebarItems.map(item => {
                                        return (
                                            <li className="nav-item text-xl rounded-md text-center" key={item.id} >
                                                <Link to={item.link} className={`nav-link text-white`} aria-current="page" onClick={() => setOpenSidebar((prev) => !prev)}>
                                                    <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                                                    {item.name}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="flex mt-3 dropdown text-end ">
                                <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle text-white" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={`${user?.avatar?.url ? user?.avatar?.url : "https://github.com/mdo.png"}`} alt="img" className="w-10 h-10 rounded-full" />
                                </a>
                                <ul className="dropdown-menu text-small">
                                    <li><Link className="dropdown-item" to={"/settings"} onClick={() => setOpenSidebar((prev) => !prev)}>Settings</Link></li>
                                    <li><Link className="dropdown-item" to={"/settings"} onClick={() => setOpenSidebar((prev) => !prev)}>Profile</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a href="" className="dropdown-item" onClick={logoutHandler}>Sign out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default Header


