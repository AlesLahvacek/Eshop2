document.querySelectorAll('.pridat-do-kosiku').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        
        let id = this.dataset.id;
        
        fetch('/pridat-do-kosiku', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                
            }
        });
    });
});

if (new URLSearchParams(window.location.search).has('error')) {
    alert('Došlo k chybě při zpracování objednávky.');
}
if (new URLSearchParams(window.location.search).has('send')) {
    alert('Objednávka bylo úspěšně odeslána');
}
if (new URLSearchParams(window.location.search).has('empty')) {
    alert('Košík je prázdný, objednávka zrušena');
}