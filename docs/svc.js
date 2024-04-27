const basicUrl = "http://localhost:5226";
const url = basicUrl + "/doc/checkers";

export const NewGame = async () => {
    const link = url + "/newGame"
    const response = await fetch(link)
    return await response.json()
}

export const GetBoardFromApi = async () => { 
    const response = await fetch(`${url}/getBoard`)
    return await response.json()
}

//code for c#

// app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

// var msg = "Hello World";
// app.MapGet("/checkers/helloworld", () => {

//     return new {msg};
// });


