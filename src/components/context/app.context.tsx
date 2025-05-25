import { createContext, useContext, useState } from "react";

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


    return (
        <CurrentAppContext.Provider value={{ isAuthenticated, user, isApploading, setIsAuthenticated, setUser, setisApploading }}>
            {props.children}
        </CurrentAppContext.Provider>
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