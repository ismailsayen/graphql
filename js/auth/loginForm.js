export function LoginForm() {
    const container = document.querySelector('.container')
    container.style.cssText =/*style*/`
        display:flex;
        justify-content:center;
        align-items:center;
    `
    container.innerHTML =/*html*/`
        <form>
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
}