"use strict";

const btnFetch = document.querySelector("#fetch");
const div = document.querySelector("#div");
const btnFind = document.querySelector("#btnFind");
const txt = document.querySelector("#txt");
const pokecontainer = document.querySelector(".poke-container");

const colors = {
  fire: "orange",
  grass: "lightgreen",
  electric: "yellow",
  water: "#70ffea",
  ground: "darkgrey",
  rock: "grey",
  fairy: "pink",
  poison: "greenyellow",
  bug: "#94ecbe",
  dragon: "orange",
  psychic: "#7c7db6",
  flying: "#fcca46",
  fighting: "darkgrey",
  normal: "lightgrey",
  ice: "#00f2f2",
  dark: "#4f7ecf",
  ghost: "#7685a7",
  steel: "steelblue",
};

btnFind.addEventListener("click", async function () {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${txt.value}`
    );
    if (!response.ok) {
      txt.value = "";
      txt.placeholder = "No Pokemon found! ❌";
      throw new Error("No Pokemon found");
    }

    const data = await response.json();

    const ability = data.abilities.map((a) => a.ability.name.toUpperCase());
    const moves = data.moves.map((m) => m.move.name.toUpperCase());
    const types = data.types.map((t) => t.type.name);

    const colorsTypes = Object.keys(colors);
    const typeColor = colorsTypes.find((f) => types.indexOf(f) > -1);
    const color = colors[typeColor];

    div.classList.remove("hidden");
    pokecontainer.style.backgroundColor = color;

    div.innerHTML = `
    <span class='number'>#${data.id} ${types}</span>
   
    <div class='info'>
    <div>
    <img class="img-container" src='${data.sprites.front_default}''>
    </div>
    <h3 class='name'>${data.name.toUpperCase()}</h3>
    <div class='extra-info'>

    <div>
    <small> Weight : </small><h5 class="weight"> ${data.weight / 10} kg </h5>
    </div>

    <div>
    <small> Height : </small><h5 class="height"> ${data.height / 10} m</h5>
    </div>

    </div> 

    <div> 
    Ability :
    <h5 class="ability"> 
    ${ability}
    </h5>
    </div>
    
    <div> 
    Moves :
    <h5 class="ability"> 
    ${moves.join(" | ")}
    </h5>
    </div>
    </div>
    

    `;
    txt.value = "";
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
});
