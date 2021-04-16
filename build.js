/* ========= Creates elements of the HTML page ========= */
console.log('created selector components');

const styles = document.createElement('link');
styles.setAttribute('rel', 'stylesheet');
styles.setAttribute('href', './database.css');
document.head.appendChild(styles);

/**
 * Create "filter" items
 */
const countryFilter = document.createElement('p');
countryFilter.setAttribute('class', 'filter-selector');
countryFilter.innerHTML = 'Countries';
const cityFilter = document.createElement('p');
cityFilter.setAttribute('class', 'filter-selector');
cityFilter.innerHTML = 'Cities';
const allFilter = document.createElement('p');
allFilter.setAttribute('class', 'filter-selector');
allFilter.innerHTML = 'All';

const filterContainer = document.getElementById('filter-container');
filterContainer.appendChild(countryFilter);
filterContainer.appendChild(cityFilter);
filterContainer.appendChild(allFilter);

/**
 * Create search bar
 */
const searchBar = document.createElement('input');
searchBar.setAttribute('id', 'search-bar');
searchBar.setAttribute('type', 'text');
searchBar.setAttribute('placeholder', 'Search for a country or city');

const searchContainer = document.getElementById('search-container');
searchContainer.appendChild(searchBar);