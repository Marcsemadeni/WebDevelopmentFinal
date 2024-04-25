import { Servers } from "./domain.js";

const input = document.getElementById("filterInput")

input.addEventListener("input", () => {
    const string = input.value.toLowerCase();

    const FilterServers = Servers.filter((server) => {
        const playerName = server.host.toLocaleLowerCase().includes(string)
        const gametype = server.game.toLocaleLowerCase().includes(string)
        const status = server.status.toLocaleLowerCase().includes(string)
        return playerName || gametype || status
    })
    loadServers(FilterServers)
})

const loadServers = (servers) => {
    const containerlists = document.getElementById("contentContainer")
    containerlists.textContent = ""

    servers.forEach(server => {
        const container = document.createElement("div")
        container.classList.add("serverContainer")

        const serverPlayer = document.createElement("p")
        serverPlayer.textContent = `${server.host}`
        serverPlayer.id = "serverPlayer"
        const serverGame = document.createElement("p")
        serverGame.textContent = `${server.game}`
        serverGame.id = "serverGame"
        const serverStatus = document.createElement("p")
        serverStatus.textContent = `${server.status}`
        serverStatus.id =  "serverStatus"

        container.appendChild(serverPlayer)
        container.appendChild(serverGame)
        container.appendChild(serverStatus)
        containerlists.appendChild(container)
    });
}

loadServers(Servers)