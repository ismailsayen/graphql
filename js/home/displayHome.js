
import { BodyHome } from "./BodyHome.js";

import { Header } from "./head.js";

export async function displayHome() {
  const link = document.getElementById("css-link");
  if (link) {
    link.href = "/css/home.css";
  }
  const container = document.querySelector(".container");

  container.removeAttribute("style");
  container.innerHTML = "";
  Header();
  BodyHome();
}
