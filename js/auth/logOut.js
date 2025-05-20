import { LoginForm } from "./loginForm.js"

export function LogOut() {
    localStorage.removeItem('token')
    const circle = document.querySelector('.circle')
    circle.style.display = 'none'
    LoginForm()
}