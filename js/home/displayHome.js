import { MoveCircle } from "../../utils/MoveCircle.js"
import { Header } from "./head.js"

export async function displayHome() {
    const link = document.getElementById('css-link')
    if (link) {
        link.href = "/css/home.css"
    }
    const container = document.querySelector('.container')
    addEventListener('mousemove', MoveCircle)
    container.removeAttribute("style")
    container.innerHTML = ""
    Header()
}