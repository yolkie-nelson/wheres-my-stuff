import { useGetContractQuery, useGetEquipmentQuery } from "./app/apiSlice"
import { Chart } from "chart.js/auto"
import { Doughnut } from "react-chartjs-2"

import "./static/LandingPage.css"

const LandingPage = () => {
    const { data: equipment } = useGetEquipmentQuery()
    const {data: contract } = useGetContractQuery()
    // function filterItemsByDateRange(contract) {
    //     console.log(contract)
    //     return items.filter(contract => {
    //         const today = new Date()
    //         console.log(contract["start_date"])
    //         const start = new Date(contract.startDate)
    //         const end = new Date(contract.endDate)

    //         return today >= start && today <= end
    //     })
    // }

    // const test = contract.filter(contract => {
    //         const today = new Date()

    //         const start = new Date(contract["start_date"])
    //         const end = new Date(contract["end_date"])
    //         console.log(start)
    //         // return today >= start && today <= end
    //     })
    // const filteredData = filterItemsByDateRange(contract)
    // const endDate = contract[0]["end_date"]
    console.log()
    return(
        <section>

        <div>
            hi
        </div>
        <div className="doughnut-chart-section">
            <div className="doughnut-chart">
                <div className="outer">
                    <div className="inner">

                    </div>
                </div>
            </div>

            <svg width="10rem" height="10rem">
                <circle cx="5rem" cy="4.87rem" r="4.72rem" strokeLinecap="round" />
            </svg>
            {/* <Doughnut
                data={{
                    labels: ["A", "B", "C"],
                    datasets: [
                        {
                            label: "rev",
                            data: [200, 300, 400],
                            borderWidth: 0,
                            cutout: "90%",
                            borderRadius: 4
                        }
                    ]
                }}
            /> */}
        </div>

        </section>

    )
}

export default LandingPage
