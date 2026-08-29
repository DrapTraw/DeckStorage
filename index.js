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
nav {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 1rem;
    position: fixed;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    top: 2rem;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.5);
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0;
    padding: 0;
}

nav a {
    color: white;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    padding: 10px 18px;
    border-radius: 15px;
    transition: all 0.3s ease;
}

nav a:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
}

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
