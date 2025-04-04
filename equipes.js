// Données des équipes par groupe
const equipesParGroupe = {
    "Groupe A": [
        { nom: "MOROCCO", drapeau: "drapeau/maroc.png" },
        { nom: "MALI", drapeau: "drapeau/mali.png" },
        { nom: "ZAMBIA", drapeau: "drapeau/zambie.png" },
        { nom: "COMOROS", drapeau: "drapeau/Comoros.png" }
    ],
    "Groupe B": [
        { nom: "EGYPTE", drapeau: "drapeau/Egypt.png" },
        { nom: "SOUTH AFRICA", drapeau: "drapeau/afrique_sud.png" },
        { nom: "ANGOLA", drapeau: "drapeau/angola.png" },
        { nom: "ZIMBABWE", drapeau: "drapeau/zimbabwe.png" }
    ],

    "Groupe C": [
        { nom: "NIGERIA", drapeau: "drapeau/Egypt.png" },
        { nom: "TUNUSIA", drapeau: "drapeau/afrique_sud.png" },
        { nom: "UGANDA", drapeau: "drapeau/angola.png" },
        { nom: "TANZANIA", drapeau: "drapeau/zimbabwe.png" }
    ],

    "Groupe D": [
        { nom: "SENEGAL", drapeau: "drapeau/senegal.png" },
        { nom: "DR CONGO", drapeau: "drapeau/congo.png" },
        { nom: "BENIN", drapeau: "drapeau/benin.png" },
        { nom: "BOTSWANA", drapeau: "drapeau/bostwana.png" }
    ],

    "Groupe E": [
        { nom: "ALGERIA", drapeau: "drapeau/algerie.png" },
        { nom: "BURKINA FASO", drapeau: "drapeau/burkina_faso.png" },
        { nom: "EQUATORIAL GUINEA", drapeau: "drapeau/guinee_equatoriale.png" },
        { nom: "SUDAN", drapeau: "drapeau/soudan.png" }
    ],

    "Groupe F": [
        { nom: "COTE D'IVOIRE", drapeau: "drapeau/cote_d_ivoire.png" },
        { nom: "CAMEROON", drapeau: "drapeau/cameroun.png" },
        { nom: "GABON", drapeau: "drapeau/gabon.png" },
        { nom: "MOZAMBIQUE", drapeau: "drapeau/mozambique.png" }
    ],
    // Ajoutez les autres groupes ici...
};

// Fonction pour afficher les équipes par groupe
document.addEventListener("DOMContentLoaded", function() {
    const tbody = document.querySelector("#table-equipes tbody");

    for (const [groupe, equipes] of Object.entries(equipesParGroupe)) {
        equipes.forEach(equipe => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${groupe}</td>
                <td>${equipe.nom}</td>
                <td><img src="${equipe.drapeau}" alt="${equipe.nom}" class="drapeau"></td>
            `;
            tbody.appendChild(tr);
        });
    }
});