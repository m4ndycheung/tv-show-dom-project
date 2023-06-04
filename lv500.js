function setup() {
  // getALlEpisodesFromAPI() is an async function
  // so it will produce a Promise
  // Once it has fetched the data, then it will pass that data to makePageForEpisodes
  //   let initialURL = "https://api.tvmaze.com/shows/82/episodes";

  //   const allEpisodes =
  //     getAllEpisodesFromAPI(initialURL).then(makePageForEpisodes);

  makePageForShows();
}

async function getAllEpisodesFromAPI(url) {
  let episodesStorage;

  const response = await fetch(url);
  episodesStorage = response.json();
  return episodesStorage;
}

// Make page for Shows
// Need createShowCards using the shows.js?
// use shows drop down menu
// use the search bar code

// function makePageForEpisodes(episodeList) {
//   createHeader();
//   createShowsDropDownMenu();
//   loadNewShow();
//   createDropDownMenu(episodeList);
//   useDropdownToJumpToEpisode(episodeList);
//   createSearchbar();
//   createEpisodeCounter(episodeList);
//   createEpisodeCards(episodeList);
//   createFooter();
// }

function makePageForShows() {
  createShowCards();
}

// *********************************
function createShowCards() {
  let showsList = getAllShows();
  const rootElem = document.getElementById("root");
  // this div holds all the show cards
  let showCardContainer = document.createElement("div");

  // MAKE EPISODE CARDS
  // loop to do stuff to each episode in the array object
  for (const show of showsList) {
    // 1. create some elements (divs, h3, img, p)
    // 2. assign content to those elements
    // 3. assign some classes to elements -- I might do this at the end (styling last)
    // 4. remember to append child elements to parents

    // div that contains all episode data
    let showCard = document.createElement("div");
    ////////////////// Assign episodeCards an ID
    showCard.id = "S" + show.id;

    // EPISODE SUMMARY TEXT
    let showDetailsBox = document.createElement("div");
    let showPElement = document.createElement("p");
    showPElement.innerHTML = `${show.summary}`;

    // HEADER
    let showHeaderElement = document.createElement("h3");
    const showName = show.name;
    showHeaderElement.innerText = `${showName}`;

    // IMAGES
    let showImgBox = document.createElement("div");
    let showImgElement = document.createElement("img");

    // one of the shows has a null value for show.image.medium
    if (show.image === null) {
      showImgElement.src = ``;
    } else {
      showImgElement.src = `${show.image.medium}`;
    }
    showImgElement.alt = "alt text";
    showImgBox.append(showImgElement);

    // need to make the genre and time box too...*****
    let extraInfoBox = document.createElement("div");
    let showRating = document.createElement("p");
    showRating.innerText = `Rating: ${show.rating.average}`;
    let showGenre = document.createElement("p");
    showGenre.innerText = `Genre(s): ${show.genres}`;
    let showStatus = document.createElement("p");
    showStatus.innerText = `Status: ${show.status}`;
    let showRuntime = document.createElement("p");
    showRuntime.innerText = `Runtime: ${show.runtime}`;

    extraInfoBox.append(showRating, showGenre, showStatus, showRuntime);

    // append show image, p, details to showDetailsBox
    showDetailsBox.append(showImgBox, showPElement, extraInfoBox);

    // append episode cards to container div with id root
    showCardContainer.append(showCard);

    // append created elements to episodeCard
    showCard.append(showHeaderElement, showDetailsBox);

    // ADD CLASSES
    // episodeCard.classList.add("episode-card");
    // episodeImgElement.classList.add("episode-image");
    // episodeTitleElement.classList.add("episode-title");
    // episodePElement.classList.add("episode-summary-text");
    // episodeSummaryBox.classList.add("episode-summary-section");
  }

  // add a class to the root element to get some grid going
  rootElem.append(showCardContainer);
}

function createHeader() {
  const rootElem = document.getElementById("root");
  let pageHeaderElement = document.createElement("div");
  pageHeaderElement.id = "page-header";
  rootElem.append(pageHeaderElement);
}

