/* ========= Creates elements of the HTML page ========= */
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

const resultsContainer = document.getElementById('results-container');

/* ========= Populates and searches database ========= */

const loc = {
  city: 'no city',
  country: 'no country'
};

let arrLocs = [];
let arrResults = [];
const locStor = window.localStorage;

/**
 * Populate data when page loads
 */
window.addEventListener('DOMContentLoaded', () => {
  console.log('fetching');
  fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    locStor.setItem('yeet', 'hello');

    for (let i in data) {
      const loc = new Object();
      loc.city = data[i].City;
      loc.country = data[i].Country;
      arrLocs.push(loc);
    }
  });
  console.log('size of results arr ' + arrResults.length);
  setResults();
});


/**
 * Check for enter key clicked on search bar to call
 * function to find a match to input and update results
 */
searchBar.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    console.log('hit enter');

    arrResults.length = 0;      // clear results first

    /* check if user gave input (nonempty) */
    if (searchBar.value != "") {
      verifyLoc(searchBar.value);
    } else {
      console.log('empty');
    }
    setResults();
  }
});

/**
 * Try to find a city or country that matches the search bar
 * input as case insensitive
 * @param {String} userInput search bar text input
 */
function verifyLoc(userInput) {
  for (let i in arrLocs) {
    // match city or country name
    if ((arrLocs[i].city).toUpperCase() == userInput.toUpperCase() || 
        (arrLocs[i].country).toUpperCase() == userInput.toUpperCase()) {
      arrResults.push(arrLocs[i]);
    }
  }
};

function setResults() {
  // clear previous results
  removeAllChildren(resultsContainer);

  // no user input/anything searched for so use default
  if (arrResults === undefined || arrResults.length == 0) {
    setSingleLoc(arrLocs);
  // only show searched results
  } else {
    console.log('size of results is ' + arrResults.length);
    setSingleLoc(arrResults);
  }
}

/**
 * Remove all children nodes appended to this container
 * @param {HTML div} parent div container with children
 */
function removeAllChildren(parent) {
  while (parent.firstChild) {
    console.log('removing ' + parent.firstChild.textContent);
    parent.removeChild(parent.firstChild);
  }
}

/**
 * Creates a new paragraph element for each object in array and
 * appends to the results container
 * @param {Array} arr city/country objects
 */
function setSingleLoc(arr) {
  for (let i in arr) {
    console.log('adding ' + arr[i].city);
    const singleLoc = document.createElement('p');
    singleLoc.setAttribute('class', 'result');
    singleLoc.innerHTML = arr[i].city + ', ' + arr[i].country;
    resultsContainer.appendChild(singleLoc);
  }
}


