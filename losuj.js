const LosujsupabaseUrl = "https://abftkotwuvauggougqyr.supabase.co";
const LosujsupabaseKey = "sb_publishable_amq_kNl5NtwcTq-W6udA5w_vs7oI0UG";

const LosujsupabaseClient = window.supabase.createClient(
    LosujsupabaseUrl,
    LosujsupabaseKey
);

let wylosowanyDeck = document.querySelector("#wylosowanyDeck");
let nazwaWylosowanegoDecku = document.querySelector("#nazwaWylosowanegoDecku");


// LOSOWANIE POJEDYNCZYCH KART

let przyciskStart = document.querySelector("#losujKarty");

przyciskStart.addEventListener("click", function() {

    nazwaWylosowanegoDecku.textContent = "";
    wylosowanyDeck.innerHTML = "";

    let wylosowaneKarty = [];

    while (wylosowaneKarty.length < 8) {

        let losowaKarta =
            karty[Math.floor(Math.random() * karty.length)];

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


// LOSOWANIE GOTOWEGO DECKU Z GALERII

async function losujDeck() {

    const { data: daneDeckow, error: bladDeckow } =
        await LosujsupabaseClient
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
}


const przyciskLosujDeck =
    document.querySelector("#losujDeck");

przyciskLosujDeck.addEventListener("click", function() {
    losujDeck();
});
