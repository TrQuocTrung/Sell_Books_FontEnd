import axios from './axios.customize'
export const loginApi = (username: string, password: string) => {
    const urlBackend = "api/v1/auth/login"
    return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password })
}
export const registerApi = (user: IRegister) => {
    const urlBackend = "api/v1/auth/register"
    return axios.post<IBackendRes<IRegister>>(urlBackend, user)
}
export const getUserApi = () => {
    const urlBackend = "/api/v1/auth/account"
    return axios.get<IBackendRes<IFectchAccount>>(urlBackend)
}
export const logoutApi = () => {
    const urlBackend = "api/v1/auth/logout"
    return axios.post<IBackendRes<null>>(urlBackend)
}
//Categories
export const getAllCategories = () => {
    const urlBackend = "/api/v1/category";
    return axios.get<ICategoryResponse>(urlBackend)
}

//Books
export const getAllBooks = () => {
    const urlBackend = "/api/v1/books";
    return axios.get<IBookResponse>(urlBackend)
}
export const getBookById = (id: string) => {
    const urlBackend = `/api/v1/books/${id}`;
    return axios.get<IBackendRes<IBook>>(urlBackend)
}