
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
}