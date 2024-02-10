import axios from "axios"


const exportButton = () => {
    const handleExport = () => {
        axios.get("http//:localhost:8000/export")
            .then(response => {
                const csvData = response.data;
                const rawBinary = Blob([csvData], {type: 'text/csv'});
                const conversionUrl = window.URL.createObjectURL(rawBinary);
                const link = document.createElement('a');
                link.href = conversionUrl
                link.setAttribute('download', 'equipment_panda.csv');
                link.click();
            })
            .catch(error => {
                console.error('Error exporting data:', error);
      });
    }
}
export default exportButton;
