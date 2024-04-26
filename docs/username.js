const submitName = () => {
    const popUp = document.getElementById("getUserName")
    const userNameForm = document.getElementById("getUserNameForm")
    const userName = document.getElementById("username")
    userNameForm.addEventListener("submit", (e) => {
        e.preventDefault()
        if(userName.value != "")
        {
            popUp.classList.add("hidden")
            
        }   
    })

}   

submitName()