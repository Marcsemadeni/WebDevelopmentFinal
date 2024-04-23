const url = "http://localhost:5226";
export const GetMessage = async () => {
    //Can't use normal checkers link cause of blazor, wrap everything in {} in c# to make it an object.
    const link = url + "/checkers/helloworld";
    const respone = await fetch(link)
    return await respone.json();
}