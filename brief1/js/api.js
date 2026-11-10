 export function getcards(){
  return fetch("https://flowboard-api-virid.vercel.app/cards", {
        headers: {
            "X-Workspace": "public"
        }
    })
.then(response => {

    return response.json();
})
.then(data => {
    return data;

})
.catch(Error =>{
    console.log("error",Error);
})
 }
