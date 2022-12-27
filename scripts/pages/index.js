    
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerFactory = new PhotographerFactory(photographer);
            photographersSection.appendChild(photographerFactory.getDOM());
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers()
        displayData(photographers)
    };
    
    init();
    
