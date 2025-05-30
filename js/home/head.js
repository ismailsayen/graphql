import { VerifyError } from "../../utils/verifyError.js"
import { LogOut } from "../auth/logOut.js"
import { querys } from "../gql/querys.js"
import { failureToast } from "../notif/failureToast.js"

export function Header() {
    const container = document.querySelector('.container')
    const nav = document.createElement('div')
    nav.className = "header"
    nav.innerHTML =/*html*/`
        <h1>GRAPH<span>QL</span></h1>
        <div class="info-header">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0" class="profile-icon">
                <path class="p1" d="m50 15.148c4.3125 0 8.2188 1.75 11.051 4.582 2.8359 2.8281 4.5859 6.7422 4.5859 11.055 0 4.3164-1.75 8.2266-4.582 11.055-2.832 2.832-6.7422 4.582-11.055 4.582-4.3164 0-8.2266-1.75-11.055-4.582-2.8281-2.8281-4.582-6.7422-4.582-11.055 0-4.3164 1.75-8.2266 4.582-11.055l0.11328-0.10547c2.8203-2.7656 6.6875-4.4766 10.941-4.4766zm31.195 5.25c-0.75391-0.80078-0.71875-2.0664 0.085938-2.8203 0.80078-0.75391 2.0664-0.71875 2.8203 0.085937l0.15234 0.16406c0.75391 0.80078 0.71875 2.0664-0.085937 2.8203-0.80078 0.75391-2.0664 0.71875-2.8203-0.085938zm3.4766 4.1602c-0.65234-0.88672-0.45703-2.1406 0.42969-2.7891 0.88672-0.65234 2.1406-0.45703 2.7891 0.42969 2.9102 3.9609 5.2188 8.3984 6.7812 13.172 1.5078 4.6094 2.3242 9.5312 2.3242 14.629 0 12.977-5.2617 24.73-13.766 33.234-8.5039 8.5039-20.258 13.766-33.234 13.766-12.977 0-24.73-5.2617-33.234-13.766-8.5039-8.5039-13.766-20.258-13.766-33.234s5.2617-24.73 13.766-33.234c8.5039-8.5039 20.258-13.766 33.234-13.766 5.5703 0 10.934 0.98047 15.918 2.7734 5.168 1.8633 9.9102 4.5938 14.043 8.0156 0.84766 0.70313 0.96875 1.9648 0.26562 2.8125-0.70312 0.84766-1.9648 0.96875-2.8125 0.26563-3.793-3.1445-8.1328-5.6484-12.84-7.3438-4.5352-1.6328-9.4414-2.5234-14.574-2.5234-11.875 0-22.625 4.8125-30.406 12.594s-12.594 18.531-12.594 30.406 4.8125 22.625 12.594 30.406 18.531 12.594 30.406 12.594 22.625-4.8125 30.406-12.594 12.594-18.531 12.594-30.406c0-4.6836-0.74609-9.1875-2.1211-13.395-1.4297-4.3633-3.5391-8.4219-6.2031-12.047zm-47.402 26.742h25.457c4.6133 0 8.8086 1.8867 11.848 4.9258 3.0391 3.0391 4.9258 7.2344 4.9258 11.848s-1.8867 8.8086-4.9258 11.848c-3.0391 3.0391-7.2344 4.9258-11.848 4.9258h-25.457c-4.6133 0-8.8086-1.8867-11.848-4.9258l-0.10547-0.11328c-2.9766-3.0312-4.8203-7.1836-4.8203-11.73 0-4.6133 1.8867-8.8086 4.9258-11.848 3.0391-3.0391 7.2344-4.9258 11.848-4.9258zm25.457 4h-25.457c-3.5117 0-6.7031 1.4375-9.0195 3.7539-2.3164 2.3164-3.7539 5.5078-3.7539 9.0195 0 3.4727 1.3984 6.6289 3.6562 8.9297l0.09375 0.089844c2.3164 2.3164 5.5078 3.7539 9.0195 3.7539h25.457c3.5117 0 6.7031-1.4375 9.0195-3.7539 2.3164-2.3164 3.7539-5.5078 3.7539-9.0195s-1.4375-6.707-3.7539-9.0195c-2.3164-2.3164-5.5078-3.7539-9.0195-3.7539zm-4.4961-32.75c-2.1016-2.1016-5.0156-3.4023-8.2305-3.4023-3.1719 0-6.0469 1.2656-8.1406 3.3125l-0.085937 0.09375c-2.1055 2.1055-3.4062 5.0156-3.4062 8.2305s1.3047 6.125 3.4062 8.2266c2.1055 2.1055 5.0156 3.4062 8.2305 3.4062s6.125-1.3047 8.2305-3.4062c2.1055-2.1055 3.4062-5.0156 3.4062-8.2266 0-3.2148-1.3047-6.125-3.4062-8.2305z"/>
            </svg>
            <p class="logOut">LOGOUT</p>
        </div>
    `
    container.appendChild(nav)
    const icon = document.querySelector('.profile-icon')
    const logOut = document.querySelector('.logOut')
    icon.addEventListener('click', ProfileSection)
    logOut.addEventListener('click', LogOut)
}

