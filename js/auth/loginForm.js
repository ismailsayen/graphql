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
            <p>hello</p>
            <div>
                <label for="login">email or username: </label>
                <input type="text" name="login" >
            </div>
           <div>
                <label for="password">Password: </label>
                <input type="password" name="password">
           </div>
            <button>Submit: </button>
        </form>
    `
}