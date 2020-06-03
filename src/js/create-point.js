const api_ibge = "https://servicodados.ibge.gov.br/api/v1/localidades/";

async function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch(api_ibge + "estados")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`;
      }
    });
}

populateUfs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>";

  const stateInput = document.querySelector("[name=state]");
  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = api_ibge + `estados/${ufValue}/municipios`;
  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value=${city.id}>${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);
