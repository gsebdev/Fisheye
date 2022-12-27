async function getPhotographers(id = null) {
    return fetch('../../data/photographers.json')
        .then(res => {
            if(res.ok) {
                return res.json()
            }else {
                throw new Error(res.status )
            }})
        .then(data => {
                if(id) {
                    let photographerData = data.photographers.find(photographer => photographer.id == id)
                    
                    photographerData.medias = data.media.filter(media => media.photographerId == id)
                    
                    return photographerData
                }else {
                    return data
                }

    
            })
        .catch(error => console.log('erreur de récupération des données ', error))
}
