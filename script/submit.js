import GOOGLE_APPS_SCRIPT_URL from "./link.js";

document
    .getElementById("submitForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch(`${GOOGLE_APPS_SCRIPT_URL}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            redirect: "follow",
        })
            .then((response) => response.json())
            .then((result) => {
                alert("Réponse soumise avec succès!");
            })
            .catch((error) => {
                console.error("Erreur:", error);
            });
    });
