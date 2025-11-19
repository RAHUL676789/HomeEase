const baseUrl = import.meta.env.VITE_API_URL;


export default async function pinApi(pincode) {
        const pinData = await fetch(`${baseUrl}${pincode}`);

        const result = await pinData.json();
        console.log(result)
        if(!result[0].PostOffice){
         return result[0];
        }
        return {
            country: result[0].PostOffice[0].Country,
            district: result[0].PostOffice[0].District,
            state:result[0].PostOffice[0].State
        };
}