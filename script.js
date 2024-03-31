function updateTimeDate() {
    var now = new Date(); 
    var date = now.getDate(); 
    var month = now.getMonth(); 
    var year = now.getFullYear();
    var hours = now.getHours(); 
    var minutes = now.getMinutes(); 


    var monthNames = ["januari", "februari", "mars", "april", "maj", "juni",
            "juli", "augusti", "september", "oktober", "november", "december"];

    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    var timeHTML = '<span style="font-weight: bold;">' + hours + ':' + minutes +'</span>'; 
    var dateHTML = date + ' ' + monthNames[month] + ' ' + year; 

    document.getElementById('timeDate').innerHTML = timeHTML + '  ' + dateHTML;
}

window.onload = function() {
    updateTimeDate();
    setInterval(updateTimeDate, 1000);
};

//Rubriken

document.addEventListener("DOMContentLoaded", function() {
    const title = document.getElementById("title");

    title.addEventListener("click", function() {
        title.contentEditable = true;
        title.classList.add("editing");

        title.addEventListener("keypress", function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                title.contentEditable = false;
                title.classList.remove("editing");
                
                console.log("New title:", title.innerText);
            }
        });

        title.addEventListener("blur", function() {
            title.contentEditable = false;
            title.classList.remove("editing");
            
            console.log("New title:", title.innerText);
        });
    });
});


//Snabblänkarna

document.addEventListener("DOMContentLoaded", function() {
    const quickLinksContainer = document.querySelector(".quickLinks");
    const addLinkButton = document.getElementById("addLink");

    function addLink() {
        const inputUrl = document.createElement("input");
        inputUrl.setAttribute("type", "text");
        inputUrl.setAttribute("placeholder", "Ange webbadress för länk");

        const inputName = document.createElement("input");
        inputName.setAttribute("type", "text");
        inputName.setAttribute("placeholder", "Ange namn för länk");

        const addButton = document.createElement("button");
        addButton.textContent = "Lägg till";

        addButton.addEventListener("click", function() {
            const url = inputUrl.value;
            const name = inputName.value;

            if (url && name) {
                const linkDiv = document.createElement("div");
                linkDiv.classList.add("link");
                linkDiv.innerHTML = `
                    <a href="${url}" target="_blank">${name}</a>
                    <button class="removeLink">-</button>
                `;

                const existingLinks = quickLinksContainer.querySelectorAll(".link");

                if (existingLinks.length > 0) {
                    quickLinksContainer.insertBefore(linkDiv, existingLinks[0]);
                } else {
                    quickLinksContainer.appendChild(linkDiv);
                }

                updateButtons();

                
                quickLinksContainer.removeChild(inputContainer);
            } else {
                alert("Vänligen fyll i både webbadress och namn för länken.");
            }
        });

        const inputContainer = document.createElement("div");
        inputContainer.classList.add("input-container");
        inputContainer.appendChild(inputUrl);
        inputContainer.appendChild(inputName);
        inputContainer.appendChild(addButton);

        quickLinksContainer.appendChild(inputContainer);
    }

    function removeLink(event) {
        const linkDiv = event.target.parentElement;
        quickLinksContainer.removeChild(linkDiv);
        updateButtons();
    }

    function updateButtons() {
        const links = quickLinksContainer.querySelectorAll(".link");
        const numLinks = links.length;

        if (numLinks < 5) {
            addLinkButton.style.display = "block";
        } else {
            addLinkButton.style.display = "none";
        }

        links.forEach(link => {
            const removeButton = link.querySelector(".removeLink");
            removeButton.addEventListener("click", removeLink);
        });
    }

    addLinkButton.addEventListener("click", addLink);

    updateButtons();
});


//Vädret

document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.querySelector('.search');
    const card = document.querySelector('.card');
    const cityDisplay = document.querySelector('.cityDisplay');
    const weatherEmoji = document.querySelector('.weatherEmoji');
    const descDisplay = document.querySelector('.descDisplay');
    const tempDisplay = document.querySelector('.tempDisplay');
    const windDisplay = document.querySelector('.windDisplay');
    const errorDisplay = document.querySelector('.errorDisplay');

    

    const englishDescription = 'Clear';
