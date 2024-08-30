import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false)

    function changeHandler(e) {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    async function submitHandler(e) {
        e.preventDefault();
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_ORIGIN}/api/user/login`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (data.success) {
            toast.success("Login Successfull")
            setFormData({ email: "", password: "" })
            localStorage.setItem("accessToken", JSON.stringify(data.accessToken))
            navigate("/")
        } else {
            toast.error(data.message)
        }
        setLoading(false)
    }

    return (
        <div className="bg-light py-3 py-md-5">
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
                        <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-5">
                                        <h3>Log in</h3>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={submitHandler}>
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                                        <input type="email" className="form-control" name="email" value={formData.email} id="email" placeholder="name@example.com" required onChange={changeHandler} />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                                        <input type="password" className="form-control" name="password" id="password" value={formData.password}
                                            required onChange={changeHandler} />
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="remember_me" id="remember_me" />
                                            <label className="form-check-label text-secondary" htmlFor="remember_me">
                                                Keep me logged in
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button className="btn btn-lg btn-primary" type="submit">{loading ? "Loading..." : "Log in now"}</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="row">
                                <div className="col-12">
                                    <hr className="mt-5 mb-4 border-secondary-subtle" />
                                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                                        <Link to={"/signup"} className="link-secondary text-decoration-none">Create new account</Link>
                                        <Link to={""} className="link-secondary text-decoration-none">Forgot password</Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login