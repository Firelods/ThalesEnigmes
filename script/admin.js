import GOOGLE_APPS_SCRIPT_URL from "./link.js";
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("adminToken");
    if (!token) {
        alert("Accès non autorisé");
        window.location.href = "login.html";
        return;
    }

    fetch(`${GOOGLE_APPS_SCRIPT_URL}?verify=true`, {
        method: "POST",
        body: JSON.stringify({ token: token }),
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        redirect: "follow",
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.valid) {
                document.getElementById("adminPanel").style.display = "block";
            } else {
                alert("Accès non autorisé");
                window.location.href = "login.html";
            }
        })
        .catch((error) => {
            console.error("Erreur:", error);
        });
});

document
    .getElementById("adminForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        const token = localStorage.getItem("adminToken");
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch(`${GOOGLE_APPS_SCRIPT_URL}?admin=true`, {
            method: "POST",
            body: JSON.stringify({ ...data, token: token }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                alert("Réponse ajoutée avec succès!");
            })
            .catch((error) => {
                console.error("Erreur:", error);
            });
    });
