const baseUrl = import.meta.env.VITE_API_URL;


export default async function pinApi(pincode) {
    try {

        const pinData = await fetch(`${baseUrl}${pincode}`);

        const result = await pinData.json();
        console.log();
        return {
            country: result[0].PostOffice[0].Country,
            district: result[0].PostOffice[0].District,
            state:result[0].PostOffice[0].State
        };

    } catch (error) {
        console.log(error)
    }
}