const translatedDescription = translateWeatherDescription(englishDescription);
console.log(translatedDescription); 



    function getWeather(location) {
        const APIkey = '654418d6e13d58276cc9b8aabb0eb2be';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}&units=metric`;
    
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
            
                cityDisplay.textContent = data.name;
                weatherEmoji.textContent = getWeatherEmoji(data.weather[0].id);
                descDisplay.textContent = translateWeatherDescription(data.weather[0].main); 
                tempDisplay.textContent = `${Math.floor(data.main.temp)}°C`;
                windDisplay.textContent = `${Math.floor(data.wind.speed)} m/s`;
                errorDisplay.style.display = 'none';
                card.style.display = 'block';
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                errorDisplay.style.display = 'block';
                card.style.display = 'none';
            });
    }
    
   
    function getWeatherEmoji(weatherId) {

        if (weatherId >= 200 && weatherId < 300) {
            return '⛈️';
        } else if (weatherId >= 300 && weatherId < 400) {
            return '🌧️'; 
        } else if (weatherId >= 500 && weatherId < 600) {
            return '🌧️'; 
        } else if (weatherId >= 600 && weatherId < 700) {
            return '❄️'; 
        } else if (weatherId >= 700 && weatherId < 800) {
            return '🌫️'; 
        } else if (weatherId === 800) {
            return '☀️'; 
        } else if (weatherId === 801) {
            return '🌤️'; 
        } else if (weatherId > 801 && weatherId <= 804) {
            return '☁️'; 
        } else {
            return '❓'; 
        }
    }

    function translateWeatherDescription(englishDescription) {
        switch (englishDescription) {
            case 'Clear':
                return 'Klart';
            case 'Clouds':
                return 'Molnigt';
            case 'Rain':
                return 'Regn';
            case 'Snow':
                return 'Snö';
            case 'Drizzle':
                return 'Duggregn';
            case 'Thunderstorm':
                return 'Åska';
            case 'Mist':
                return 'Dimma';
            default:
                return englishDescription;
        }
    }

    
    searchButton.addEventListener('click', function() {
        const locationInput = document.querySelector('input[type="text"]').value;
        if (locationInput.trim() !== '') {
            getWeather(locationInput);
        } else {
            errorDisplay.style.display = 'block';
            card.style.display = 'none';
        }
    });
    
});





//Bakgrundbild

document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("backgroundButton");

    function setRandomBackground() {
        fetch("https://api.unsplash.com/photos/random?client_id=8NrB58oD1zK8Pp1Y7iCpY1VPQFmaPQqCuAS0juhnd5I")
            .then(response => response.json())
            .then(data => {
                const imageUrl = data.urls.regular;
                document.body.style.backgroundImage = `url(${imageUrl})`;
            })
            .catch(error => {
                console.error("Error fetching image:", error);
            });
    }

    setRandomBackground();

    button.addEventListener("click", setRandomBackground);
});



//Skämt
document.addEventListener("DOMContentLoaded", function() {
    const jokeContainer = document.getElementById("jokeContainer");
    const randomJokeButton = document.getElementById("randomJokeButton");

    function getRandomChuckNorrisJoke() {
        fetch("https://api.chucknorris.io/jokes/random")
            .then(response => response.json())
            .then(data => {
                const joke = data.value;
                jokeContainer.textContent = joke;
            })
            .catch(error => {
                console.error("Error fetching Chuck Norris joke:", error);
                jokeContainer.textContent = "Ett fel uppstod. Försök igen senare.";
            });
    }

    // Ladda ett slumpmässigt Chuck Norris-skämt när sidan laddas
    getRandomChuckNorrisJoke();

    // Lyssna på klick för att slumpa ett nytt skämt
    randomJokeButton.addEventListener("click", getRandomChuckNorrisJoke);
});



//Spara ändringarna

document.addEventListener("DOMContentLoaded", function() {
    const titleElement = document.querySelector(".title h1");
    const quickLinksContainer = document.querySelector(".quickLinks");
    const notesTextArea = document.getElementById("notes");

    // Funktion för att spara dashboard-titeln i LocalStorage
    function saveTitleToLocalStorage() {
        const titleText = titleElement.textContent;
        localStorage.setItem("dashboardTitle", titleText);
    }

    // Funktion för att spara snabblänkarna i LocalStorage
    function saveQuickLinksToLocalStorage() {
        console.log("Saving quick links to localStorage");
        const links = quickLinksContainer.querySelectorAll(".link a");
        const quickLinks = [];
        links.forEach(link => {
            quickLinks.push({ url: link.href, name: link.textContent });
        });
        localStorage.setItem("quickLinks", JSON.stringify(quickLinks));
    }

    // Funktion för att spara anteckningarna i LocalStorage
    function saveNotesToLocalStorage() {
        const notesText = notesTextArea.value;
        localStorage.setItem("notes", notesText);
    }

    // Funktion för att ladda sparad data från LocalStorage och uppdatera dashboarden
 function loadSavedData() {
    console.log("Loading saved data from localStorage");
    const savedTitle = localStorage.getItem("dashboardTitle");
    if (savedTitle) {
        titleElement.textContent = savedTitle;
    }

    const savedQuickLinks = localStorage.getItem("quickLinks");
    if (savedQuickLinks) {
        const parsedQuickLinks = JSON.parse(savedQuickLinks);
        // Töm behållaren för att undvika dubbletter
        quickLinksContainer.innerHTML = "";
        parsedQuickLinks.forEach(link => {
            const linkDiv = document.createElement("div");
            linkDiv.classList.add("link");
            linkDiv.innerHTML = `
                <a href="${link.url}" target="_blank">${link.name}</a>
                <button class="removeLink">-</button>
            `;
            quickLinksContainer.appendChild(linkDiv); // Lägg till länk längst ner
        });
    }

    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notesTextArea.value = savedNotes;
    }
}

    // Ladda sparad data när sidan laddas
    loadSavedData();

    // Lyssna på ändringar och spara data till LocalStorage
    titleElement.addEventListener("input", saveTitleToLocalStorage);
    quickLinksContainer.addEventListener("input", saveQuickLinksToLocalStorage);
    notesTextArea.addEventListener("input", saveNotesToLocalStorage);
});