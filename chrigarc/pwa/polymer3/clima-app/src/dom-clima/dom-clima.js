import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class DomClima extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
	  <link rel="stylesheet" type="text/css" href="styles/inline.css">
	  <div class="html">
        <div class="body">
            <header class="header">
                <h1 class="header__title">Weather PWA</h1>
                <button id="butRefresh" class="headerButton" aria-label="Refresh"></button>
                <button id="butAdd" class="headerButton" aria-label="Add"></button>
            </header>
    
            <main class="main">
                <div class="card cardTemplate weather-forecast" hidden>
                    <div class="city-key" hidden></div>
                    <div class="card-last-updated" hidden></div>
                    <div class="location"></div>
                    <div class="date"></div>
                    <div class="description"></div>
                    <div class="current">
                        <div class="visual">
                            <div class="icon"></div>
                            <div class="temperature">
                                <span class="value"></span><span class="scale">°F</span>
                            </div>
                        </div>
                        <div class="description">
                            <div class="humidity"></div>
                            <div class="wind">
                                <span class="value"></span>
                                <span class="scale">mph</span>
                                <span class="direction"></span>°
                            </div>
                            <div class="sunrise"></div>
                            <div class="sunset"></div>
                        </div>
                    </div>
                    <div class="future">
                        <div class="oneday">
                            <div class="date"></div>
                            <div class="icon"></div>
                            <div class="temp-high">
                                <span class="value"></span>°
                            </div>
                            <div class="temp-low">
                                <span class="value"></span>°
                            </div>
                        </div>
                        <div class="oneday">
                            <div class="date"></div>
                            <div class="icon"></div>
                            <div class="temp-high">
                                <span class="value"></span>°
                            </div>
                            <div class="temp-low">
                                <span class="value"></span>°
                            </div>
                        </div>
                        <div class="oneday">
                            <div class="date"></div>
                            <div class="icon"></div>
                            <div class="temp-high">
                                <span class="value"></span>°
                            </div>
                            <div class="temp-low">
                                <span class="value"></span>°
                            </div>
                        </div>
                        <div class="oneday">
                            <div class="date"></div>
                            <div class="icon"></div>
                            <div class="temp-high">
                                <span class="value"></span>°
                            </div>
                            <div class="temp-low">
                                <span class="value"></span>°
                            </div>
                        </div>
                        <div class="oneday">
                            <div class="date"></div>
                            <div class="icon"></div>
                            <div class="temp-high">
                                <span class="value"></span>°
                            </div>
                            <div class="temp-low">
                                <span class="value"></span>°
                            </div>
                        </div>
                        <div class="oneday">
                            <div class="date"></div>
                            <div class="icon"></div>
                            <div class="temp-high">
                                <span class="value"></span>°
                            </div>
                            <div class="temp-low">
                                <span class="value"></span>°
                            </div>
                        </div>
                        <div class="oneday">
                            <div class="date"></div>
                            <div class="icon"></div>
                            <div class="temp-high">
                                <span class="value"></span>°
                            </div>
                            <div class="temp-low">
                                <span class="value"></span>°
                            </div>
                        </div>
                    </div>
                </div>
            </main>
    
            <div class="dialog-container">
                <div class="dialog">
                    <div class="dialog-title">Add new city</div>
                    <div class="dialog-body">
                        <select id="selectCityToAdd">
                            <!-- Values map to Yahoo Weather API Where On Earth Identifiers (WOEIDs).
                                 https://developer.yahoo.com/weather/documentation.html#req -->
                            <option value="2357536">Austin, TX</option>
                            <option value="2367105">Boston, MA</option>
                            <option value="2379574">Chicago, IL</option>
                            <option value="2459115">New York, NY</option>
                            <option value="2475687">Portland, OR</option>
                            <option value="2487956">San Francisco, CA</option>
                            <option value="2490383">Seattle, WA</option>
                        </select>
                    </div>
                    <div class="dialog-buttons">
                        <button id="butAddCity" class="button">Add</button>
                        <button id="butAddCancel" class="button">Cancel</button>
                    </div>
                </div>
            </div>
    
            <div class="loader">
                <svg viewBox="0 0 32 32" width="32" height="32">
                    <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                </svg>
            </div>
        </div>
    </div>
    `;
    }

    constructor() {
        super();
        /*
          * Fake weather data that is presented when the user first uses the app,
          * or when the user has not saved any cities. See startup code for more
          * discussion.
          */
        this.initialWeatherForecast = {
            key: '2459115',
            label: 'New York, NY',
            created: '2016-07-22T01:00:00Z',
            channel: {
                astronomy: {
                    sunrise: '5:43 am',
                    sunset: '8:21 pm'
                },
                item: {
                    condition: {
                        text: 'Windy',
                        date: 'Thu, 21 Jul 2016 09:00 PM EDT',
                        temp: 56,
                        code: 24
                    },
                    forecast: [
                        {code: 44, high: 86, low: 70},
                        {code: 44, high: 94, low: 73},
                        {code: 4, high: 95, low: 78},
                        {code: 24, high: 75, low: 89},
                        {code: 24, high: 89, low: 77},
                        {code: 44, high: 92, low: 79},
                        {code: 44, high: 89, low: 77}
                    ]
                },
                atmosphere: {
                    humidity: 56
                },
                wind: {
                    speed: 25,
                    direction: 195
                }
            }
        };
    }


    static get properties() {
        return {
            isLoading: {
                type: Boolean,
                value: true
            },
            visibleCards: {
                type: Object,
                value: {}
            },
            selectedCities: {
                type: Object,
                value: [],
            },
            daysOfWeek: {
                type: Object,
                value: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        };
    }

    ready() {
        super.ready();
        this.spinner = this.shadowRoot.querySelector('.loader');
        this.cardTemplate = this.shadowRoot.querySelector('.cardTemplate');
        this.container = this.shadowRoot.querySelector('.main');
        this.addDialog = this.shadowRoot.querySelector('.dialog-container');

        /*****************************************************************************
         *
         * Event listeners for UI elements
         *
         ****************************************************************************/

        this.shadowRoot.getElementById('butRefresh').addEventListener('click', () => {
            // Refresh all of the forecasts
            this.updateForecasts();
        });

        this.shadowRoot.getElementById('butAdd').addEventListener('click', () => {
            // Open/show the add new city dialog
            this.toggleAddDialog(true);
        });

        this.shadowRoot.getElementById('butAddCity').addEventListener('click', () => {
            // Add the newly selected city
            const select = this.shadowRoot.getElementById('selectCityToAdd');
            const selected = select.options[select.selectedIndex];
            const key = selected.value;
            const label = selected.textContent;
            if (!this.selectedCities) {
                this.selectedCities = [];
            }
            this.getForecast(key, label);
            this.selectedCities.push({key: key, label: label});
            this.saveSelectedCities();
            this.toggleAddDialog(false);

        });

        this.shadowRoot.getElementById('butAddCancel').addEventListener('click', () => {
            // Close the add new city dialog
            this.toggleAddDialog(false);
        });
        this.updateForecastCard(this.initialWeatherForecast);

        // TODO add startup code here
        /************************************************************************
         *
         * Código necesario para iniciar la app
         *
         * NOTA: To simplify this codelab, we've used localStorage.
         *   localStorage is a synchronous API and has serious performance
         *   implications. It should not be used in production applications!
         *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
         *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
         ************************************************************************/

        this.selectedCities = localStorage.selectedCities;
        if (this.selectedCities) {
            this.selectedCities = JSON.parse(this.selectedCities);
            this.selectedCities.forEach((city) => {
                this.getForecast(city.key, city.label);
            });
        } else {
            /* The user is using the app for the first time, or the user has not
             * saved any cities, so show the user some fake data. A real app in this
             * scenario could guess the user's location via IP lookup and then inject
             * that data into the page.
             */
            this.updateForecastCard(this.initialWeatherForecast);
            this.selectedCities = [
                {key: this.initialWeatherForecast.key, label: this.initialWeatherForecast.label}
            ];
            this.saveSelectedCities();
        }

        // TODO add service worker code here
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('./service-worker.js')
                .then(()  => { console.log('Service Worker Registered'); });
        }

    }

    /*****************************************************************************
     *
     * Methods to update/refresh the UI
     *
     ****************************************************************************/

    // Toggles the visibility of the add new city dialog.
    toggleAddDialog(visible) {
        if (visible) {
            this.addDialog.classList.add('dialog-container--visible');
        } else {
            this.addDialog.classList.remove('dialog-container--visible');
        }
    }

    // Updates a weather card with the latest weather forecast. If the card
    // doesn't already exist, it's cloned from the template.
    updateForecastCard(data) {
        const dataLastUpdated = new Date(data.created);
        const sunrise = data.channel.astronomy.sunrise;
        const sunset = data.channel.astronomy.sunset;
        const current = data.channel.item.condition;
        const humidity = data.channel.atmosphere.humidity;
        const wind = data.channel.wind;

        let card = this.visibleCards[data.key];
        if (!card) {
            card = this.cardTemplate.cloneNode(true);
            card.classList.remove('cardTemplate');
            card.querySelector('.location').textContent = data.label;
            card.removeAttribute('hidden');
            this.container.appendChild(card);
            this.visibleCards[data.key] = card;
        }

        // Verifies the data provide is newer than what's already visible
        // on the card, if it's not bail, if it is, continue and update the
        // time saved in the card
        const cardLastUpdatedElem = card.querySelector('.card-last-updated');
        let cardLastUpdated = cardLastUpdatedElem.textContent;
        if (cardLastUpdated) {
            cardLastUpdated = new Date(cardLastUpdated);
            // Bail if the card has more recent data then the data
            if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
                return;
            }
        }
        cardLastUpdatedElem.textContent = data.created;

        card.querySelector('.description').textContent = current.text;
        card.querySelector('.date').textContent = current.date;
        card.querySelector('.current .icon').classList.add(this.getIconClass(current.code));
        card.querySelector('.current .temperature .value').textContent =
            Math.round(current.temp);
        card.querySelector('.current .sunrise').textContent = sunrise;
        card.querySelector('.current .sunset').textContent = sunset;
        card.querySelector('.current .humidity').textContent =
            Math.round(humidity) + '%';
        card.querySelector('.current .wind .value').textContent =
            Math.round(wind.speed);
        card.querySelector('.current .wind .direction').textContent = wind.direction;
        const nextDays = card.querySelectorAll('.future .oneday');
        let today = new Date();
        today = today.getDay();
        for (let i = 0; i < 7; i++) {
            const nextDay = nextDays[i];
            const daily = data.channel.item.forecast[i];
            if (daily && nextDay) {
                nextDay.querySelector('.date').textContent =
                    this.daysOfWeek[(i + today) % 7];
                nextDay.querySelector('.icon').classList.add(this.getIconClass(daily.code));
                nextDay.querySelector('.temp-high .value').textContent =
                    Math.round(daily.high);
                nextDay.querySelector('.temp-low .value').textContent =
                    Math.round(daily.low);
            }
        }
        if (this.isLoading) {
            this.spinner.setAttribute('hidden', true);
            this.container.removeAttribute('hidden');
            this.isLoading = false;
        }
    }

    /*****************************************************************************
     *
     * Methods for dealing with the model
     *
     ****************************************************************************/

    /*
     * Gets a forecast for a specific city and updates the card with the data.
     * getForecast() first checks if the weather data is in the cache. If so,
     * then it gets that data and populates the card with the cached data.
     * Then, getForecast() goes to the network for fresh data. If the network
     * request goes through, then the card gets updated a second time with the
     * freshest data.
     */
    getForecast(key, label) {
        const statement = 'select * from weather.forecast where woeid=' + key;
        const url = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' +
            statement;
        // TODO add cache logic here
        if ('caches' in window) {
            /*
             * Check if the service worker has already cached this city's weather
             * data. If the service worker has the data, then display the cached
             * data while the app fetches the latest data.
             */
            caches.match(url).then((response) => {
                if (response) {
                    response.json().then((json) => {
                        const results = json.query.results;
                        results.key = key;
                        results.label = label;
                        results.created = json.query.created;
                        this.updateForecastCard(results);
                    });
                }
            });
        }
        // Fetch the latest data.
        const request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    const response = JSON.parse(request.response);
                    const results = response.query.results;
                    results.key = key;
                    results.label = label;
                    results.created = response.query.created;
                    this.updateForecastCard(results);
                }
            } else {
                // Return the initial weather forecast since no data is available.
                this.updateForecastCard(this.initialWeatherForecast);
            }
        };
        request.open('GET', url);
        request.send();
    }

    // Iterate all of the cards and attempt to get the latest forecast data
    updateForecasts() {
        const keys = Object.keys(this.visibleCards);
        keys.forEach((key) => {
            this.getForecast(key);
        });
    }

    // TODO add saveSelectedCities function here
    // Save list of cities to localStorage.
    saveSelectedCities() {
        const selectedCities = JSON.stringify(this.selectedCities);
        localStorage.selectedCities = selectedCities;
    }

    getIconClass(weatherCode) {
        // Weather codes: https://developer.yahoo.com/weather/documentation.html#codes
        weatherCode = parseInt(weatherCode);
        switch (weatherCode) {
            case 25: // cold
            case 32: // sunny
            case 33: // fair (night)
            case 34: // fair (day)
            case 36: // hot
            case 3200: // not available
                return 'clear-day';
            case 0: // tornado
            case 1: // tropical storm
            case 2: // hurricane
            case 6: // mixed rain and sleet
            case 8: // freezing drizzle
            case 9: // drizzle
            case 10: // freezing rain
            case 11: // showers
            case 12: // showers
            case 17: // hail
            case 35: // mixed rain and hail
            case 40: // scattered showers
                return 'rain';
            case 3: // severe thunderstorms
            case 4: // thunderstorms
            case 37: // isolated thunderstorms
            case 38: // scattered thunderstorms
            case 39: // scattered thunderstorms (not a typo)
            case 45: // thundershowers
            case 47: // isolated thundershowers
                return 'thunderstorms';
            case 5: // mixed rain and snow
            case 7: // mixed snow and sleet
            case 13: // snow flurries
            case 14: // light snow showers
            case 16: // snow
            case 18: // sleet
            case 41: // heavy snow
            case 42: // scattered snow showers
            case 43: // heavy snow
            case 46: // snow showers
                return 'snow';
            case 15: // blowing snow
            case 19: // dust
            case 20: // foggy
            case 21: // haze
            case 22: // smoky
                return 'fog';
            case 24: // windy
            case 23: // blustery
                return 'windy';
            case 26: // cloudy
            case 27: // mostly cloudy (night)
            case 28: // mostly cloudy (day)
            case 31: // clear (night)
                return 'cloudy';
            case 29: // partly cloudy (night)
            case 30: // partly cloudy (day)
            case 44: // partly cloudy
                return 'partly-cloudy-day';
        }
    }

}

window.customElements.define('dom-clima', DomClima);
