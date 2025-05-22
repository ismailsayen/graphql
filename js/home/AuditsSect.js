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
  let history = data?.data?.user[0].audits;
  

  audit_sec.innerHTML = /*html*/ `
        <div class="historyAudit">
            <h1>Audit Ratio: <span class="audit-ratio" id="auditRatio">${ratio}</span></h1>
            <div class="group-audit">
                <p>helo</p>
            </div>
        </div>
        `;
  container.appendChild(audit_sec);
}
