const submitName = () => {
    const popUp = document.getElementById("getUserName")
    const userNameForm = document.getElementById("getUserNameForm")
    const userName = document.getElementById("username")

    // query string
    const urlparams = new URLSearchParams(window.location.search)
    const queryName = urlparams.get(`Name`)
    if (queryName == null || queryName == "")
    {
        userNameForm.addEventListener("submit", () => {
            if(userName.value != "")
            {
                popUp.classList.add("hidden")
            }   
        })
    }
    else
    {
        popUp.classList.add("hidden")
        const page = document.getElementById("showUserName")
        const displayName = document.createElement("h2")
        displayName.innerText = `Welcome, ${queryName}`
        page.appendChild(displayName)

    }

}   

submitName()
