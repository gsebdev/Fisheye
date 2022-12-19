    async function getPhotographers() {
        return fetch('../../data/photographers.json')
            .then(res => {
                if(res.ok) {
                    return res.json()}
                else {
                    throw new Error(res.status )
                }})
            .catch(error => console.log('erreur de récupération des données ', error))
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = new PhotographerModel(photographer);
            photographersSection.appendChild(photographerModel.getPhotographerCard());
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers()
        displayData(photographers)
    };
    
    init();
    
