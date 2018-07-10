/**
 * The request params that can be sent from the client.
 */
export class CountryCodeModel {

    /**
     * The name of the country.
     */
    public countryName: string;

    /**
     * THe country's code for use with the OpenWeatherMap API.
     */
    public countryCode: string;

    /**
     * Default Constructor
     */
    constructor() {
        this.countryName = '';
        this.countryCode = 'us';
    }

}