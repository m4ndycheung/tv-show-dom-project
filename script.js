function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  createSearchInput(episodeList);
  createEpisodeCards(episodeList);
  createFooter();
}

function createSearchInput(episodeList) {
  const rootElem = document.getElementById("root");
  // create an input element
  // create a search button
  // input value converted to lowercase
  // use an event listener to listen for keystrokes?
  // each time input changes, match input value to episodes and summaries
  // also the numebr of results is displayed (no. of episodes filtered)
  // when there is nothing in the input box, all episodes are shown
  // append search input stuff to rootelem

  // create input field
  let pageHeader = document.createElement("div");
  let searchInputElement = document.createElement("input");
  searchInputElement.id = "search-field";
  searchInputElement.type = "text";
  searchInputElement.placeholder = "Search for episode name";

  searchInputElement.addEventListener("input", searchEpisodes);

  function searchEpisodes() {
    let inputText = searchInputElement.value.toLowerCase();
    let allEpisodeCards = document.querySelectorAll(".episode-card");

    for (const card of allEpisodeCards) {
      let summaryText = card.querySelector(".episode-summary-text").textContent.toLowerCase();
      let titleText = card.querySelector(".episode-title").textContent.toLowerCase();

      if (titleText.includes(inputText)|| summaryText.includes(inputText)) {
        card.classList.remove("hide-card");
      } else {
        card.classList.add("hide-card");
      }
    }
  }

  // append elements
  pageHeader.append(searchInputElement);
  rootElem.append(pageHeader);
}

function createEpisodeCards(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
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
    let cleanedSummaryText = episode.summary.replaceAll("<p>","").replaceAll("</p>","").replaceAll("<br>","");
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
