/* eslint-disable no-plusplus */
// eslint-disable-next-line import/extensions
import './build.js';

const resultsContainer = document.getElementById('results-container');
const searchBar = document.getElementById('search-bar');

const arrLocations = []; // list of all city/country pairs

/**
 * Find a city or country that matches the search bar input
 * (case insensitive)
 * @param {String} userInput search bar text input
 * @returns array of city/country pairs that match input
 */
function findMatches(userInput) {
  const inputIS = userInput.toUpperCase();
  const arrMatches = [];

  for (let i = 0; i < arrLocations.length; i++) {
    const cityIS = ((arrLocations[i]).city).toUpperCase();
    const countryIS = ((arrLocations[i]).country).toUpperCase();

    // check if user input matches a city or country
    if (cityIS === inputIS || countryIS === inputIS) {
      arrMatches.push(arrLocations[i]);
    }
  }
  return arrMatches;
}

/**
 * Remove all children nodes appended to this container
 * @param {HTML div} parent div container with children
 */
function removeAllChildren(parent) {
  while (parent.firstChild) {
    // console.log(`removing ${parent.firstChild.textContent}`);
    parent.removeChild(parent.firstChild);
  }
}

/**
 * Creates a new paragraph element for each object in array and
 * appends to the results container
 * @param {Array} arr city/country objects
 */
function populateDatabase(arr) {
  // clear previous results
  removeAllChildren(resultsContainer);

  // add results to database on page
  for (let i = 0; i < arr.length; i++) {
    const location = document.createElement('p');
    location.setAttribute('class', 'result');
    location.innerHTML = `${arr[i].city}, ${arr[i].country}`;
    const visits = document.createElement('p');
    visits.setAttribute('class', 'visits');
    visits.innerHTML = (arr[i].visits < 2) ? `${arr[i].visits} Visit` : `${arr[i].visits} Visits`;
    location.appendChild(visits);
    resultsContainer.appendChild(location);
  }
}

/**
 * Check for enter key clicked on search bar to call
 * function to find a match to input and update results
 */
searchBar.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    console.log('hit enter');

    // check if user gave input (nonempty)
    if (searchBar.value !== '') {
      const arrM = findMatches(searchBar.value);
      console.log(`got ${arrM.length} matches`);
      if (arrM === undefined || arrM.length === 0) {
        // got input but no matches
        populateDatabase(arrLocations);
      } else {
        // got input AND match(es)
        populateDatabase(arrM);
      }
    } else {
      // got invalid or empty input
      console.log('empty user input');
      populateDatabase(arrLocations);
    }
  }
});

/**
 * Populate data when page loads
 */
window.addEventListener('load', () => {
  console.log('fetching');
  fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const loc = {};
        loc.city = data[i].City;
        loc.country = data[i].Country;
        loc.visits = data[i].Visits;
        arrLocations.push(loc);
      }
    });
});
