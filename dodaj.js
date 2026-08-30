const supabaseUrl = "https://abftkotwuvauggougqyr.supabase.co";
const supabaseKey = "sb_publishable_amq_kNl5NtwcTq-W6udA5w_vs7oI0UG";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

let wybraneKarty = [];

const skladanyDeck = document.querySelector("#skladanyDeck");
const galeriaKart = document.querySelector("#galeriaKart");


const nazwaDecku = document.querySelector("#nazwaDecku");
const przycisk = document.querySelector("#dodajDeck");

przycisk.addEventListener("click", async function() {

    const nazwyKart = wybraneKarty.map(function(adres) {
    return adres.split("/").pop();
});

const zaznaczoneZakladki = document.querySelectorAll(
    '#listaZakladek input[type="checkbox"]:checked'
);

const nazwyZakladek = [];

for (let checkbox of zaznaczoneZakladki) {
    nazwyZakladek.push(Number(checkbox.value));
}

if (nazwyZakladek.length === 0) {
    alert("Wybierz przynajmniej jedną zakładkę.");
    return;
} 

const { data, error } = await supabaseClient
    .from("Decki")
    .insert({
        nazwa: nazwaDecku.value,
        karty: nazwyKart,
        zakladki: nazwyZakladek
    });
    if (error) {
    console.error("Błąd:", error);
    return;
}

console.log("Deck zapisany!");

wybraneKarty = [];
skladanyDeck.innerHTML = "";

document.querySelectorAll(
    '#listaZakladek input[type="checkbox"]'
).forEach(function(checkbox) {
    checkbox.checked = false;
});

nazwaDecku.value = "";

const obrazyKart = galeriaKart.querySelectorAll("img");

for (let obraz of obrazyKart) {

    obraz.addEventListener("click", function() {

        // Nie pozwól dodać tej samej karty drugi raz
        if (wybraneKarty.includes(obraz.src)) {
            return;
        }

        // Maksymalnie 8 kart
        if (wybraneKarty.length >= 8) {
            return;
        }

        wybraneKarty.push(obraz.src);

        const nowaKarta = document.createElement("img");
        nowaKarta.src = obraz.src;

        // Kliknięcie karty w decku usuwa ją
        nowaKarta.addEventListener("click", function() {

            const indeks = wybraneKarty.indexOf(obraz.src);

            if (indeks !== -1) {
                wybraneKarty.splice(indeks, 1);
            }

            nowaKarta.remove();
        });

        skladanyDeck.appendChild(nowaKarta);
    });

}

async function pobierzZakładki() {

    const { data, error } = await supabaseClient
        .from("Zakładki")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("Błąd pobierania zakładek:", error);
        return;
    }

    console.log("Zakładki:", data);
const listaZakladek = document.querySelector("#listaZakladek");

listaZakladek.innerHTML = "";

for (let zakladka of data) {

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = zakladka.id;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + zakladka.nazwa));

    listaZakladek.appendChild(label);
}

}

pobierzZakładki();

const przyciskNowaZakladka = document.querySelector("#nowaZakladka");

przyciskNowaZakladka.addEventListener("click", async function() {

    const nazwa = prompt("Podaj nazwę nowej zakładki:");

    if (!nazwa) {
        return;
    }

    const { data, error } = await supabaseClient
        .from("Zakładki")
        .insert({
            nazwa: nazwa
        })
        .select();

    if (error) {
        console.error("Błąd dodawania zakładki:", error);
        return;
    }

    console.log("Dodano zakładkę:", data);

    pobierzZakładki();
});