function createShowsDropDownMenu() {
  let dropDownMenuElement = document.createElement("select");
  dropDownMenuElement.id = "show-select";
  let defaultOption = document.createElement("option");
  defaultOption.innerText = "Select Show";
  dropDownMenuElement.append(defaultOption);

  let allShows = getAllShows();

  // according to a codebar mentor: good example of where to use a ternirary
  allShows.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    } else {
      return 1;
    }
  });

  for (const show of allShows) {
    let dropDownOption = document.createElement("option");
    //////////// Assign dropdown option values
    dropDownOption.value = show.id;

    dropDownOption.innerText = `${show.name}`;
    dropDownMenuElement.append(dropDownOption);
  }

  let header = document.getElementById("page-header");
  header.append(dropDownMenuElement);
}

function loadNewShow() {
  let showDropDownMenu = document.getElementById("show-select");
  let showDropDownChoice = showDropDownMenu.value;

  showDropDownMenu.addEventListener("change", populateNewEpisodes);

  function populateNewEpisodes() {
    showDropDownChoice = showDropDownMenu.value;
    let showURL = `https://api.tvmaze.com/shows/${showDropDownChoice}/episodes`;

    // before making cards for new show, clear html
    document.querySelector("#root").innerHTML = "";
    getAllEpisodesFromAPI(showURL).then(makePageForEpisodes);
  }
}

function createDropDownMenu(episodeList) {
  // make a dropdown menu
  // for loop on episode list to populate options in dropdown

  let dropDownMenuElement = document.createElement("select");
  dropDownMenuElement.id = "episode-select";
  let defaultOption = document.createElement("option");
  defaultOption.innerText = "Select Episode";
  dropDownMenuElement.append(defaultOption);

  for (const episode of episodeList) {
    let dropDownOption = document.createElement("option");
    //////////// Assign dropdown option values
    dropDownOption.value = "EP" + episode.id;

    // more padstart stuff -- let's put this in a function later
    const paddedSeasonNumber = episode.season.toString().padStart(2, "0");
    const paddedEpisodeNumber = episode.number.toString().padStart(2, "0");
    const episodeName = episode.name;

    dropDownOption.innerText = `S${paddedSeasonNumber}E${paddedEpisodeNumber} - ${episodeName}`;
    dropDownMenuElement.append(dropDownOption);
  }

  let header = document.getElementById("page-header");
  header.append(dropDownMenuElement);
}

