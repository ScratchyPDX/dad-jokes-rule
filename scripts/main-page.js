
function getRandomJoke() {
  console.log('getRandomJoke');
  // build url
  let url = 'https://icanhazdadjoke.com';
  // get joke
  fetch(url, {headers: {'Accept': 'text/plain'}})
    .then((response) => {
      return response.text();
    })
    .then(jokesResponse => { 
      var paragraph = document.getElementById("randomJokeGoHere");
      paragraph.innerText = jokesResponse;
    })
}

document.addEventListener("DOMContentLoaded", function() {
  getRandomJoke();
});