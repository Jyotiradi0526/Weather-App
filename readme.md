# Weather Forecast Application

## Objective
The objective of this assignment is to develop a weather forecast application using JavaScript, HTML, and CSS. The application retrieves weather data from the OpenWeatherMap API, displays it in a user-friendly interface, and provides essential features such as location-based forecasts, current weather conditions, and extended forecasts.

## Features
- Search weather by city name.
- Use current location to fetch weather data.
- Display current weather conditions (temperature, humidity, wind speed).
- Display an extended 5-day weather forecast.
- Dropdown menu for recently searched cities.
- Responsive design for various screen sizes (desktop, iPad Mini, iPhone SE).
- Error handling and validation for user inputs.

## Project Structure
weather-forecast-app/
│
├── index.html
├── script.js
├── style.css
├── README.md


## Setup Instructions

### Prerequisites
- Node.js installed on your machine (for setting up a local server, if needed).
- A web browser (Chrome, Firefox, etc.).

### Steps

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/weather-forecast-app.git
   cd weather-forecast-app

2.Open index.html in your web browser:

- You can simply open the index.html file in your preferred web browser to run the application.

3.Set up API key:

- Sign up at OpenWeatherMap to get your API key.

- Replace the YOUR_API_KEY placeholder in script.js with your actual API key.

const apiKey = 'YOUR_API_KEY'; // Replace with your API key


4.Run a local server (optional):

- If you prefer running the application on a local server, you can use a simple server setup with Node.js or any other local server tool.
Using Node.js:

npm install -g http-server
http-server

- Open http://localhost:8080 in your web browser.

### Usage

## Search by City Name

- Enter a city name in the input field and click the "Search" button.

- The application will fetch and display the current weather and a 5-day forecast for the specified city.


## Use Current Location

- Click the "Use Current Location" button to allow the application to access your current geographic location.

- The application will fetch and display the weather data for your current location.


## Recently Searched Cities

- The dropdown menu will populate with recently searched cities.

- Select a city from the dropdown to quickly fetch and display its weather data.


## Technologies Used
-HTML
-CSS (Tailwind CSS)
-JavaScript
-OpenWeatherMap API
-Local Storage for storing recent cities


## Responsiveness

- The application is designed to be responsive and works on various screen sizes, including desktop, iPad Mini, and iPhone SE.


## Error Handling and Validation

- The application handles API errors gracefully and displays appropriate error messages to users.
- Validates user inputs to prevent errors (e.g., invalid location, empty search queries).

## Acknowledgements

- OpenWeatherMap API
- Tailwind CSS
