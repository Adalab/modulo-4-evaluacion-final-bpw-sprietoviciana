async function fetchClients() {
  const response = await fetch("http://localhost:5001/clients");
  const data = await response.json();
  const clientsList = document.querySelector(".clients-list");
  clientsList.innerHTML = data.result
    .map(
      (client) =>
        `<li>${client.name} ${client.lastname} (${client.email}) <button onclick="deleteClient(${client.id})">Delete</button></li>`
    )
    .join("");
}

async function addClient() {
  const name = document.querySelector(".add-name");
  const lastname = document.querySelector(".add-lastname");
  const email = document.querySelector(".add-email");

  if (!name.value || !lastname.value || !email.value)
    return alert("All fields are required!");

  await fetch("http://localhost:5001/clients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      lastname: lastname.value,
      email: email.value,
    }),
  });
  name.value = "";
  lastname.value = "";
  email.value = "";
  await fetchClients();
}

async function deleteClient(id) {
  await fetch(`http://localhost:5001/clients/${id}`, { method: "DELETE" });
  await fetchClients();
  alert("Client deleted successfully!");
}

async function main() {
  await fetchClients();
}

main();
