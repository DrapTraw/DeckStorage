const LosujsupabaseUrl = "https://abftkotwuvauggougqyr.supabase.co";
const LosujsupabaseKey = "sb_publishable_amq_kNl5NtwcTq-W6udA5w_vs7oI0UG";

const LosujsupabaseClient = window.supabase.createClient(
    LosujsupabaseUrl,
    LosujsupabaseKey
);

let przycisk = document.querySelector(".tloLosuj button");

przycisk.addEventListener("click", function() {

    let wylosowaneKarty = [];

    while (wylosowaneKarty.length < 8) {

        let losowaKarta = karty[Math.floor(Math.random() * karty.length)];

        if (!wylosowaneKarty.includes(losowaKarta)) {
            wylosowaneKarty.push(losowaKarta);
        }
    }

    console.log("Wylosowane karty:", wylosowaneKarty);
});
let wylosowanyDeck = document.querySelector("#wylosowanyDeck");
let przyciskStart = document.querySelector(".tloLosuj button");
let nazwaWylosowanegoDecku = document.querySelector("#nazwaWylosowanegoDecku");

przyciskStart.addEventListener("click", function() {

    wylosowanyDeck.innerHTML = "";

    let wylosowaneKarty = [];

    while (wylosowaneKarty.length < 8) {

        let losowaKarta = karty[Math.floor(Math.random() * karty.length)];

        if (!wylosowaneKarty.includes(losowaKarta)) {
            wylosowaneKarty.push(losowaKarta);
        }
    }
    for (let karta of wylosowaneKarty) {

        let obraz = document.createElement("img");

        obraz.src = "karty/" + karta;

        wylosowanyDeck.appendChild(obraz);
    }

});

async function losujDeck() {

    const { data: daneDeckow, error: bladDeckow } =
        await DeckisupabaseClient
            .from("Decki")
            .select("*");

    if (bladDeckow) {
        console.error("Błąd pobierania decków:", bladDeckow);
        return;
    }

    const losowyDeck =
    daneDeckow[Math.floor(Math.random() * daneDeckow.length)];

console.log("Wylosowany deck:", losowyDeck);

nazwaWylosowanegoDecku.textContent = losowyDeck.nazwa;

wylosowanyDeck.innerHTML = "";

for (let karta of losowyDeck.karty) {

    let obraz = document.createElement("img");

    obraz.src = "karty/" + karta;

    wylosowanyDeck.appendChild(obraz);
}
const przyciskLosujDeck = document.querySelector("#losujDeck");

przyciskLosujDeck.addEventListener("click", function() {
    losujDeck();
});
