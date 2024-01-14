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



let tlacitko = document.getElementById("vymazat");
let kontejner = document.getElementById('kontejner');


cart.forEach(function(produkt, index) {
    let article = document.createElement('article');
    article.className = 'sell';

    let img = document.createElement('img');
    img.className = 'img2';
    img.src = produkt.img;
    article.appendChild(img);

    let h3 = document.createElement('h3');
    h3.id = 'polozka' + (index + 1);
    h3.textContent = produkt.jmeno;
    article.appendChild(h3);

    let div = document.createElement('div');

    let a = document.createElement('a');
    a.id = 'cena' + (index + 1);
    a.className = 'cena';
    a.textContent = produkt.cena;
    div.appendChild(a);

    article.appendChild(div);
    kontejner.appendChild(article); 

    
});

let vymazatButton = document.getElementById('vymazat');


vymazatButton.addEventListener('click', function() {
    
    localStorage.removeItem('cart');
    location.reload();
});