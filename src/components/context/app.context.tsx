import { getUserApi } from "@/service/api";
import { createContext, useContext, useEffect, useState } from "react";
import { RingLoader } from "react-spinners";

interface IAppContext {
    isAuthenticated: boolean;
    isApploading: boolean;
    user: IUser | null;
    setIsAuthenticated: (v: boolean) => void;
    setisApploading: (v: boolean) => void;
    setUser: (user: IUser | null) => void;
}

const CurrentAppContext = createContext<IAppContext | null>(null);
type TProps = {
    children: React.ReactNode;
}
export const AppProvider = (props: TProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [isApploading, setisApploading] = useState<boolean>(true);
    useEffect(() => {
        const fetchAccount = async () => {
            const res = await getUserApi()
            if (res.data) {
                setUser(res.data.user)
                setIsAuthenticated(true)
            }
            setisApploading(false)
        }
        fetchAccount()
    }, [])

    return (
        <>
            {isApploading === false ?
                <CurrentAppContext.Provider value=
                    {{
                        isAuthenticated,
                        user,
                        isApploading,
                        setIsAuthenticated,
                        setUser,
                        setisApploading
                    }}>
                    {props.children}
                </CurrentAppContext.Provider>
                :
                <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <RingLoader
                        size={80}
                        color="#36d7b7"
                    />
                </div>
            }
        </>

    );
};
export const useCurrentApp = () => {
    const currentAppContext = useContext(CurrentAppContext);

    if (!currentAppContext) {
        throw new Error(
            "useCurrentApp has to be used within <CurrentUserContext.Provider>"
        );
    }

    return currentAppContext;
};