const DeckisupabaseUrl = "https://abftkotwuvauggougqyr.supabase.co";
const DeckisupabaseKey = "sb_publishable_amq_kNl5NtwcTq-W6udA5w_vs7oI0UG";

const DeckisupabaseClient = window.supabase.createClient(
    DeckisupabaseUrl,
    DeckisupabaseKey
);

const galeriaDeckow = document.querySelector("#galeriaDeckow");

async function pobierzDane() {

    // Pobieramy zakładki
    const { data: daneZakladek, error: bladZakladek } =
        await DeckisupabaseClient
            .from("Zakładki")
            .select("*")
            .order("id", { ascending: true });

    if (bladZakladek) {
        console.error("Błąd pobierania zakładek:", bladZakladek);
        return;
    }

    // Pobieramy decki
    const { data: daneDeckow, error: bladDeckow } =
        await DeckisupabaseClient
            .from("Decki")
            .select("*");

    if (bladDeckow) {
        console.error("Błąd pobierania decków:", bladDeckow);
        return;
    }

    console.log("Zakładki:", daneZakladek);
    console.log("Decki:", daneDeckow);


    // Każda zakładka
    for (let zakladka of daneZakladek) {

        const sekcja = document.createElement("div");
        sekcja.classList.add("sekcjaZakladki");

        const naglowek = document.createElement("h2");
        naglowek.textContent = zakladka.nazwa;

        sekcja.appendChild(naglowek);


        // Szukamy decków należących do tej zakładki
        for (let deck of daneDeckow) {

            if (!Array.isArray(deck.zakladki)) {
                continue;
            }

            if (!deck.zakladki.includes(zakladka.id)) {
                continue;
            }


            const divDeck = document.createElement("div");
            divDeck.classList.add("deck");

            const nazwa = document.createElement("h3");
            nazwa.textContent = deck.nazwa;

            divDeck.appendChild(nazwa);


            const divKarty = document.createElement("div");
            divKarty.classList.add("deckKarty");


            for (let karta of (deck.karty || [])) {

                const obraz = document.createElement("img");
                obraz.src = "karty/" + karta;

                divKarty.appendChild(obraz);
            }

            divDeck.appendChild(divKarty);
            sekcja.appendChild(divDeck);
        }


        galeriaDeckow.appendChild(sekcja);
    }
}

pobierzDane();