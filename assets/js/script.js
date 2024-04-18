$(document).ready(function () {
    $('#superhero-form').submit(function (event) {
        event.preventDefault(); // Evita que se envíe el formulario

        let heroNumber = $('#inputHero').val(); // Captura el valor ingresado en el campo de texto

        // Utiliza parseInt() para parsear el valor a un entero
        let heroId = parseInt(heroNumber);

        // Comprobar si el valor ingresado es un número válido (entero)
        if (isNaN(heroId)) {
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
                renderHeroChart(data);
            },
            error: function (xhr, status, error) {
                console.error("Error al consultar la API:", error);
            }
        });
    });
});


function renderHeroCard(heroData) {
    let cardHtml = `
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
                    <li class="list-group-item">Altura: ${heroData.appearance.height[0]} - ${heroData.appearance.height[1]}</li>
                    <li class="list-group-item">Peso: ${heroData.appearance.weight[0]} - ${heroData.appearance.weight[1]}</li>
                    <li class="list-group-item">Alianzas: ${heroData.biography.aliases}</li>
                </ul>
            </div>
        </div>
    `;

    $('#hero-cards').html(cardHtml);
};

function renderHeroChart(heroData) {
    let options = {
        title: {
            text: "Estadísticas de poder para " + heroData.name
        },
        data: [{
            type: "pie",
            startAngle: 45,
            showInLegend: true,
            legendText: "{label}",
            indexLabel: "{label} ({y})",
            yValueFormatString: "#,##0.#",
            dataPoints: [
                { label: "Durabilidad", y: parseFloat(heroData.powerstats.durability) },
                { label: "Fuerza", y: parseFloat(heroData.powerstats.strength) },
                { label: "Velocidad", y: parseFloat(heroData.powerstats.speed) },
                { label: "Inteligencia", y: parseFloat(heroData.powerstats.intelligence) },
                { label: "Poder", y: parseFloat(heroData.powerstats.power) },
                { label: "Combate", y: parseFloat(heroData.powerstats.combat) }
            ]
        }]
    };

    $("#chartContainer").CanvasJSChart(options);
}