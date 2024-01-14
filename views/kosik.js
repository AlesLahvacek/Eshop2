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
                // aktualizujte košík na stránce
            }
        });
    });
});