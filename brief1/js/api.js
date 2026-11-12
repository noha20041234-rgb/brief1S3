export function getcards(title = "", priority = "", assignee = "") {
    let param = new URLSearchParams();

    if (title !== "") {
        param.append("q", title);
    }

    if (priority !== "") {
        param.append("priority", priority);
    }

    if (assignee !== "") {
        param.append("assignee", assignee);
    }

    return fetch("https://flowboard-api-virid.vercel.app/cards?" + param, {
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
    .catch(error => {
        console.log("error", error);
        throw error;
    });
}