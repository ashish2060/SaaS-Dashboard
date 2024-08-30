import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { UserContext } from "../context/userContext"

const Profile = () => {
    const [avatar, setAvatar] = useState(null)
    const [formInput, setFormInput] = useState({ name: "", age: "", gender: "", oldPassword: "", newPassword: "" })
    const [loading, setLoading] = useState(false)
    const { fetchUserDetails } = useContext(UserContext)

    function changeHandler(e) {
        setFormInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    async function submitHandler(e) {
        e.preventDefault();
        if (!avatar && !formInput.name && !formInput.age && !formInput.gender && !formInput.oldPassword && !formInput.newPassword) {
            return toast.error("Can't update empty field")
        }
        setLoading(true)
        const formData = new FormData()
        formData.append("avatar", avatar)
        formData.append("name", formInput.name)
        formData.append("age", formInput.age)
        formData.append("gender", formInput.gender)
        formData.append("oldPassword", formInput.oldPassword)
        formData.append("newPassword", formInput.newPassword)
        const response = await fetch(`${import.meta.env.VITE_ORIGIN}/api/user/updateuser`, {
            method: "post",
            headers: { accesstoken: localStorage.getItem("accessToken") },
            body: formData,
        })
        const data = await response.json()
        if (data.success) {
            toast.success("Updation successfull")
            console.log(formInput)
            setFormInput({ name: "", age: "", gender: "", oldPassword: "", newPassword: "" })
            setAvatar(null)
            fetchUserDetails()
        }
        else {
            toast.error(data.message)
        }
        setLoading(false)
    }
    return (

        <div>
            <section className="py-10 my-auto dark:bg-gray-900">
                <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                    <div
                        className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                        <div className="">
                            <h1
                                className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                                Profile
                            </h1>

                            <h2 className="text-grey text-sm mb-4 dark:text-gray-400">Create Profile</h2>
                            <h1 className="text-red-500 text-lg m-2 lg:text-3xl md:text-2xl sm:text-xl xs:text-xl">Change only the field you required*</h1>
                            <form onSubmit={submitHandler}>
                                <div
                                    className="w-full rounded-sm bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat items-center">
                                    <div
                                        className={`mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080")] bg-cover bg-center bg-no-repeat`}>

                                        <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">

                                            <input type="file" name="profile" id="upload_profile" hidden onChange={(e) => setAvatar(e.target.files[0])} />

                                            <label htmlFor="upload_profile" className="cursor-pointer">
                                                <svg data-slot="icon" className="w-6 h-5 text-blue-700" fill="none"
                                                    strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                                    </path>
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                                    </path>
                                                </svg>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <h2 className="text-center mt-1 text-lg font-semibold dark:text-gray-300">{avatar ? "Uploaded" : "Upload Profile and Cover Image"}
                                </h2>
                                <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col xs:flex-col gap-2 justify-center items-center w-full">
                                    <div className="w-full  mb-4 lg:mt-6">
                                        <label htmlFor="" className="mb-2 dark:text-gray-300">Name</label>
                                        <input type="text"
                                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            placeholder="Name" name="name" value={formInput.name} onChange={changeHandler} />
                                    </div>
                                    <div className="w-full  mb-4 lg:mt-6">
                                        <label htmlFor="" className=" dark:text-gray-300">Age</label>
                                        <input type="Number"
                                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            placeholder="Age" name="age" value={formInput.age} onChange={changeHandler} />
                                    </div>
                                    <div className="w-full  mb-4 lg:mt-6">
                                        <label htmlFor="" className=" dark:text-gray-300">Old Password</label>
                                        <input type="text"
                                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            placeholder="Old Password" name="oldPassword" value={formInput.oldPassword} onChange={changeHandler} />
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col xs:flex-col gap-2 justify-center w-full items-center">
                                    <div className="w-full">
                                        <h3 className="dark:text-gray-300 mb-2">Gender</h3>
                                        <select
                                            className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" name="gender" onChange={changeHandler}>
                                            <option disabled value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>

                                    <div className="w-full">
                                        <label htmlFor="newPassword" className=" dark:text-gray-300">New Password</label>
                                        <input type="text"
                                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            id="newPassword"
                                            placeholder="New Password" name="newPassword" value={formInput.newPassword} onChange={changeHandler} />
                                    </div>
                                </div>
                                <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                                    <button type="submit" className="w-full p-4">{loading ? "Loading..." : "Submit"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Profile