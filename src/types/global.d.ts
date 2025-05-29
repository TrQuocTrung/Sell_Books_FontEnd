export { }

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        results: T[];
    }

    interface ILogin {
        access_token: string;
        email: string;
        password: string;
        user: {
            email: string;
            username: string;
            role: {
                _id: string;
                name: string;
            };
        };
    }

    interface IRegister {
        username: string;
        email: string;
        password: string;
        profile: {
            fullname: string;
            address: string;
            gender: string;
            age: number;
            phone: number;
        };
    }

    interface IUser {
        _id: string;
        email: string;
        username: string;
        role: {
            _id: string;
            name: string;
        };
        profile?: {
            fullname?: string;
            address?: string;
            gender?: string;
            phone?: number;
            age?: number;
        };
    }

    interface IFetchAccount {
        user: IUser;
    }

    interface ICategory {
        _id: string;
        name: string;
    }

    interface ICategoryResponse {
        statusCode: number;
        message: string;
        data: {
            result: ICategory[];
        };
    }

    interface IBook {
        _id: string;
        name: string;
        author: string;
        image: string;
        description: string;
        price: number;
        stock: number;
        soldQuantity: number;
        categories: ICategory[];
    }

    interface IBookResponse {
        statusCode: number;
        message: string;
        data: {
            meta: {
                current: number;
                pageSize: number;
                pages: number;
                total: number;
            };
            result: IBook[];
        };
    }

    interface IOrderItem {
        _id: string;
        book: IBook | null; // Vì API trả null trường hợp sách bị xóa
        quantity: number;
    }

    interface IOrder {
        _id: string;
        user: string; // API trả user là id chuỗi, hoặc thay bằng object nếu có info user
        items: IOrderItem[];
        totalAmount: number;
        status: string;
        createdBy: string;
        isDeleted: boolean;
        deletedAt: string | null;
        createdAt: string;
        updatedAt: string;
    }

    interface ICreateOrderPayload {
        items: {
            book: string;
            quantity: number;
        }[];
    }
}
