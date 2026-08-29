const IndexsupabaseUrl = "https://abftkotwuvauggougqyr.supabase.co";
const IndexsupabaseKey = "sb_publishable_amq_kNl5NtwcTq-W6udA5w_vs7oI0UG";

const supabaseClientIndex = window.supabase.createClient(
    IndexsupabaseUrl,
    IndexsupabaseKey
);
console.log("Supabase w index log działa!");

const email = document.querySelector("#email");
const haslo = document.querySelector("#haslo");
const przyciskLogowania = document.querySelector("#zaloguj");
const statusLogowania = document.querySelector("#statusLogowania");

przyciskLogowania.addEventListener("click", async function() {

    const { data, error } = await supabaseClientIndex.auth.signInWithPassword({
        email: email.value,
        password: haslo.value
    });

    if (error) {
        console.error("Błąd logowania:", error);
        return;
    }

    console.log("Zalogowano!");
    console.log(data.user);
    statusLogowania.textContent =
    "Zalogowano jako: " + data.user.email;
});

supabaseClientIndex.auth.getUser().then(function(result) {

    const user = result.data.user;

    if (user) {
        console.log("Jesteś zalogowany jako:", user.email);

        statusLogowania.textContent =
            "Zalogowano jako: " + user.email;
    } else {
        console.log("Nie jesteś zalogowany");
    }

});


supabaseClientIndex
    .from("Decki")
    .select("*")
    .then(function(result) {

        if (result.error) {
            console.error("Błąd pobierania decków:", result.error);
            return;
        }

        console.log("Pobrane decki:", result.data);

    });
