// Initialize global values
let previousSearchValue = '';
let pages = 0;
let currentPage = 0;

// disable Next/Prev buttons until a search has been performed
document.getElementById("nextButton").disabled = true;
document.getElementById("prevButton").disabled = true;

function search() { 
  // get search value
  var searchValue = document.getElementById("searchBy").value;

  // reset Prev/Next buttons and currentPage number if a different search term was entered
  if(previousSearchValue !== searchValue) { resetSearch(); }
  previousSearchValue = searchValue;

  // reset table
  var table = document.getElementById("jokesGoHere");
  table.replaceChildren();

  // get list of jokes
  getJokes(searchValue, currentPage)
}

function getJokes(searchValue, pageNumber = 0) {
  // build url
  let url = 'https://icanhazdadjoke.com/search';
  if(searchValue != "") { url += `?term=${searchValue}&limit=10` };
  if(pageNumber > 0) {
      url += (searchValue === "") ? "?" : "&";
      url += `page=${pageNumber}&limit=10`
  }

  // get jokes
  fetch(url, {headers: {'Accept': 'application/json'}})
    .then((response) => {
      return response.json();
    })
    .then(jokesResponse => {
      // set page limits - this will determine how Next/Prev buttons work
      pages = jokesResponse.total_pages;
      currentPage = jokesResponse.current_page;

      var h4 = document.getElementById("countGoesHere");
      h4.innerText = `Total number of jokes found: ${jokesResponse.total_jokes}`;
  
      // disable Next or Prev button depending on current limits
      document.getElementById("nextButton").disabled = (currentPage === pages);
      document.getElementById("prevButton").disabled = (currentPage === 1);

      displayJokes(jokesResponse);
    })
}

function displayJokes(jokesResults) {
  // loop through the search results and get the "joke" property and add it to a table
  jokesResults.results.map(jokesResult => {
    var table = document.getElementById("jokesGoHere");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.classList.add("row");
    td.innerText = jokesResult.joke;
    tr.appendChild(td);
    table.appendChild(tr);
  });
}

function resetSearch() {
  // reset global values to program's inital state
  currentPage = 0;
  pages = 0;
  document.getElementById("nextButton").disabled = true;
  document.getElementById("prevButton").disabled = true;
}

function nextClick() {
  currentPage+=1;
  search();
}

function prevClick() {
  currentPage-=1;
  search();
}

const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", search);

const nextButton = document.querySelector("#nextButton");
nextButton.addEventListener("click", nextClick);

const prevButton = document.querySelector("#prevButton");
prevButton.addEventListener("click", prevClick);
