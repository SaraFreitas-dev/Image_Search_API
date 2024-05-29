const accessKey = "tjr5Qn8DLgdLaMtrr7_2xYxtkBuZh3N6PRWYE8UuEhQ";

const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const showMore = document.getElementById("show-more-button");
const searchResults = document.querySelector(".search-results"); // Ensure the class is used here
const select = document.getElementById("img");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    console.log(`Fetching images with query: ${inputData}, page: ${page}`);

    try {
        const response = await fetch(url);
        
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response:', data);

        if (!data.results) {
            throw new Error('API response does not contain results');
        }

        const results = data.results;

        if (page === 1) {
            searchResults.innerHTML = "";
        }

        results.forEach((result) => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Image";

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description || "View Image";

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);

            console.log('Appended image and link:', imageWrapper);
        });

        page++;
        if (results.length > 0) {
            showMore.style.display = "block"; // Show the 'Show More' button
        } 
        else {
            showMore.style.display = "none"; // Hide the 'Show More' button if no more results
            const noResultsMessage = document.createElement("p");
            noResultsMessage.textContent = "Oops... No results found!";
            noResultsMessage.classList.add("no-results-message"); // Add a class for styling if needed
            searchResults.appendChild(noResultsMessage);
        }
    } catch (error) {
        console.error('Error fetching and parsing data:', error);
    }
}

formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    console.log('Form submitted');
    searchImages();
});

showMore.addEventListener("click", () => {
    console.log('Show more button clicked');
    searchImages();
});

//increase img when clicked
searchResults.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains("scaleImg")) {
        clickedElement.classList.remove("scaleImg");
    } else  {
        clickedElement.classList.toggle("scaleImg");
    }
});


