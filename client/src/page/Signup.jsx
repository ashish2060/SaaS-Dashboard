import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ name: "", email: "", age: "", gender: "Male", password: "" });

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
        const response = await fetch(`${import.meta.env.VITE_ORIGIN}/api/user/registration`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (data.success) {
            toast.success("Otp Send Successfully")
            setFormData({ name: "", email: "", age: "", gender: "Male", password: "" })
            navigate(`/activate-user/${data.activationToken}`)
        } else {
            toast.error(data.message)
        }
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
                                        <h3>Signup</h3>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={submitHandler}>
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="col-12">
                                        <label htmlFor="name" className="form-label">Name <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" name="name" value={formData.name} id="name" required onChange={changeHandler} />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                                        <input type="email" className="form-control" name="email" value={formData.email} id="email" placeholder="name@example.com" required onChange={changeHandler} />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="age" className="form-label">Age <span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" name="age" value={formData.age} id="age" required onChange={changeHandler} />
                                    </div>
                                    <div className="w-fit">
                                        <select className='bg-gray-200 p-2 rounded-md' name="gender" onChange={changeHandler}>
                                            <option >Male</option>
                                            <option>Female</option>
                                        </select>
                                        <span className="text-danger">*</span>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                                        <input type="password" minLength={6} className="form-control" name="password" value={formData.password} id="password" required onChange={changeHandler} />
                                    </div>
                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button className="btn btn-lg btn-primary" type='submit'>Signup now</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="row">
                                <div className="col-12">
                                    <hr className="mt-5 mb-4 border-secondary-subtle" />
                                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                                        <Link to={"/login"} className="link-secondary text-decoration-none">Already have an account</Link>
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

export default Signup