// What I need to do:
// Start a for loop
// Create episode container div to contain each episode info
// Create title div
// Create img div
// Create episode text div
// Append title, img, text divs to container div
// Append container div to root

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  createEpisodeCards(episodeList);
  createFooter();
}

function createEpisodeCards(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

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

    // EPISODE SUMMARY: Title and summary text
    let episodeSummaryBox = document.createElement("div");
    let episodePElement = document.createElement("p");
    episodePElement.innerHTML = `${episode.summary}`;

    // EPISODE TITLES
    let episodeTitleBox = document.createElement("div");
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
    rootElem.append(episodeCard);

    // append created elements to episodeCard
    episodeCard.append(episodeImgBox, episodeTitleBox, episodeSummaryBox);

    // ADD CLASSES
    episodeCard.classList.add("episode-card");
    episodeImgElement.classList.add("episode-image");
    episodeSummaryBox.classList.add("episode-summary-section");
    episodePElement.classList.add("episode-summary-text");


  }

  // add a class to the root element to get some grid going
  rootElem.classList.add("episode-container");
}

function createFooter() {
  // FOOTER
  let pageFooter = document.createElement("div");
  let footerLink = document.createElement("a");
  footerLink.href = "https://www.tvmaze.com";
  footerLink.innerHTML = "www.tvmaze.com";  
  
  let footerPElement = document.createElement("p");
  footerPElement.innerHTML = `The episode data for this page was taken from `;
  footerPElement.appendChild(footerLink);
  pageFooter.append(footerPElement);
  document.body.append(pageFooter);
}

window.onload = setup;
