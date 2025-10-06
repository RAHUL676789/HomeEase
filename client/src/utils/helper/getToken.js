


export const getToken = ()=>{
    const cookies = document.cookie.split("; ");
    for(let cookie of cookies){
        const [key,value] = cookie.split("=");
        if(key === "token"){
            return value;
        }

    }

    return null;
}