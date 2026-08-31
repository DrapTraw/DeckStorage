const DeckisupabaseUrl = "https://abftkotwuvauggougqyr.supabase.co";
const DeckisupabaseKey = "sb_publishable_amq_kNl5NtwcTq-W6udA5w_vs7oI0UG";

const DeckisupabaseClient = window.supabase.createClient(
    DeckisupabaseUrl,
    DeckisupabaseKey
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
}
const przyciskLosujDeck = document.querySelector("#losujDeck");

przyciskLosujDeck.addEventListener("click", function() {
    losujDeck();
});
