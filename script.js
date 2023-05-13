function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  createHeader();
  createDropDownMenu(episodeList);
  useDropdownToJumpToEpisode(episodeList);
  createSearchbar();
  createEpisodeCounter(episodeList);
  createEpisodeCards(episodeList);
  createFooter();
}

function createHeader() {
  const rootElem = document.getElementById("root");
  let pageHeaderElement = document.createElement("div");
  pageHeaderElement.id = "page-header";
  rootElem.append(pageHeaderElement);
}

////////////////////////////////////////////////////////////////////////////////

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

// FUTURE SELF -- ADD A DEFAULT OPTION INSTEAD OF STARTING AT WINTER IS COMINGGG
function useDropdownToJumpToEpisode(episodeList) {
  let dropDownMenu = document.getElementById("episode-select");
  let dropDownChoice = dropDownMenu.value;

  dropDownMenu.addEventListener("change", jumpToEpisode);

  function jumpToEpisode() {
    // FUTURE SELF -- check if need for loop here
    for (const episode of episodeList) {
      // get the select choice
      dropDownChoice = dropDownMenu.value;
      let selectedEpisodeCard = document.getElementById("EP" + episode.id);

      if (dropDownChoice === selectedEpisodeCard.id) {
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

  //create a span that holds 2 x spans
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
    let cleanedSummaryText = episode.summary
      .replaceAll("<p>", "")
      .replaceAll("</p>", "")
      .replaceAll("<br>", "");
    episodePElement.innerText = `${cleanedSummaryText}`;

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
