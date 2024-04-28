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

export const SendClicktoApi = async (row, column) => {
    const body = {
        row: row,
        column: column
    }
    await fetch(`${url}/sendClick`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    console.log(JSON.stringify(body))
}

//code for c#

// app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

// var msg = "Hello World";
// app.MapGet("/checkers/helloworld", () => {

//     return new {msg};
// });


