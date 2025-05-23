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
  let history = data?.data?.user[0].audits.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return 1
    } else if (a.createdAt < b.createdAt) {
      return -1
    } else {
      return 0
    }
  })


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
    GraphAUdits(history)
  })
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
  perSuccDiv.textContent = `${perSucc}%`
  perFailDiv.textContent = `${perfail}%`
  console.log(perSucc, perfail, history.length);

}