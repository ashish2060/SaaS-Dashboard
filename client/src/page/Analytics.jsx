import { useEffect, useState } from "react"

const Analytics = () => {

    const [users, setUsers] = useState(null)
    const fetchAllUsersDetails = async () => {
        const response = await fetch(`${import.meta.env.VITE_ORIGIN}/user/getallusersdetails`)

        const data = await response.json()

        if (data.success) {
            setUsers(data?.users)
        } else {
            alert("some error occured")
        }
    }

    useEffect(() => {
        fetchAllUsersDetails()
    }, [])
    return (
        <div className="w-full m-2">
            <section className="intro" >
                <div className="bg-image h-100" >
                    <div className="mask d-flex align-items-center h-100">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body p-0">
                                            <div className="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style={{ position: "relative" }}>
                                                <table className="table table-striped mb-0">
                                                    <thead style={{ backgroundColor: "#393939" }}>
                                                        <tr className="text-uppercase text-success">
                                                            <th scope="col">UserId</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Gender</th>
                                                            <th scope="col">Age</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            users?.map((user, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{user?._id}</td>
                                                                        <td>{user?.name}</td>
                                                                        <td>{user?.email}</td>
                                                                        <td>{user?.gender}</td>
                                                                        <td>{user?.age}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </div >
    )
}

export default Analytics