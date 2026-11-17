import axios from "axios";

export async function getcards(title = "", priority = "", assignee = "") {
    const object = {};

    if (title !== "") {
        object.q = title;
    }

    if (priority !== "") {
        object.priority = priority;
    }

    if (assignee !== "") {
        object.assignee = assignee;
    }

    try {
        const response = await axios.get(
            "https://flowboard-api-virid.vercel.app/cards",
            {
                headers: {
                    "X-Workspace": "nouhaila",
                    "password" : "1234"

                    

                },
                params: object
            }
        );

        return response.data;

    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

export async function createCard(card) {

    try {

        const response = await axios.post(
            "https://flowboard-api-virid.vercel.app/cards",
            card,
            {
                headers: {
                    "X-Workspace": "public"
                }
            }
        );

        return response.data;

    } catch (error) {

        console.log("Create card error:", error);
        throw error;

    }
}


