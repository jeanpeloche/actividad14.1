document.addEventListener("DOMContentLoaded", function() {

    const searchInput = document.getElementById("inputBuscar");
    const searchButton = document.getElementById("btnBuscar");
    const resultsContainer = document.getElementById("contenedor");

    searchButton.addEventListener("click", function() {
        const query = searchInput.value.trim();

        if (query !== '') {
            fetch(`https://images-api.nasa.gov/search?q=${query}`)
                .then(response => response.json())
                .then(data => {
                    const items = data.collection.items;

                    resultsContainer.innerHTML = '<div class="row"></div>';

                    const row = resultsContainer.querySelector('.row');

                    items.forEach(element => {
                        if (element.links && element.links[0].href) {
                            const cardTemplate = `
                                <div class="col-md-4 col-sm-6">
                                    <div class="card mb-4" style="width: 100%;">
                                        <img src="${element.links[0].href}" class="card-img-top" alt="${element.data[0].title}">
                                        <div class="card-body">
                                            <h5 class="card-title">${element.data[0].title}</h5>
                                            <p class="card-text">${element.data[0].description || 'Descripción no disponible'}</p>
                                        </div>
                                    </div>
                                </div>
                            `;
                            row.innerHTML += cardTemplate;
                        }
                    });
                })
                .catch(error => {
                    console.error('Error al obtener los datos:', error);
                    resultsContainer.innerHTML = '<p>Ocurrió un problema con la búsqueda. Por favor, intenta de nuevo.</p>';
                });
        }
    });
});