import axios from './axios.customize'
//Auth
export const loginApi = (username: string, password: string) => {
    const urlBackend = "api/v1/auth/login"
    return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password })
}
export const registerApi = (user: IRegister) => {
    const urlBackend = "api/v1/auth/register"
    return axios.post<IBackendRes<IRegister>>(urlBackend, user)
}
//User
export const getUserApi = () => {
    const urlBackend = "/api/v1/auth/account"
    return axios.get<IBackendRes<IFetchAccount>>(urlBackend)
}
export const logoutApi = () => {
    const urlBackend = "api/v1/auth/logout"
    return axios.post<IBackendRes<null>>(urlBackend)
}
export const updateUserApi = (id: string, updateUserDto: any) => {
    const urlBackend = `/api/v1/users/${id}`;
    return axios.patch<IBackendRes<any>>(urlBackend, updateUserDto);
};
//Categories
export const getAllCategories = () => {
    const urlBackend = "/api/v1/category";
    return axios.get<ICategoryResponse>(urlBackend)
}

//Books
export const getAllBooks = (query: Record<string, any> = {}) => {
    const searchParams = new URLSearchParams(query).toString();
    return axios.get(`/api/v1/books?${searchParams}`);
};
//review
export const getReviewById = (id: string) => {
    const urlBackend = `/api/v1/review/${id}`;
    return axios.get<IBackendRes<IReview>>(urlBackend);
};
export const getBookById = (id: string) => {
    const urlBackend = `/api/v1/books/${id}`;
    return axios.get<IBackendRes<IBook>>(urlBackend)
}
//Order
export const createOrder = (data: ICreateOrderPayload) => {
    const urlBackend = `/api/v1/order`;
    return axios.post<IBackendRes<IOrder>>(urlBackend, data);
};
export const getMyOrders = () => {
    return axios.get<IBackendRes<IOrder[]>>('/api/v1/order/my-orders');
};