import { VerifyError } from "../../utils/verifyError.js";
import { querys } from "../gql/querys.js";
import { GetInfo } from "./head.js";

export async function AuditsSect() {
  const container = document.querySelector(".body-container");
  const audit_sec = document.createElement("div");
  audit_sec.className = "audit-sec";
  let data = await GetInfo(querys.auditInfo);
  let err = VerifyError(data);
  if (err === false) {
    return;
  }

  let ratio = data?.data?.user[0].auditRatio.toFixed(1);
  let history = data?.data?.user[0].audits

  audit_sec.innerHTML = /*html*/ `
        <div class="historyAudit">
            <h1>Audit Ratio: <span class="audit-ratio" id="auditRatio">${ratio}</span></h1>
            <div class="audit-list">
            </div>
          </div>
          <div class='Graph'>
            <h1>Audits graph:</h1>
            <div class="perCentAudit">
              <div class="perSucced">
                  <div></div>
                  <p class="per"></p>
                </div>
              <div class="perFailed">
                  <div></div>
                  <p class="per"></p>
              </div>
            </div>
            <div class="drawing">

            </div>
          </div>
        `;

  container.appendChild(audit_sec);
  const auditList = document.querySelector('.audit-list')
  history.map(audit => {
    const auditDiv = document.createElement('div');
    auditDiv.className = `audit-item ${audit.closureType}`;

    const leader = audit.group.captainLogin;
    const projectName = audit.group.pathByPath.object.name;
    const status = audit.closureType;

    auditDiv.innerHTML = `
        <div class="audit-info">
            Leader: ${leader} | Project: ${projectName} | Status: ${status}
        </div>
    `;
    auditList.appendChild(auditDiv)
  })
  GraphAUdits(history)
}

function GraphAUdits(history = []) {
  let perSucc = 0
  let perfail = 0
  history.map(audit => {
    audit.closureType == "succeeded" ? perSucc++ : perfail++
  })
  perSucc = Math.round((perSucc * 100) / history.length)
  perfail = Math.round((perfail * 100) / history.length)
  let perSuccDiv = document.querySelector('.audit-sec .Graph .perCentAudit .perSucced .per')
  let perFailDiv = document.querySelector('.audit-sec .Graph .perCentAudit .perFailed .per')
  let drawingPlace = document.querySelector('.audit-sec .Graph .drawing')
  perSuccDiv.textContent = `${perSucc}%`
  perFailDiv.textContent = `${perfail}%`
  drawingPlace.innerHTML =/*html*/`
    <svg 
    xmlns="http://www.w3.org/2000/svg"
    class="circle-graph"
    viewBox="0 0 70 70"
    style="width: 200px; height: 200px;"
    >
      <circle r="35" cx="35" cy="35" class="succeed" />
      <path id="sector" fill="red" />
    </svg>
    `
  const percent = perfail == 100 ? 99.99 : perfail;
  const circle = document.querySelector(".circle-graph circle")
  const r = Number(circle.getAttribute("r"));
  const cx = Number(circle.getAttribute("cx"));
  const cy = Number(circle.getAttribute("cy"));
  describeArc(cx, cy, r, percent);
}

function describeArc(cx, cy, radius, percent) {
  const angle = (percent * 360 / 100);
  const rad = (angle * 2 * Math.PI) / 360
  const x = cx + radius * Math.sin(rad);
  const y = cy - radius * Math.cos(rad);
  const largeArcFlag = angle > 180 ? 1 : 0;

  let pathData = `M${cx},${cy} 
            L${cx},${cy - radius} 
            A${radius},${radius} 0 ${largeArcFlag},1 ${x},${y} Z`;
  document.getElementById("sector").setAttribute("d", pathData);
}
