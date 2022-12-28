/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/api/api.js":
/*!****************************!*\
  !*** ./scripts/api/api.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ getPhotographers; }\n/* harmony export */ });\nasync function getPhotographers (id = null) {\r\n  return fetch('../../data/photographers.json')\r\n    .then(res => {\r\n      if (res.ok) {\r\n        return res.json()\r\n      } else {\r\n        throw new Error(res.status)\r\n      }\r\n    })\r\n    .then(data => {\r\n      // si un id a été fourni, récupération des médias du photographe et un nouvel objet photographe contenant aussi les medias est retourné, sinon pas de mise en forme des données\r\n      if (id) {\r\n        const photographerData = data.photographers.find(photographer => photographer.id === parseInt(id))\r\n        photographerData.medias = data.media.filter(media => media.photographerId === parseInt(id))\r\n        return photographerData\r\n      } else {\r\n        return data\r\n      }\r\n    })\r\n    .catch(error => console.log('erreur de récupération des données ', error))\r\n}\r\n\n\n//# sourceURL=webpack://front-end-fisheye/./scripts/api/api.js?");

/***/ }),

/***/ "./scripts/factories/PhotographerFactory.js":
/*!**************************************************!*\
  !*** ./scripts/factories/PhotographerFactory.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PhotographerFactory\": function() { return /* binding */ PhotographerFactory; }\n/* harmony export */ });\nclass PhotographerFactory {\r\n  /**\r\n     *\r\n     * @param {Object} data\r\n     */\r\n  constructor (data) {\r\n    // si l'objet 'data' contient des médias cela veut dire que la page photographe.html est active, autrement c'est la page index.html (cf: api.js)\r\n    if (data.medias) {\r\n      return new SinglePhotographerModel(data)\r\n    } else {\r\n      return new MultiPhotographersModel(data)\r\n    }\r\n  }\r\n}\r\n\r\nclass PhotographerModel {\r\n  /**\r\n     *\r\n     * @param {Object} data\r\n     */\r\n  constructor (data) {\r\n    this._id = data.id\r\n    this._name = data.name\r\n    this._city = data.city\r\n    this._country = data.country\r\n    this._tagline = data.tagline\r\n    this._price = data.price\r\n    this._portrait = data.portrait\r\n    this._picture = `assets/photographers/thumbnails/${this._portrait}`\r\n  }\r\n\r\n  get id () {\r\n    return this._id\r\n  }\r\n\r\n  get name () {\r\n    return this._name\r\n  }\r\n\r\n  get city () {\r\n    return this._city\r\n  }\r\n\r\n  get country () {\r\n    return this._country\r\n  }\r\n\r\n  get tagline () {\r\n    return this._tagline\r\n  }\r\n\r\n  get price () {\r\n    return this._price\r\n  }\r\n\r\n  get portrait () {\r\n    return this._portrait\r\n  }\r\n\r\n  get picture () {\r\n    return this._picture\r\n  }\r\n}\r\n\r\nclass MultiPhotographersModel extends PhotographerModel {\r\n  getDOM () {\r\n    const article = document.createElement('article')\r\n    article.className = 'photographer-card'\r\n    article.id = this._id\r\n\r\n    const link = document.createElement('a')\r\n    link.className = 'photographer-card__link'\r\n    link.href = `photographer.html?id=${this._id}`\r\n    link.setAttribute('aria-labelledby', this._id + '-name')\r\n    link.setAttribute('aria-describedby', this._id + '-description')\r\n\r\n    const img = document.createElement('img')\r\n    img.src = this._picture\r\n    img.className = 'photograph-portrait'\r\n    img.setAttribute('alt', '')\r\n\r\n    const h2 = document.createElement('h2')\r\n    h2.className = 'photographer-card__name'\r\n    h2.textContent = this._name\r\n    h2.id = this._id + '-name'\r\n\r\n    link.append(img, h2)\r\n\r\n    const paragraphContainer = document.createElement('p')\r\n    paragraphContainer.className = 'photographer-card__text-container'\r\n    paragraphContainer.id = this._id + '-description'\r\n\r\n    const location = document.createElement('span')\r\n    location.className = 'photographer-card__location'\r\n    location.textContent = this._country + ', ' + this._city\r\n\r\n    const tagLineEl = document.createElement('span')\r\n    tagLineEl.className = 'photographer-card__tagline'\r\n    tagLineEl.textContent = this._tagline\r\n\r\n    const priceEl = document.createElement('span')\r\n    priceEl.className = 'photographer-card__price'\r\n    priceEl.textContent = this._price + '€/jour'\r\n\r\n    paragraphContainer.append(location, tagLineEl, priceEl)\r\n\r\n    article.append(link, paragraphContainer)\r\n\r\n    return (article)\r\n  }\r\n}\r\n\r\nclass SinglePhotographerModel extends PhotographerModel {\r\n  constructor (data) {\r\n    super(data)\r\n    this._medias = data.medias\r\n  }\r\n\r\n  get medias () {\r\n    return this._medias ? this._medias : []\r\n  }\r\n\r\n  get likes () {\r\n    return this._medias.reduce((likes, media) => likes + media.likes, 0)\r\n  }\r\n\r\n  set medias (medias) {\r\n    this._medias = medias\r\n  }\r\n\r\n  getDOM () {\r\n    const section = document.createElement('section')\r\n    section.className = 'photograph-header'\r\n\r\n    const textContainer = document.createElement('div')\r\n    textContainer.className = 'photograph-header__text-container'\r\n\r\n    const title = document.createElement('h1')\r\n    title.textContent = this._name\r\n\r\n    const tagline = document.createElement('span')\r\n    tagline.className = 'photograph-header__tagline'\r\n    tagline.textContent = this._tagline\r\n\r\n    const location = document.createElement('span')\r\n    location.className = 'photograph-header__location'\r\n    location.textContent = this._city + ', ' + this._country\r\n\r\n    const p = document.createElement('p')\r\n    p.append(location, tagline)\r\n    textContainer.append(title, p)\r\n\r\n    const button = document.createElement('button')\r\n    button.className = 'btn'\r\n    button.setAttribute('data-target', 'contact_modal')\r\n    button.setAttribute('aria-label', 'Contactez-moi')\r\n    button.textContent = 'Contactez-moi'\r\n\r\n    const portrait = document.createElement('img')\r\n    portrait.className = 'photograph-portrait'\r\n    portrait.src = this._picture\r\n    portrait.alt = this._name\r\n\r\n    const price = document.createElement('span')\r\n    price.className = 'photograph-header__price'\r\n    price.textContent = this._price + '€ / jour'\r\n\r\n    const likes = document.createElement('span')\r\n    likes.className = 'photograph-header__likes'\r\n    likes.textContent = this.likes\r\n    const heart = document.createElement('i')\r\n    heart.className = 'heart-icon'\r\n    heart.title = 'likes'\r\n    likes.appendChild(heart)\r\n\r\n    const headerFixed = document.createElement('p')\r\n    headerFixed.className = 'photograph-header__container-fixed'\r\n    headerFixed.append(likes, price)\r\n\r\n    section.append(textContainer, button, portrait, headerFixed)\r\n\r\n    return section\r\n  }\r\n\r\n  // methode permettant de mettre à jour le total des likes du photographe (utile lorsque un like sur un média est détecté)\r\n  updateLikes () {\r\n    const likes = document.querySelector('.photograph-header__likes')\r\n    likes.childNodes[0].textContent = this.likes\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://front-end-fisheye/./scripts/factories/PhotographerFactory.js?");

/***/ }),

/***/ "./scripts/pages/index.js":
/*!********************************!*\
  !*** ./scripts/pages/index.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _factories_PhotographerFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/PhotographerFactory */ \"./scripts/factories/PhotographerFactory.js\");\n/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/api */ \"./scripts/api/api.js\");\n\r\n\r\n\r\nasync function displayData (photographers) {\r\n  const photographersSection = document.querySelector('.photographer_section')\r\n\r\n  // affiche la card de chaque photographe en faisant appel à la factory Photographer\r\n  photographers.forEach((photographer) => {\r\n    const photographerFactory = new _factories_PhotographerFactory__WEBPACK_IMPORTED_MODULE_0__.PhotographerFactory(photographer)\r\n    photographersSection.appendChild(photographerFactory.getDOM())\r\n  })\r\n};\r\n\r\nasync function init () {\r\n  // Récupère les datas des photographes\r\n  const { photographers } = await (0,_api_api__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()\r\n  displayData(photographers)\r\n};\r\n\r\ninit()\r\n\n\n//# sourceURL=webpack://front-end-fisheye/./scripts/pages/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/pages/index.js");
/******/ 	
/******/ })()
;