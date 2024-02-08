import { useGetContractQuery, useGetEquipmentQuery, useGetEquipmentTypeQuery, useGetJobSiteQuery, useGetOneJobsiteQuery } from "./app/apiSlice"
import { useState, useEffect } from "react"
import JobSiteMap from './JobSiteMap'
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
import { current } from "@reduxjs/toolkit";

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
    const { data: equipment, isLoading: equipmentLoading } = useGetEquipmentQuery()
    const { data: contracts, isLoading: contractsLoading} = useGetContractQuery()
    const { data: equipmentTypes, isLoading: equipmentTypesLoading } = useGetEquipmentTypeQuery()
    const { data: jobsites, isLoading: jobsitesLoading } = useGetJobSiteQuery()


    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [selectedEquipmentType, setSelectedEquipmentType] = useState(null)
    const handleEquipmentTypeChange = (event) => {
        setSelectedEquipmentType(event.target.value);
    };
    if (equipmentLoading || contractsLoading || equipmentTypesLoading || jobsitesLoading) {
        return (
            <div className="App">
                <header className="App-header">
                    <p>Loading...</p>
                </header>
            </div>
        )
    }
    const graphTitle = () => {
        if (selectedEquipmentType) {
            const selectedType = equipmentTypes.filter(type => type["id"] == selectedEquipmentType);
            return selectedType[0]["name"]
        }
        else {
            return "Total";
        }
    }
    const contractData = () => {
        const contractDict = {}
        let rentedItems = 0
        let totalItems = 0
        contracts?.map(contract => {
            if (contract["start_date"] <= getTodayDate() && contract["end_date"] >= getTodayDate()) {
                if (selectedEquipmentType) {
                    const selectedEquipment = equipment?.filter(equipment => {
                        if (equipment["equipment_type_id"] == parseInt(selectedEquipmentType)) {
                            return equipment
                        }
                    })
                    const extractIdDictionary = (arrayOfDictionaries) => {
                        return arrayOfDictionaries?.reduce((acc, dict) => {
                            acc[dict?.id] = "id";
                            return acc;
                        }, {});
                    }
                    if (contract["equipment_id"] in extractIdDictionary(selectedEquipment)) {
                        // console.log(contract)
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
                    const selectedType = equipment?.filter(equipment => equipment["equipment_type_id"] == selectedEquipmentType);
                    totalItems = selectedType?.length
                }
                else {
                    rentedItems++
                    totalItems = equipment?.length
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
        let rented = ((rentedItems / totalItems) * 100).toFixed(1);
        if (rented == "NaN"){
            rented = (0).toFixed(1)
        }
        return [contractDict, rented, rentedItems, totalItems]
    }
    const contractBarGraph = (contract) => {
        return (200 * (contract/Object.keys(contractData()[0]).length)).toFixed(1)
    }
    const graphStroke = () => {
        if (contractData()[1] == {}) {
            return 0
        }
        else{
            return 687 - (687 * contractData()[1]) / 100
        }
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
        let pastContracts = null
        if (selectedEquipmentType) {
            const selectedEquipment = equipment?.filter(equipment => {
                if (equipment["equipment_type_id"] == parseInt(selectedEquipmentType)) {
                    return equipment
                }
            })
            const extractIdDictionary = (arrayOfDictionaries) => {
                return arrayOfDictionaries.reduce((acc, dict) => {
                    acc[dict.id] = "id";
                    return acc;
                }, {});
            }
            const selectedContracts = contracts?.filter(contract => {
                if (contract["equipment_id"] in extractIdDictionary(selectedEquipment)) {
                    return contract
                }
            })
            pastContracts = selectedContracts?.filter(contract => {
                if (contract["start_date"] <= getTodayDate()) {
                    return contract
                }
            })
        }
        else {
            pastContracts = contracts?.filter(contract => {
                if (contract["start_date"] <= getTodayDate()) {
                    return contract
                }
            })
        }
        const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        const frequency = {}
        months?.map(month => {
            const currentMonth = getTodayDate()?.slice(5,7)
            if (month <= currentMonth){
                frequency[month] = 0
            }
        })
        console.log(contracts)
        pastContracts?.map(pastContract => {
            const month = pastContract["start_date"].slice(5,7)
            frequency[month]++
        })
        return Object.values(frequency)
    }











    return(
        <section className=" flex flex-col">
            <div className="font-bold pl-5 py-5 text-3xl">Dashboard</div>
            <div className="flex">
            <div className="ml-5">
                <div className="pr-5">
                    <select className="mb-4 py-4 px-5 w-full align-middle rounded-full text-xl" onChange={handleEquipmentTypeChange}>
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
                <div className="bg-white mr-5 h-[17rem] pt-4 px-5 rounded-xl mb-5 shadow-lg">
                    <JobSiteMap
                        className="google-map"
                        jobSites={jobsites?.map((jobSite) => ({
                            id: jobSite.id,
                            formatted_address: jobSite.job_address,
                        }))}
                    />
                </div>
                <div className="line-graph bg-white mr-5 py-7 px-4 rounded-xl shadow-lg">
                    <Line
                        data={{
                            labels: months,
                            datasets: [
                                {
                                data: equipmentFrequency(),
                                borderColor: '#00868F',
                                backgroundColor: '#00868F',
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
                                legend: {
                                display: false,
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
                    <div className="text-2xl font-semibold pb-5">{graphTitle()} Inventory</div>
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
                    <div className="bg-slate-100 text-lg text-center font-semibold py-3 mx-5 rounded-md">
                        {contractData()[2]} out of {contractData()[3]}
                        <div className="text-xs font-normal">Items Currently Rented</div>
                    </div>
                </div>
                <div className="contract-chart bg-white mt-5 px-5 pt-4 pb-10 rounded-xl max-w-sm shadow-lg font-semibold">
                    <div className="pb-4 text-2xl">Active Contracts</div>
                        <div>
                            {Object.keys(contractData()[0]).length > 0 ? (
                            // Render the JSX if the dictionary is not empty
                            <div>
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
                            ) : (
                            // Render something else if the dictionary is empty
                            <div className="bg-slate-100 text-lg text-center font-semibold py-3 mx-5 text-slate-400 rounded-md">No data available</div>
                            )}
                        </div>
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
            </div>


        </section>

    )
}

export default LandingPage
