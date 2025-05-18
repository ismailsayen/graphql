import { SetUrl } from "../utils/SetUrl.js";
import { LoginForm } from "./auth/loginForm.js";
import { displayHome } from "./home/displayHome.js";


let verifyToken = localStorage.getItem("token")
SetUrl("/")
if (verifyToken) {
    
    displayHome()
} else {
    LoginForm()
}

