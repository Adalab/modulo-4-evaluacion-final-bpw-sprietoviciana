async function fetchClients() {
  const response = await fetch("http://localhost:5001/clients");
  const data = await response.json();
  const clientsList = document.querySelector(".clients-list");
  clientsList.innerHTML = data.result
    .map(
      (client) => `<li>${client.name} ${client.lastname} (${client.email})</li>`
    )
    .join("");
}

async function main() {
  await fetchClients();
}

main();