async function ProfileSection() {
    const container = document.querySelector('.container')
    let userInfoSec = document.querySelector('.user-info-section')
    if (userInfoSec) {
        userInfoSec.style.transform = 'translate(0)'
        return
    }
    const data = await GetInfo(querys.infosUser)
    let err = VerifyError(data)
    if (err===false) {
        return
    }
    let login = data.data.user[0].login
    let info = data.data.user[0].attrs

    userInfoSec = document.createElement('div')
    userInfoSec.className = 'user-info-section'
    userInfoSec.style.transform = 'translate(0)'
    userInfoSec.innerHTML =/*html*/`
            <div class="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="40px" heigh="40px" version="1.1" viewBox="0 0 32 40" x="0px" y="0px" class="close-sec">
                    <path fill="#FFFF" d="M23.879 21.22l-5.224-5.221 5.22-5.224c0.602-0.6 0.602-1.565 0.002-2.167l-0.485-0.486c-0.285-0.292-0.675-0.451-1.085-0.451-0.002 0-0.002 0-0.002 0-0.41 0-0.795 0.161-1.083 0.45l-5.222 5.226-5.224-5.22c-0.599-0.6-1.563-0.603-2.165-0.003l-0.486 0.481c-0.293 0.287-0.453 0.677-0.453 1.086 0 0.411 0.161 0.798 0.45 1.086l5.226 5.222-5.221 5.224c-0.602 0.6-0.602 1.565-0.002 2.169l0.485 0.485c0.287 0.292 0.676 0.451 1.086 0.451 0.408 0 0.798-0.163 1.085-0.45l5.221-5.225 5.222 5.219c0.296 0.299 0.69 0.45 1.085 0.45 0.391 0 0.783-0.149 1.082-0.447l0.485-0.484c0.294-0.285 0.453-0.675 0.453-1.085 0.002-0.41-0.159-0.797-0.448-1.086z"/>
                </svg>
            </div>
            <div class="username">
                <h2 class="fullname">${info.firstName} ${info.lastName}</h2>
                <p class="nickname">#${login}</p>
            </div>
            <div class="info-data">
                <p><span>Email:</span> ${info.email || "--"}</p>
                <p><span>Phone Number:</span> ${info.tel || "--"}</p>
                <p><span>Scholar Level:</span> ${info.scholarLevel || "--"}</p>
                <p><span>Gender:</span> ${info.gender || "--"}</p>
                <p><span>City:</span> ${info.addressCity || "--"}</p>
                <p><span>Country:</span> ${info.country || "--"}</p>
            </div>
        `
    container.appendChild(userInfoSec)

    const closeSecUser = document.querySelector('.close-sec')

    if (closeSecUser) {

        closeSecUser.addEventListener('click', () => {

            const uerInfoSec = document.querySelector('.user-info-section')
            uerInfoSec.style.transform = 'translate(100%)'
        })
    }
}

export async function GetInfo(query) {
    let data
    const Token = localStorage.getItem('token')
    try {
        let resp = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
            method: "POST",
            body: JSON.stringify({ query }),
            headers: {
                "Authorization": `Bearer ${Token}`,
                "Content-Type": "application/json"
            }
        })
        data = await resp.json()
        if (resp.ok) {
            return data
        }
    } catch (err) {
        return null
    }
}