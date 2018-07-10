import axios from 'axios';
import config from '../../../config/config';

export class WeatherService {

    /**
     * Reference to the REACT component state.
     */
    private state: any;

    /**
     * The URL for getting the current weather.
     */
    private currentWeatherGatewayUrl: string;

    /**
     * The URL for getting the five day forecast.
     */
    private fiveDayWeatherGatewayUrl: string;

    /**
     * Default Constructor
     * @param stateOpts Reference to the react component state that we need to pass in.
     */
    constructor(stateOpts: any) {
        this.state = stateOpts;
        this.currentWeatherGatewayUrl = `${config.apiGatewayUrl}weather/current`;
        this.fiveDayWeatherGatewayUrl = `${config.apiGatewayUrl}weather/fiveday`;
    }

    /**
     * Calling this method will make all the determinations based on the state for what needs to get called and with what parameters.
     * Then it will make the calls--and return the results as an array of two objects: { current: OBJECT, fiveDay: OBJECT }
     */
    public async getWeatherData(): Promise<any> {
        const iPromiseYou: any = [];
        if (this.state.getCurrent) {
            iPromiseYou.push(this.getCurrentWeather());
        }
        if (this.state.getFiveDay) {
            iPromiseYou.push(this.getFiveDayWeather());
        }
        try {
            const response: any = await axios.all(iPromiseYou);

            // now lets create a return object.
            const weatherDetails: any = {
                current: null,
                fiveDay: null
            };
            if (this.state.getCurrent) {
                weatherDetails.current = response[0].data.data;
            }
            if (this.state.getCurrent && this.state.getFiveDay) {
                weatherDetails.fiveDay = response[1].data.data;
            } else if (this.state.getFiveDay) {
                weatherDetails.fiveDay = response[0].data.data;
            }
            return weatherDetails;
        } catch (err) {
            console.log(err);
        }
        return null;
        
    }

    /**
     * Depending on the state options, builds the query params.
     */
    private buildQueryParams(): string {
        const urlFragment: string = '?' + (this.state.zipcode !== 0 ? 'zip=' + this.state.zipcode + '&countryCode=' + this.state.countryCode : '') + (this.state.cityName ? 'cityName=' + this.state.cityName + '&countryCode=' + this.state.countryCode : '');
        return urlFragment;
    }

    /**
     * Returns a promise function for current weather conditions.
     */
    private getCurrentWeather(): any {
        return axios.get(`${this.currentWeatherGatewayUrl}${this.buildQueryParams()}`);
    }

    /**
     * Returns a promise function for five day weather conditions.
     */
    private getFiveDayWeather(): any {
        return axios.get(`${this.fiveDayWeatherGatewayUrl}${this.buildQueryParams()}`);
    }

}