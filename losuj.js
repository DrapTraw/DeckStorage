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