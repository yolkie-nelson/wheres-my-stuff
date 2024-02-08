import { useGetContractQuery, useGetEquipmentQuery, useGetEquipmentTypeQuery, useGetJobSiteQuery, useGetOneJobsiteQuery } from "./app/apiSlice"
import { useState, useEffect } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from 'react-chartjs-2';
import "./static/LandingPage.css"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LandingPage = () => {
    const { data: equipment } = useGetEquipmentQuery()
    const { data: contracts} = useGetContractQuery()
    const { data: equipmentTypes } = useGetEquipmentTypeQuery()
    const { data: jobsites } = useGetJobSiteQuery()
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [unavailable, setUnavailable] = useState(0);
    const [selectedEquipmentType, setSelectedEquipmentType] = useState(null)
    const handleEquipmentTypeChange = (event) => {
        setSelectedEquipmentType(event.target.value);
    };
    const graphTitle = () => {
        if (selectedEquipmentType) {
            const selectedType = equipmentTypes.filter(type => type["id"] == selectedEquipmentType);
            return selectedType[0]["name"]
        }
        else {
            return "Total Inventory";
        }
    }

    const contractData = () => {
        const contractDict = {}
        let rentedItems = 0
        let totalItems = 0
        contracts?.map(contract => {
            if (contract["start_date"] <= getTodayDate() && contract["end_date"] >= getTodayDate()) {
                if (selectedEquipmentType) {
                    if (contract["equipment_id"] == selectedEquipmentType) {
                        rentedItems++
                        const jobId = contract["job_site_id"]
                        const jobName = jobsites?.filter(jobsite => jobsite["id"] == jobId)
                        if (jobName[0]["job_name"] in contractDict){
                            contractDict[jobName[0]["job_name"]]++
                        }
                        else {
                            contractDict[jobName[0]["job_name"]] = 1
                        }
                    }
                    const selectedType = equipment.filter(equipment => equipment["equipment_type_id"] == selectedEquipmentType);
                    totalItems = selectedType.length
                }
                else {
                    rentedItems++
                    totalItems = equipment.length
                    const jobId = contract["job_site_id"]
                    const jobName = jobsites?.filter(jobsite => jobsite["id"] == jobId)
                    if (jobName[0]["job_name"] in contractDict){
                        contractDict[jobName[0]["job_name"]]++
                    }
                    else {
                        contractDict[jobName[0]["job_name"]] = 1
                    }
                }
            }
        })
        const rented = ((rentedItems / totalItems) * 100).toFixed(1);
        return [contractDict, rented]
    }
    const contractBarGraph = (contract) => {
        return (200 * (contract/Object.keys(contractData()[0]).length)).toFixed(1)
    }
    const graphStroke = () => {
        const offset = 687 - (687 * contractData()[1]) / 100;
        return offset
    }
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const getDaysInMonth = (month) => {
        const year = new Date().getFullYear()
        const date = new Date(year, month - 1, 1);
        date.setMonth(date.getMonth() + 1);
        date.setDate(date.getDate() - 1);
        return date.getDate();
    }
    function daysIntoYear(dateString) {
        if (dateString.slice(5) == "01-01") {
            return 1
        }
        const year = new Date(dateString).getFullYear();
        const startDate = new Date(year, 0, 1); // January 1st of the current year
        const currentDate = new Date(dateString);
        const differenceInMilliseconds = currentDate - startDate;
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
        return Math.floor(differenceInDays)+2; // Add 1 to account for the first day of the year
    }
    const ganttBar = () => {
        const dates = {}
        contracts?.map(contract => {
            const jobId = contract["job_site_id"]
            let jobName = ""
            jobsites?.map(jobsite => {
                if (jobsite["id"] == jobId){
                    jobName = jobsite["job_name"]
                }
            })
            if (jobName in dates) {
                dates[jobName].push([contract["start_date"], contract["end_date"]])
            }
            else {
                dates[jobName] = [[contract["start_date"], contract["end_date"]]]
            }

        })
        return dates
    }
    const equipmentFrequency = () => {
        const pastContracts = contracts?.map(contract => {
            if (contract["start_date"] <= getTodayDate()) {
                return contract
            }
        })
        const frequency = {}
        pastContracts?.map(pastContract => {
            const month = pastContract["start_date"].slice(5,7)
            if (month in frequency){
                frequency[month]++
            }
            else {
                frequency[month] = 1
            }
        })
        const keyValueArray = Object.entries(frequency)
        keyValueArray.sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
        const sortedDictionary = Object.fromEntries(keyValueArray)
        // console.log(sortedDictionary)

    }
    equipmentFrequency()







    return(
        <section className="pt-10">


            <div className="ml-5">
                <div>
                    <select onChange={handleEquipmentTypeChange}>
                        <option value="">Total Inventory</option>
                        {equipmentTypes &&
                                equipmentTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                )
                        )}
                    </select>
                </div>
                <div className="line-graph bg-white mr-5 pt-4 pb-10 px-5 rounded-xl shadow-lg">
                    <Line
                        data={{
                            labels: months,
                            datasets: [
                                {
                                label: 'Dataset 1',
                                data: [12, 34, 56, 102, 98, 46],
                                borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                tension: 0.3,
                                pointRadius: 4
                                },
                            ],
                        }}

                        options = {{
                            responsive: true,
                            plugins: {
                                title: {
                                display: true,
                                text: 'Equipment Rental Frequency Trends Over Time',
                                },
                            },
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    },
                                    title: {
                                        display: true,
                                        text: "Months"
                                    }
                                },
                                y: {
                                    grid: {
                                        display: false
                                    },
                                    title: {
                                        display: true,
                                        text: "Number of Equipment Rentals"
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
            <div className="mr-5">
                <div className="doughnut-chart-section bg-white pt-4 pb-10 px-5 max-w-sm rounded-xl shadow-lg">
                    <div className="text-2xl font-semibold pb-5">{graphTitle()}</div>
                    <div>
                        <div className="doughnut-chart pl-8">
                            <div className="outer">
                                <div className="inner">
                                    <div className="number text-3xl font-semibold">{contractData()[1]}%</div>
                                    <div className="text-xs">Rented Inventory</div>
                                </div>
                            </div>
                        </div>
                        <svg className="circle" height="20em">
                            <circle cx="9.5rem" cy="10rem" r="6.9rem" strokeLinecap="round" style={{ strokeDashoffset: graphStroke() }}/>

                        </svg>
                    </div>
                    <div className="bg-slate-100 flex justify-center py-5 rounded-md">{unavailable} Items Rented</div>
                </div>
                <div className="contract-chart bg-white mt-5 px-5 pt-4 pb-10 rounded-xl max-w-sm shadow-lg font-semibold">
                    <div className="pb-4 text-2xl">Current Contracts</div>
                    {Object.entries(contractData()[0]).map((contract, index) => (
                        <div className="flex items-center" key={index}>
                            <div className="text-xs font-normal w-48 pb-2">{contract[0]}</div>
                            <div className="flex">
                                <svg className="h-10 pr-4" width="200">
                                    <rect x="10" y="10" width={contractBarGraph(contract[1])} height="20"/>
                                </svg>
                                {contract[1]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="gantt-chart bg-white pt-4 rounded-xl shadow-lg font-semibold">
                <div className="absolute text-2xl">
                    <div className="pb-4 pl-4">Contracts Gantt Chart</div>
                    <div className="h-8 w-52 bg-white"></div>
                    <div className="bg-teal text-lg w-48 text-white pr-32 pl-2 ml-4 py-2 rounded-md">Contracts</div>
                </div>
                <div className=" pt-12">
                    <div className="flex">
                        <div className="gantt-spacer"></div>
                        <div className="months">
                            {months.map((month, index) => (
                                <div className="month border-r-2" key={index} style={{ width: `${getDaysInMonth(index + 1)*6}px`}} >
                                {month}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="gnatt-svg">
                        {Object.entries(ganttBar()).map(([jobName, dates], index) => (
                            <div className="border-b-2 flex" key={index}>
                                <div className="contract-name flex text-white text-xs font-normal bg-white">
                                    {jobName}
                                    <div className="contract-name2 absolute  bg-white pl-4 text-black">{jobName}</div>
                                </div>
                                <div className="bars">
                                    {dates.map((date, idx) => (
                                        <div className="" key={idx}>
                                            <svg className="h-5">
                                                <rect x={daysIntoYear(date[0])*6} width={(daysIntoYear(date[1])*6) - (daysIntoYear(date[0])*6)} height="15"/>
                                            </svg>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>





        </section>

    )
}

export default LandingPage
