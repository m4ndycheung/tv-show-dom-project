//You can edit ALL of the code here
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
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  // add for loop in here to do stuff to each array object
  for (const episode of episodeList) {
    // 1. create some elements (divs, h3, img, p)
    // 2. assign content to those elements
    // 3. assign some classes to elements

    // div that contains episode data
    let episodeCard = document.createElement("div");

    // title h3 heading
    let episodeTitleBox = document.createElement("div");
    let episodeTitleElement = document.createElement("h3");
    episodeTitleElement.innerText = `${episode.name}`;
    episodeTitleBox.append(episodeTitleElement);

    // img div
    let episodeImgBox = document.createElement("div");
    let episodeImgElement = document.createElement("img");
    episodeImgElement.src = `${episode.image.medium}`;
    episodeImgBox.append(episodeImgElement);

    // summary text div
    let episodeSummaryBox = document.createElement("div");
    let episodePElement = document.createElement("p");
    episodePElement.innerHTML = `${episode.summary}`;
    episodeSummaryBox.append(episodePElement);

    // Append child elements to parent elements
    rootElem.append(episodeCard);
    episodeCard.append(episodeTitleBox, episodeSummaryBox, episodeImgBox);
    episodeCard.classList.add("div-border");
  }

}

window.onload = setup;

