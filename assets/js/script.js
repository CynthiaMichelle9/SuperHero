$(document).ready(function () {
    $('#superhero-form').submit(function (event) {
        event.preventDefault(); // Evita que se envíe el formulario

        var heroNumber = $('#inputHero').val(); // Captura el valor ingresado en el campo de texto
        // Comprobar si el valor ingresado es un número
        if (isNaN(heroNumber)) {
            alert("Por favor, ingrese solo números.");
            return; // Detener el proceso si no es un número
        }

        // Realizar la consulta a la API mediante AJAX
        $.ajax({
            url: "https://www.superheroapi.com/api.php/4905856019427443/" + heroNumber,
            method: "GET",
            success: function (data) {
                console.log("Información del Superhéroe:", data);

                // Renderizar la información recibida dinámicamente (paso 5)
                renderHeroCard(data);
            },
            error: function (xhr, status, error) {
                console.error("Error al consultar la API:", error);
            }
        });
    });
});


function renderHeroCard(heroData) {
    var cardHtml = `
        <div class="card border-danger">
            <div class="card-header">SuperHero Encontrado</div>
            <div class="card-body d-flex">
                <img src="${heroData.image.url}" class="superhero-image mr-3" alt="Imagen del Superhéroe">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Nombre: ${heroData.name}</li>
                    <li class="list-group-item">Conexiones: ${heroData.connections['group-affiliation']}</li>
                    <li class="list-group-item">Publicado por: ${heroData.biography.publisher}</li>
                    <li class="list-group-item">Ocupación: ${heroData.work.occupation}</li>
                    <li class="list-group-item">Primera aparición: ${heroData.biography['first-appearance']}</li>
                    <li class="list-group-item">Altura: ${heroData.appearance.height[1]}</li>
                    <li class="list-group-item">Peso: ${heroData.appearance.weight[1]}</li>
                    <li class="list-group-item">Alianzas: ${heroData.biography.aliases}</li>
                </ul>
            </div>
        </div>
    `;

    $('#hero-cards').html(cardHtml);
};

