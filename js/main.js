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


// addEventListener('mousemove', function MoveCircle(e) {
//     const circle = document.querySelector(".circle")
//     circle.style.display = 'flex'
//     let r = circle.getBoundingClientRect().width / 2
//     if (e.clientX + r < innerWidth) {
//         circle.style.left = `${e.clientX}px`

//     }
//     if (e.clientY + r < innerHeight) {
//         circle.style.top = `${e.clientY}px`
//     }
// })