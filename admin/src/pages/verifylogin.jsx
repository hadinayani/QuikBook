import { useEffect } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { showError , FILE_NAME } from "./message";

export default function VerifyLogin() {
    let navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(FILE_NAME);
    useEffect(() => {
        if (cookies['id'] === undefined) {
            showError('login required');
            navigate("/");
        }
    });
}