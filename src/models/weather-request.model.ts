/**
 * The request params that can be sent from the client.
 */
export class WeatherRequestModel {

    /**
     * ZIPCODE for an area.
     */
    public zip: string;

    /**
     * CityName to search for.
     */
    public cityName: string;

    /**
     * CountryCode the zipcode/cityName exists in.
     * Required--but assume "us" if not given.
     */
    public countryCode: string;

    /**
     * Default Constructor
     */
    constructor() {
        this.countryCode = 'us';
        this.zip = '';
        this.cityName = '';
    }

}