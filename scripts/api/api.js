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
