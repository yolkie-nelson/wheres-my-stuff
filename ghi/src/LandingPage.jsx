import { useGetEquipmentQuery } from "./app/apiSlice"

const LandingPage = () => {
    const { data: equipment } = useGetEquipmentQuery()
    console.log(useGetEquipmentQuery())
    return(
        "hi"
    )
}

export default LandingPage