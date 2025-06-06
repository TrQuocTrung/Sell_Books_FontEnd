
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
export const logoutApi = () => {
    const urlBackend = `api/v1/auth/logout`
    return axios.post<IBackendRes<null>>(urlBackend)
}
//User
export const getUserApi = () => {
    const urlBackend = "/api/v1/auth/account"
    return axios.get<IBackendRes<IFetchAccount>>(urlBackend)
}
export const getAlluserPagesinate = (query: string) => {
    const urlBackend = `/api/v1/users/?${query}`
    return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBackend)
}

export const updateUserApi = (id: string, updateUserDto: any) => {
    const urlBackend = `/api/v1/users/${id}`;
    return axios.patch<IBackendRes<any>>(urlBackend, updateUserDto);
};
export const createUser = (data: IUserForm) => {
    const urlBackend = `/api/v1/users`;
    return axios.post<IBackendRes<IUserForm>>(urlBackend, data);
}
export const deleteUserApi = (id: string) => {
    const urlBackend = `/api/v1/users/${id}`
    return axios.delete<IBackendRes<IUserForm>>(urlBackend);
}
//Categories
export const getAllCategories = () => {
    const urlBackend = "/api/v1/category";
    return axios.get<IBackendRes<IModelPaginate<ICategory>>>(urlBackend)
}
//Books
const urlbackendBook = '/api/v1/books'
export const getAllBooks = (query: string | null) => {
    const urlquery = `/api/v1/books?${query}`
    return axios.get<IBackendRes<IModelPaginate<IBook>>>(urlquery)
};
export const createBookApi = (data: FormData) => {
    return axios.post(urlbackendBook, data, {
        headers: {
            folder_type: 'books',
        },
    });
};
export const updateBookApi = (id: string, data: any) => {
    const urlBackend = `/api/v1/books/${id}`;
    return axios.patch(urlBackend, data, {
        headers: {

            folder_type: 'books',
        },
    });
};
export const deleteBookApi = (id: string) => {
    const urlBackend = `/api/v1/books/${id}`;
    return axios.delete(urlBackend)
}
//review
export const getReviewById = (id: string) => {
    const urlBackend = `/api/v1/review/book/${id}`;
    return axios.get<IBackendRes<IReview[]>>(urlBackend);
};
export const getBookById = (id: string) => {
    const urlBackend = `/api/v1/books/${id}`;
    return axios.get<IBackendRes<IBook>>(urlBackend)
}
export const getAllReview = (query: string | null) => {
    const urlQuery = `/api/v1/review${query ? `?${query}` : ''}`;
    return axios.get<IBackendRes<IModelPaginate<IReview>>>(urlQuery);
};
export const updateReviewApi = (id: string, data: IUpdateReviewPayload) => {
    const urlQuery = `/api/v1/review/${id}`;
    return axios.patch<IBackendRes<IReview>>(urlQuery, data)
}
export const deleteReviewApi = (id: string) => {
    const urlQuery = `/api/v1/review/${id}`;
    return axios.delete<IBackendRes<IReview>>(urlQuery)
}
//Order
export const createOrder = (data: ICreateOrderPayload) => {
    const urlBackend = `/api/v1/order`;
    return axios.post<IBackendRes<IOrder>>(urlBackend, data);
};
export const getMyOrders = () => {
    return axios.get<IBackendRes<IOrder[]>>('/api/v1/order/my-orders');
};
export const getallOrderApi = (query: string) => {
    const urlBackend = `/api/v1/order/?${query}`;
    return axios.get<IBackendRes<IModelPaginate<IOrder>>>(urlBackend);
}
export const updateOrderApi = (id: string, data: UpdateOrderItemsDto) => {
    const urlBackend = `/api/v1/order/${id}/items`;
    return axios.patch<IBackendRes<IOrder>>(urlBackend, data);
}

export const updateOrderStatusApi = (id: string, data: UpdateOrderStatusDto) => {
    const urlBackend = `/api/v1/order/${id}/status`;
    return axios.patch<IBackendRes<IOrder>>(urlBackend, data);
}
export const deleteOrderApi = (id: string) => {
    const urlBackend = `/api/v1/order/${id}`;
    return axios.patch<IBackendRes<IOrder>>(urlBackend);

}
//Role
export const getallRole = () => {
    const urlBackend = `/api/v1/role`;
    return axios.get<IModelPaginate<IRole>>(urlBackend);
}