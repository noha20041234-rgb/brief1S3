export function getcards() {
    return fetch("https://flowboard-api-virid.vercel.app/cards", {
        headers: {
            "X-Workspace": "public"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }

        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.log("error", error);
        throw error;
    });
}
