import { displayHome } from "../home/displayHome.js";
import { failureToast } from "../notif/failureToast.js";
import { succedToast } from "../notif/succedToast.js";

export function LoginForm() {
    const container = document.querySelector('.container')
    container.style.cssText =/*style*/`
        display:flex;
        justify-content:center;
        align-items:center;
    `
   
    container.innerHTML =/*html*/`
        <form id="login-form">
            <img src="/images/logo.png">
            <p>Welcome, <span>Back!</span></p>
            <div>
                <label for="login">Login: </label>
                <input type="text" name="login" required placeholder="Type your username or email...">
            </div>
           <div>
                <label for="password">Password: </label>
                <input type="password" name="password" placeholder="Type your password..." required>
           </div>
            <button>Submit</button>
        </form>
    `
    const form = document.getElementById('login-form');
    form.addEventListener('submit', LoginHandler);
}

async function LoginHandler(e) {
    e.preventDefault()
    let login = e.target.login.value
    let password = e.target.password.value
    try {
        let resp = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
            method: "POST",
            headers: {
                "Authorization": `Basic ${btoa(`${login}:${password}`)}`,
                "Content-Type": "application/json"
            }
        })
        let token = await resp.json()
        if (!resp.ok) {
            failureToast(token.error)
        } else {
            localStorage.setItem('token', token)
            succedToast("welcome...")
            displayHome()
        }
    } catch (err) {
        console.log(err);

    }

}