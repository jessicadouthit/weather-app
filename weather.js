const apiKey = 'a4b4f753d0ec9116b71567048f03a92a';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

locationInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        }
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;

            // Set background based on weather
            const weatherMain = data.weather[0].main.toLowerCase();
            let backgroundImage = 'default.jpg'; // fallback

            switch (weatherMain) {
                case 'clear':
                    backgroundImage = 'clear.jpg';
                    break;
                case 'clouds':
                    backgroundImage = 'clouds.jpg';
                    break;
                case 'rain':
                case 'drizzle':
                    backgroundImage = 'rain.jpg';
                    break;
                case 'snow':
                    backgroundImage = 'snow.jpg'; // double-check your file extension!
                    break;
                case 'thunderstorm':
                    backgroundImage = 'thunderstorm.jpg';
                    break;
                case 'mist':
                case 'fog':
                case 'haze':
                    backgroundImage = 'mist.jpg';
                    break;
            }

            document.body.style.backgroundImage = `url('${backgroundImage}')`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = '';
            temperatureElement.textContent = '';
            descriptionElement.textContent = 'Could not retrieve weather. Please try another city.';
            document.body.style.backgroundImage = `url('default.jpg')`;
        });
}
