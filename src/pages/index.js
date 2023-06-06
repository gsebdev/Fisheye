import { PhotographerFactory } from '../factories/PhotographerFactory'
import getPhotographers from '../api/api'

async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  // affiche la card de chaque photographe en faisant appel à la factory Photographer
  photographers.forEach((photographer) => {
    const photographerFactory = new PhotographerFactory(photographer)
    photographersSection.appendChild(photographerFactory.getDOM())
  })
};

async function init () {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
};

init()
