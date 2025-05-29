import { VerifyError } from "../../utils/verifyError.js";
import { convertXPToReadable } from "../../utils/XpConcerter.js";
import { LogOut } from "../auth/logOut.js";
import { querys } from "../gql/querys.js";
import { failureToast } from "../notif/failureToast.js";
import { AuditsSect } from "./AuditsSect.js";
import { GetInfo } from "./head.js";
import { ProgressSect } from "./ProgressSect.js";

export async function BodyHome() {
  const container = document.querySelector(".container");
  const bodyContainer = document.createElement("div");
  bodyContainer.className = "body-container";
  container.appendChild(bodyContainer);
  await SectionInfos();
  await AuditsSect();
  await ProgressSect()
}

async function SectionInfos() {
  const bodyContainer = document.querySelector(".body-container");

  const div = document.createElement("div");
  div.className = "section";
  let headInfo = await GetInfo(querys.user)
  let err = VerifyError(headInfo);
  if (err === false) {
    return;
  }
  headInfo = headInfo.data.user[0]
  let xp = await GetInfo(querys.xp);
  err = VerifyError(xp);
  if (err === false) {
    return;
  }
  xp = convertXPToReadable(xp.data.transaction_aggregate.aggregate.sum.amount);
  let level = await GetInfo(querys.level);
  err = VerifyError(xp);
  if (err === false) {
    return;
  }
  if (!level.data.transaction[0]) {
    LogOut()
    failureToast("We don't have any information about you")
  }

  level = level.data.transaction[0].amount;
  let lastTwoProjects = await GetInfo(querys.lastTwoProject);
  err = VerifyError(xp);
  if (err === false) {
    return;
  }

  lastTwoProjects = lastTwoProjects.data.transaction

  div.innerHTML = /*html*/ `
        <div class="header-section">
            <div class="icon-user">
                <svg role="img" width="80px" height="80px" viewBox="0 0 24 24" aria-label="icon">
                    <path fill="#4B79BF" fill-rule="evenodd" clip-rule="evenodd" d="M22.15 12c0 2.1-.63 4.05-1.72 5.67h-4.88v-1.6h4.07v-1.2h1.35V9.3h-1.35V7.77h-5.15l1.12-1.26a1.52 1.52 0 1 0-.7-.48l-1.55 1.74h-2.68L9.03 5.92a1.52 1.52 0 1 0-.65.54l1.15 1.3H4.55V9.3H3.2v5.59h1.35v1.18h4.07v1.6H3.57A10.15 10.15 0 1 1 22.15 12Zm-2.53-1.86v3.9h.5v-3.9h-.5Zm-.85-.85v-.67H5.4v6.6h13.37V9.29Zm-14.72.85h.5v3.9h-.5v-3.9ZM12 22.15c-3.13 0-5.93-1.41-7.79-3.63H19.8A10.13 10.13 0 0 1 12 22.15ZM23 12a11 11 0 1 1-22 0 11 11 0 0 1 22 0ZM9.46 16.23h5.25v1.35H9.46v-1.35Zm-.68-4.06a1.02 1.02 0 1 0 0-2.03 1.02 1.02 0 0 0 0 2.03Zm0 .85a1.86 1.86 0 1 0 0-3.73 1.86 1.86 0 0 0 0 3.73Zm7.79-1.87c0 .53-.46 1.02-1.1 1.02-.64 0-1.1-.49-1.1-1.02 0-.52.46-1.01 1.1-1.01.64 0 1.1.49 1.1 1.01Zm.85 0a1.9 1.9 0 0 1-1.95 1.87 1.9 1.9 0 0 1-1.95-1.87 1.9 1.9 0 0 1 1.95-1.86 1.9 1.9 0 0 1 1.95 1.86Zm-6.56 2.46-.16-.4-.79.3.36.94H14l.28-.98-.82-.23-.1.37h-2.5Zm-3.1-7.87a.68.68 0 1 0 0-1.36.68.68 0 0 0 0 1.36Zm8.98-.68a.68.68 0 1 1-1.36 0 .68.68 0 0 1 1.36 0Z"></path>
                </svg>
                <h1>${headInfo.firstName} ${headInfo.lastName}, <span>${headInfo.login}.</span></h1>
            </div>
            <div class='more-infos'>
                <div class="level"><span>xp:</span><h1>${xp}</h1></div>
                <div class="level"><span>level:</span><h1>${level}</h1></div>
            </div>
        </div>
        <div class="last-two-projects">
            ${lastTwoProjects
      .map(
        (ele) => /*html*/ `
                <div class="project">
                    <div class="ic">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon-succeed" viewBox="0 0 32 40" x="0px" y="0px">
                            <g data-name="Layer 2"><path fill="#007435" d="M10.455,26.634c.037.024.078.039.115.061a2.9,2.9,0,0,0,.4.213c.057.023.117.033.175.053a3.092,3.092,0,0,0,.381.113,2.7,2.7,0,0,0,1.536-.113c.059-.019.12-.03.177-.053a2.932,2.932,0,0,0,.4-.208c.041-.024.085-.04.125-.066a3.067,3.067,0,0,0,.466-.381l1.414-1.414L29.08,11.4a3,3,0,0,0,0-4.243L27.666,5.747a3,3,0,0,0-4.243,0L12.11,17.061,8.575,13.525a3.08,3.08,0,0,0-4.243,0L2.917,14.939a3.007,3.007,0,0,0,0,4.243l7.071,7.071A3.016,3.016,0,0,0,10.455,26.634ZM24.837,7.161a1,1,0,0,1,1.415,0l1.414,1.414a1,1,0,0,1,0,1.413L14.005,23.651l-1.189,1.188a1.029,1.029,0,0,1-1.414,0L9.281,22.718Zm-20.8,9.9a.989.989,0,0,1,.291-.707l1.414-1.415a1.029,1.029,0,0,1,1.414,0L10.7,18.475,7.867,21.3,4.332,17.768A.992.992,0,0,1,4.041,17.061Z" /></g>
                        </svg>
                    </div>
                        <div class="info-projects">
                            <div><h3>${ele.object.name}</h3></div>
                            <div class="xp">${convertXPToReadable(ele.amount)}</div> 
                        </div>
                    </div>
                `
      )
      .join("")}
        </div>
    `;
  bodyContainer.appendChild(div);
}
