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
    //InterFace User
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
    interface IRole {
        _id: string;
        name: string;
    }

    interface IUserForm {
        _id: string;
        email: string;
        username: string;
        role: string
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
    //Interface Category
    interface ICategory {
        _id: string;
        name: string;
    }

    interface ICategoryResponse {
        statusCode: number;
        message: string;
        data: {
            results: ICategory[];
        };
    }
    //Interface Book
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
        createdBy: IUser;
        isDeleted: boolean;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }
    interface IBookForm {
        name: string;
        author: string;
        fileUpload: string;
        description: string;
        price: number;
        stock: number;
        soldQuantity: number;
        categories: string[];
    }
    interface IBookResponse {
        statusCode: number;
        message: string;
        data: {
            name: string;
            author: string;
            image: string;
            price: number;
            stock: number;
            soldQuantity: number;
            description: string;
            categories: string[];
            _id: string;
            createdAt: string;
            updatedAt: string;
            createdBy: {
                _id: string;
                email: string;
            };
        };
    }
    //Interface Order
    interface IOrderItem {
        _id: string;
        book: IBook | null; // Vì API trả null trường hợp sách bị xóa
        quantity: number;
    }

    interface IOrder {
        _id: string;
        user: IUser; // API trả user là id chuỗi, hoặc thay bằng object nếu có info user
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
    interface UpdateOrderItemsDto {
        items: {
            book: string;
            quantity: number;
        }[];
    }
    interface UpdateOrderStatusDto {
        status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'complete';
    }

    //Interface Review
    interface IReview {
        _id: string;
        rating: number;
        comment: string;
        createdAt: string;
        updatedAt: string;
        book: IBook;
        createdBy: IUser;
        updatedBy: string | IUser;
    }
    interface IUpdateReviewPayload {
        rating: number
        comment: string
    }
    interface IUserTable {
        _id: string,
        username: string,
        email: string,
        role: string,
        profile: {
            fullname: string,
            address: string
            gender: string,
            phone: string,
            age: number
        },
        isDeleted: boolean,
        createdAt: Date,
        updatedAt: Date
    }
}
