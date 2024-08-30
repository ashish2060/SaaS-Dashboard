import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"
import { lineChartData } from "../LineData"
import { useState } from "react"
import { FiUsers } from "react-icons/fi";
import { TbShoppingBagHeart } from "react-icons/tb";
import { HiCurrencyRupee } from "react-icons/hi2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
const Dashboard = () => {
    const widgets = [
        {
            name: "Purchased",
            logo: <TbShoppingBagHeart size={25} style={{ color: "blue" }} />,
            count: 5000
        },
        {
            name: "Total Customer",
            logo: <FiUsers size={25} />,
            count: 500
        },
        {
            name: "Total Expense",
            logo: <HiCurrencyRupee size={25} />,
            count: 100000
        }
    ]

    const [year, setYear] = useState("2024")
    return (
        <div className="bg-[#29284D] min-h-screen">
            <div className="w-[90%] mx-auto">
                <div className="w-full flex flex-col sm:flex-row gap-4 my-4 text-white">
                    {
                        widgets.map((widget, index) => {
                            return (
                                <div key={index} className="w-full flex justify-between items-center sm:w-[25%] bg-[#1E1E39] p-3 rounded-sm">
                                    <div className="flex flex-col"><div>{widget.name}</div><div><b>{widget.count}</b></div></div>
                                    <div className="">{widget.logo}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="bg-[#1E1E39]">
                    <div className="flex justify-center items-center gap-4 p-4">
                        <h1 className="text-2xl text-white">Total Active Users in the Year</h1>
                        {/* options */}

                        <select className="form-select w-fit" aria-label="Default select example" onChange={(e) => setYear(e.target.value)}  >
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                        </select>
                    </div>-
                    <div className="h-full max-h-[430px]">
                        <Line data={lineChartData?.[year.charAt(year.length - 1)]} />-
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard   