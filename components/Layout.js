import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "./Navbar";

const Layout = ({children}) => {
    

    const {authIsReady} = useAuthContext()


    return(
        authIsReady && (
        <>
            <Navbar></Navbar>
            {children}
        </>)
    )
     
}
 
export default Layout;