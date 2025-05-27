
export { }
declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: String;
        statusCode: number | String;
        data?: T;
    }
    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        results: T[];
    }
    interface ILogin {
        access_token: string;
        email: string;
        paswword: string;
        user: {
            email: string;
            username: string;
            role: {
                _id: string;
                name: string;
            }
        }
    }
    interface IRegister {
        username: string,
        email: string,
        password: string,
        profile: {
            fullname: string,
            address: string,
            gender: string,
            age: number,
            phone: number,
        }
    }
    interface IUser {
        email: string;
        username: string;
        role: {
            _id: string;
            name: string;

        }
    }
    interface IFectchAccount {
        user: IUser;
    }
    interface ICategory {
        _id: string,
        name: string
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
                current: number,
                pageSize: number,
                pages: number,
                total: number
            };
            result: IBook[];
        }


    }
}