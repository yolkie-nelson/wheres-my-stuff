import { useGetEquipmentQuery } from "./app/apiSlice"

const LandingPage = () => {
    const { data: equipment } = useGetEquipmentQuery()
    return(
        "hi"
    )
}

export default LandingPage
