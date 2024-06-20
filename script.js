const apiKey = '767baab1ba615005b7b57e268ed513fe'; 

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search-btn').addEventListener('click', handleSearch);
  document.getElementById('current-location-btn').addEventListener('click', handleCurrentLocation);
  document.getElementById('recent-cities-dropdown').addEventListener('change', handleRecentCitySelect);
  loadRecentCities();
});

function handleSearch() {
  const city = document.getElementById('city-input').value.trim();
  if (city) {
    fetchWeatherData(`q=${city}`);
  } else {
    alert('Please enter a city name.');
  }
}

function handleCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(`lat=${latitude}&lon=${longitude}`);
    }, () => {
      alert('Unable to retrieve your location.');
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function handleRecentCitySelect() {
  const city = this.value;
  if (city) {
    fetchWeatherData(`q=${city}`);
  }
}

function fetchWeatherData(query) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${query}&appid=${apiKey}&units=metric`;

  Promise.all([fetch(weatherUrl), fetch(forecastUrl)])
    .then(async ([weatherRes, forecastRes]) => {
      if (!weatherRes.ok || !forecastRes.ok) {
        throw new Error('Failed to fetch data');
      }
      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      displayWeatherData(weatherData);
      displayExtendedForecast(forecastData);
      updateRecentCities(weatherData.name);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please check the city name and try again.');
    });
}

function displayWeatherData(data) {
  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.innerHTML = `
    <h2 class="text-2xl font-bold text-gray-100 mb-2">${data.name}</h2>
    <div class="flex items-center">
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" class="w-16 h-16 mr-4">
      <div>
        <p class="text-xl text-gray-100"><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p class="text-lg text-gray-100"><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p class="text-lg text-gray-100"><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      </div>
    </div>
  `;
  weatherInfo.classList.remove('hidden');
}

function displayExtendedForecast(data) {
  const forecastContainer = document.getElementById('extended-forecast');
  forecastContainer.innerHTML = '';
  data.list.forEach((forecast, index) => {
    if (index % 7 === 0) {
      const forecastCard = document.createElement('div');
      forecastCard.className = 'bg-gray-700 p-4 rounded-lg shadow-lg';
      forecastCard.innerHTML = `
        <p class="font-bold text-lg text-gray-100">${new Date(forecast.dt_txt).toLocaleDateString()}</p>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="weather icon" class="w-12 h-12 my-2">
        <p class="text-gray-100"><strong>Temp:</strong> ${forecast.main.temp}°C</p>
        <p class="text-gray-100"><strong>Wind:</strong> ${forecast.wind.speed} m/s</p>
        <p class="text-gray-100"><strong>Humidity:</strong> ${forecast.main.humidity}%</p>
      `;
      forecastContainer.appendChild(forecastCard);
    }
  });
}

function updateRecentCities(city) {
  let recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
  if (!recentCities.includes(city)) {
    recentCities.push(city);
    localStorage.setItem('recentCities', JSON.stringify(recentCities));
    loadRecentCities();
  }
}

function loadRecentCities() {
  const recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
  const dropdown = document.getElementById('recent-cities-dropdown');
  dropdown.innerHTML = '<option value="" selected disabled hidden>Select recent city</option>';
  recentCities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    dropdown.appendChild(option);
  });
}
