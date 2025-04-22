import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FILE_NAME, showMessage } from "./message";
import { ToastContainer } from "react-toastify";

const Logout = () => {
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies(FILE_NAME);

    useEffect(() => {
        // Remove the cookie
        removeCookie('userid');
        // Debugging: Log before navigation
        console.log("Redirecting to home page...");
        // Redirect after 1 second
        showMessage("Logout Successfully");
       setTimeout(() =>{
        navigate('/');
       })
    }, [navigate, removeCookie]);
    return <>
    <ToastContainer />
    </>;
};

export default Logout;