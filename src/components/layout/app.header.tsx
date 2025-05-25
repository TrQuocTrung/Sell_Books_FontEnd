import { useCurrentApp } from "components/context/app.context";

const Appheader = () => {
    const { user } = useCurrentApp()
    return (
        <>
            App Header{JSON.stringify(user)}
        </>
    )
}
export default Appheader;