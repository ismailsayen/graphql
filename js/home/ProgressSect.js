import { VerifyError } from "../../utils/verifyError.js";
import { querys } from "../gql/querys.js";
import { GetInfo } from "./head.js";

export async function ProgressSect() {
    const bodyContainer = document.querySelector(".body-container");
    const div = document.createElement("div");
    div.className = "progress-graph"
    let skills = await GetInfo(querys.skills)
    let err = VerifyError(skills);
    if (err === false) {
        return;
    }
    skills = skills.data.transaction
    let sk = new Set()
    let skill = []
    skills.forEach(element => {
        if (!sk.has(element.type)) {
            sk.add(element.type)
            skill.push(element)
        }
    });


    div.innerHTML =/*html*/`
        <h1>Best skills:</h1>
    `
    bodyContainer.appendChild(div)
    DrawGraph(skill)
}

function DrawGraph(skills = []) {
   

    const cont = document.querySelector(".progress-graph");

    // Nettoyer le conteneur
    cont.innerHTML = '';

    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 800 400');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.style.width = '100%';
    svg.style.height = 'auto';
    cont.appendChild(svg);

    // Axe X
    let xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', 35);
    xAxis.setAttribute('x2', 780);
    xAxis.setAttribute('y1', 350);
    xAxis.setAttribute('y2', 350);
    xAxis.setAttribute('stroke', "white");
    xAxis.setAttribute('stroke-width', "1");
    svg.appendChild(xAxis);

    // Axe Y
    let yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', 35);
    yAxis.setAttribute('x2', 35);
    yAxis.setAttribute('y1', 50);
    yAxis.setAttribute('y2', 350);
    yAxis.setAttribute('stroke', "white");
    yAxis.setAttribute('stroke-width', "1");
    svg.appendChild(yAxis);

    const yAxisHeight = 350 - 50;
    const labels = ['25', '50', '75'];
    const yPositions = [];

    labels.forEach(ele => {
        let ypos = 350 - (Number(ele) * yAxisHeight / 100);
        yPositions.push(ypos);
    });

    labels.forEach((label, index) => {
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', 30);
        text.setAttribute('y', yPositions[index] + 5);
        text.setAttribute('text-anchor', 'end');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', '12');
        text.setAttribute('font-family', 'Arial, sans-serif');
        text.textContent = label + '%';
        svg.appendChild(text);
    });

    let hoverText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    hoverText.setAttribute('x', 400);
    hoverText.setAttribute('y', 380);
    hoverText.setAttribute('text-anchor', 'middle');
    hoverText.setAttribute('fill', 'white');
    hoverText.setAttribute('font-size', '14');
    hoverText.setAttribute('font-family', 'Arial, sans-serif');
    hoverText.setAttribute('font-weight', 'bold');
    hoverText.textContent = '';
    svg.appendChild(hoverText);

    if (skills.length > 0) {
        const xAxisWidth = 780 - 35;
        const barWidth = Math.min(40, xAxisWidth / skills.length * 0.8);
        const spacing = xAxisWidth / skills.length;

        skills.forEach((skill, index) => {
            let x = 35 + (index * spacing) + (spacing - barWidth) / 2;

            let barHeight = (skill.amount * yAxisHeight) / 100;
            let y = 350 - barHeight;

            let bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bar.setAttribute('x', x);
            bar.setAttribute('y', y);
            bar.setAttribute('width', barWidth);
            bar.setAttribute('height', barHeight);
            bar.setAttribute('fill', '#4A90E2');
            bar.setAttribute('stroke', 'white');
            bar.setAttribute('stroke-width', '1');
            bar.style.cursor = 'pointer';

            bar.addEventListener('mouseenter', function () {
                this.setAttribute('fill', '#5BA0F2');
                hoverText.textContent = skill.type;
            });

            bar.addEventListener('mouseleave', function () {
                this.setAttribute('fill', '#4A90E2');
                hoverText.textContent = '';
            });

            svg.appendChild(bar);


            let valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            valueText.setAttribute('x', x + barWidth / 2);
            valueText.setAttribute('y', y - 5);
            valueText.setAttribute('text-anchor', 'middle');
            valueText.setAttribute('fill', 'white');
            valueText.setAttribute('font-size', '12');
            valueText.setAttribute('font-family', 'Arial, sans-serif');
            valueText.textContent = skill.amount + '%';
            svg.appendChild(valueText);
        });
    }
}