function useDropdownToJumpToEpisode(episodeList) {
  let episodeDropDownMenu = document.getElementById("episode-select");
  let episodeDropDownChoice = episodeDropDownMenu.value;

  episodeDropDownMenu.addEventListener("change", jumpToEpisode);

  function jumpToEpisode() {
    for (const episode of episodeList) {
      // get the select choice
      episodeDropDownChoice = episodeDropDownMenu.value;
      let selectedEpisodeCard = document.getElementById("EP" + episode.id);

      if (episodeDropDownChoice === selectedEpisodeCard.id) {
        // assign each card container a unique id
        // find the corresponding card
        // then scroll episode card into view
        selectedEpisodeCard.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
}

function createSearchbar() {
  const rootElem = document.getElementById("root");
  let pageHeader = document.getElementById("page-header");

  // create input field
  let searchInputElement = document.createElement("input");
  searchInputElement.id = "search-field";
  searchInputElement.type = "text";
  searchInputElement.placeholder = "Search for episode name";

  // event listener for search bar
  searchInputElement.addEventListener("input", updateEpisodeResultsAndCounter);

  // event listener callback function
  function updateEpisodeResultsAndCounter() {
    let allEpisodeCards = document.querySelectorAll(".episode-card");
    let inputText = searchInputElement.value.toLowerCase();
    let episodeCount = 0;

    for (const card of allEpisodeCards) {
      // select the title and summary text inside episode card divs
      let titleText = card
        .querySelector(".episode-title")
        .textContent.toLowerCase();
      let summaryText = card
        .querySelector(".episode-summary-text")
        .textContent.toLowerCase();

      // use selected title and summary to compare with inputText
      if (titleText.includes(inputText) || summaryText.includes(inputText)) {
        card.classList.remove("hide-card");
        episodeCount++;
      } else {
        card.classList.add("hide-card");
      }
    }
    // Select span holding episode count
    let episodeCounterSpan = document.getElementById("total-search-results");
    // reassign to episodeCount
    episodeCounterSpan.innerHTML = episodeCount;
  }

  // append searchInputElement to header div
  pageHeader.append(searchInputElement);
}

function createEpisodeCounter(episodeList) {
  // selecting the page header by id
  let pageHeader = document.getElementById("page-header");
  let totalEpisodes = episodeList.length;

  //create a span
  let episodeCountText = document.createElement("span");

  // create a span that holds the search result counter
  let searchResultElement = document.createElement("span");
  searchResultElement.id = "total-search-results"; // id to grab for counter
  searchResultElement.innerHTML = episodeList.length;

  // create a span that will hold all the text "56 out of 73 episodes"
  let totalEpisodesText = document.createElement("span");
  totalEpisodesText.id = "total-episodes-text";
  totalEpisodesText.innerText = " out of" + " " + totalEpisodes + " episodes";

  // append span to span
  episodeCountText.append(searchResultElement, totalEpisodesText);
  pageHeader.append(episodeCountText);
}

function createEpisodeCards(episodeList) {
  const rootElem = document.getElementById("root");
  let episodeCardContainer = document.createElement("div");

  // MAKE EPISODE CARDS
  // loop to do stuff to each episode in the array object
  for (const episode of episodeList) {
    // 1. create some elements (divs, h3, img, p)
    // 2. assign content to those elements
    // 3. assign some classes to elements -- I might do this at the end (styling last)
    // 4. remember to append child elements to parents

    // div that contains all episode data
    let episodeCard = document.createElement("div");
    ////////////////// Assign episodeCards an ID
    episodeCard.id = "EP" + episode.id;

    // IMAGES
    let episodeImgBox = document.createElement("div");
    let episodeImgElement = document.createElement("img");
    episodeImgElement.src = `${episode.image.medium}`;
    episodeImgElement.alt = "Scene from Game of Thrones";
    episodeImgBox.append(episodeImgElement);

    // EPISODE SUMMARY SECTION: Title and summary text
    // EPISODE SUMMARY TEXT
    let episodeSummaryBox = document.createElement("div");
    let episodePElement = document.createElement("p");
    episodePElement.innerHTML = `${episode.summary}`;

    // EPISODE TITLE TEXT
    let episodeTitleElement = document.createElement("h3");
    // episode codes
    // a. change the numbers to strings
    // b. use padStart() to zero-pad seasons and episodes
    const paddedSeasonNumber = episode.season.toString().padStart(2, "0");
    const paddedEpisodeNumber = episode.number.toString().padStart(2, "0");
    const episodeName = episode.name;
    episodeTitleElement.innerText = `${episodeName} - S${paddedSeasonNumber}E${paddedEpisodeNumber}`;
    episodeSummaryBox.append(episodeTitleElement, episodePElement);

    // append episode cards to container div with id root
    episodeCardContainer.append(episodeCard);

    // append created elements to episodeCard
    episodeCard.append(episodeImgBox, episodeSummaryBox);

    // ADD CLASSES
    episodeCard.classList.add("episode-card");
    episodeImgElement.classList.add("episode-image");
    episodeTitleElement.classList.add("episode-title");
    episodePElement.classList.add("episode-summary-text");
    episodeSummaryBox.classList.add("episode-summary-section");
  }

  // add a class to the root element to get some grid going
  rootElem.append(episodeCardContainer);
  episodeCardContainer.classList.add("episode-container");
}

function createFooter() {
  const rootElem = document.getElementById("root");

  let pageFooter = document.createElement("div");
  let footerLink = document.createElement("a");
  footerLink.href = "https://www.tvmaze.com";
  footerLink.innerHTML = "www.tvmaze.com";

  let footerPElement = document.createElement("p");
  footerPElement.innerHTML = `The episode data for this page was taken from `;
  footerPElement.appendChild(footerLink);

  // append p to footer, append footer div to rootElem div
  pageFooter.append(footerPElement);
  rootElem.append(pageFooter);
}

window.onload = setup;
