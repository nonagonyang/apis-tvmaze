/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */

async function searchShows(query) { 
  const shows=[];
  const response=await axios.get("http://api.tvmaze.com/search/shows?",{
    params: {q:query}})
  // console.log(response.data)
  // console.log(response.data[0].show)
  // console.log(response.data[0].show.id)
  // console.log(response.data[0].show.name)
  // console.log(response.data[0].show.summary)
  // console.log(response.data[0].show.image.medium)

  for(entry of response.data){
    if(entry.show.image!==null){
      selectedInfo={
        id:entry.show.id,
        name:entry.show.name,
        summary:entry.show.summary,
        image:entry.show.image.medium,
      }
    }
    else{
      selectedInfo={
        id:entry.show.id,
        name:entry.show.name,
        summary:entry.show.summary,
        image:"https://tinyurl.com/tv-missing"
      }
    
    }
  shows.push(selectedInfo)
  }
  return shows
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <img class="card-img-top" src="${show.image}">
             <p class="card-text">${show.summary}</p>
             <button data-show-id="${show.id}" class="episodesBnt">Episodes</button>
           </div>
         </div>
       </div>
      `);
    

    // Add an “Episodes” button at the bottom of each show card
    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  // $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


// Given a show ID, return list of episodes:
// in the form of { id, name, season, number }
const episodeInfoList=[];
async function getEpisodes(id) {
  const episodeInfoList=[];
  const response=await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  const episodes=response.data
  // console.log(episodes)
  for(episode of episodes){
    selectedInfo={
      id:episode.id,
      name:episode.name,
      season:episode.season,
      number:episode.number,
    }    
    // console.log(selectedInfo)
    episodeInfoList.push(selectedInfo)
  }
  return episodeInfoListe 
}


// write a function, populateEpisodes, 
// which is provided an array of episodes info, 
// and populates that into the #episodes-list part of the DOM.
// The episodes list is a simple <ul>, 
// and the individual episodes can just be basic <li> elements, 
// like <li>Pilot (season 1, number 1)</li>.

function polulateEpisodes(episodes){
  let $episodeList=$("#episodes-list")
  for(let e of episodes){
    let $e = $("<li>'e.name(e.season, e.number)'</li>")
    episodeList.append($e)
  }
}


//Add a click handler that listens for clicks on Episodes buttons.
//You’ll need to make sure this eventlistener works 
//even though the shows won’t be present in the initial DOM
//You’ll need to get the show ID of the show for the button you clicked. 
//To do this, you can read about getting data attributes with jQuery 
//and also how to use jQuery to find something a few levels up in the DOM
//Then, this should use your getEpisodes and populateEpisodes functions.

$("#showlist").on("click", ".episodesBnt",async function handleSearch (evt) {
  console.log("you clicked the button")
  let id=evt.target.dataset.show-id
  let episodes = await getEpisodes(id);
  populateEpisodes(episodes); 
})