import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showError, FILE_NAME } from "./message";
import {useCookies} from 'react-cookie';

const WithHook = (MyComponent) => {
  // Define a new functional component inside the HOC
  const WrappedComponent = (props) => {
    const params = useParams();
    const navigate = useNavigate();
   const [cookies,setCookie,removeCookie] = useCookies(FILE_NAME);

    // Pass the hooks as props to the wrapped component
    return (
      <MyComponent
        {...props}
        params={params}
        navigate={navigate}
        cookies ={cookies}
        setCookie = {setCookie}
        removeCookie = {removeCookie}
      />
    );
  };

  // Return the new component
  return WrappedComponent;
};

export default WithHook;