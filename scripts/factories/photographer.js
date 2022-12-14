function photographerFactory(data) {
    const { name, id, portrait, country, city, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' )
        article.setAttribute('class', 'photographer-card')

        const link = document.createElement('a')
        link.setAttribute('class', 'photographer-card__link')
        link.setAttribute('href', `photographer.html?id=${id}`)
      

        const img = document.createElement('img')
        img.setAttribute('src', picture)

        const imgContainer = document.createElement('div')
        imgContainer.setAttribute('class', 'photographer-card__img')
        imgContainer.appendChild(img)

        const h2 = document.createElement( 'h2')
        h2.setAttribute('class', 'photographer-card__name')
        h2.textContent = name;

        const location = document.createElement('p')
        location.setAttribute('class', 'photographer-card__location')
        location.textContent = country + ', ' + city

        const tagLineEl = document.createElement('p')
        tagLineEl.setAttribute('class', 'photographer-card__tagline')
        tagLineEl.textContent = tagline

        const priceEl = document.createElement('p')
        priceEl.setAttribute('class', 'photographer-card__price')
        priceEl.textContent = price + '€/jour'

        link.append(imgContainer, h2, location, tagLineEl, priceEl);
        article.appendChild(link)
        return (article);
    }
    return { getUserCardDOM } 
}