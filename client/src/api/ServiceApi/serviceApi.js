import axionInstance from "../../utils/axios/axiosinstance";


export const serviceQueryApi = async (query) => {
    console.log(query)
    return axionInstance.get(`api/services?${query}`)
}


export const createServiceApi = async (body) => {
    return axionInstance.post(`/api/services`, body)
}

export const updateServiceApi = async (serviceId, body) => {
    return axionInstance.put(`/api/services/${serviceId}`, body);
}

export const deleteImagesApi = async (serviceId, image, galleryId) => {
    return axionInstance.delete(`/api/services/${serviceId}/gallery/${galleryId}`, { data: { image } })
}

export const deleteServiceApi = async(serviceId)=>{
    return axionInstance.delete(`/api/service/${serviceId}`)
}