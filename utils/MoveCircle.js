export function MoveCircle(e) {
    const circle = document.querySelector(".circle")
    circle.style.display = 'flex'
    let r = circle.getBoundingClientRect().width / 2
    if (e.clientX + r < innerWidth) {
        circle.style.left = `${e.clientX}px`

    }
    if (e.clientY + r < innerHeight) {
        circle.style.top = `${e.clientY}px`
    }
}