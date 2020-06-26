import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "hover.css";

export default createGlobalStyle`
    ${reset};
    *{
        box-sizing: border-box;
    }
    html, body{
        font-size: 16px;
        font-family: Arial, Helvetica, sans-serif;
    }
    html{
        background-color: #fedc2e;
    }
    a{
        text-decoration: none;
    }
    input:focus{
        outline: none;
    }
`;
