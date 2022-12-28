export default async function getPhotographers (id = null) {
  return fetch('../../data/photographers.json')
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then(data => {
      // si un id a été fourni, récupération des médias du photographe et un nouvel objet photographe contenant aussi les medias est retourné, sinon pas de mise en forme des données
      if (id) {
        const photographerData = data.photographers.find(photographer => photographer.id === parseInt(id))
        photographerData.medias = data.media.filter(media => media.photographerId === parseInt(id))
        return photographerData
      } else {
        return data
      }
    })
    .catch(error => console.log('erreur de récupération des données ', error))
}
