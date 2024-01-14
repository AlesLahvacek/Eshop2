import polozka from './polozka.json' assert { type: 'json' };
console.log("polozka"+1);
let pocitani = 1;
let sestupne = true;

const att = document.createAttribute("src");
let iCena = new Array(12);

Object.keys(polozka["polozky"]).forEach(function(key) {
    console.log(polozka["polozky"][key].jmeno);
    let i = "polozka"+pocitani;
    let x = "cena"+pocitani;
    
    
    

    

    pocitani++;
    
    iCena = [polozka["polozky"][key].cena];
    
});

let tlacitko = document.getElementById("tlacitko");

tlacitko.addEventListener("click", function() {
    let polePolozek = Array.from(document.getElementsByClassName("sell"));
    polePolozek.sort(function(a, b) {
        let cenaA = parseInt(a.getElementsByClassName("cena")[0].innerText);
        let cenaB = parseInt(b.getElementsByClassName("cena")[0].innerText);
        return sestupne ? cenaB - cenaA : cenaA - cenaB;
    });
    let kontejner = document.getElementById("kontejner");
    polePolozek.forEach(function(sell) {
        kontejner.appendChild(sell);
    });
    sestupne = !sestupne;
});


fetch("polozka.json").then(
    function(response){
        return response.json();
    }
).then(
    function(data){
        localStorage.setItem("products", JSON.stringify(data));
        if (!localStorage.getItem("cart")) {
            localStorage.setItem("cart","[]");
        }
    }
);

let products = JSON.parse(localStorage.getItem("products"));

let cart = JSON.parse(localStorage.getItem("cart"));
console.log(products);
function pridatDoKosiku(kod) {
    let produkt = products.polozky.find(function(produkt){
        return produkt.kod == kod;
    });
    cart.push(produkt);
    localStorage.setItem("cart", JSON.stringify(cart));
}

let articles = document.querySelectorAll('.sell');


articles.forEach(function(article) {
    article.addEventListener('click', function() {
        
        let kod = article.dataset.kod;
        pridatDoKosiku(kod);
    });
});

