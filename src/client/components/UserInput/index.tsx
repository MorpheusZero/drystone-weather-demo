import * as React from 'react';
import axios from 'axios';
import { forEach } from 'lodash';
import * as _ from 'underscore';
import { CountryCodeModel } from '../../../models/country-code.model';
import { WeatherService } from './weather.service';
import { WeatherCard } from './WeatherCard';
import config from '../../../config/config';

/**
 * The action types we support for the button click handler.
 */
enum ACTION_TYPES {
    SUBMIT = 'submit',
    TEXT_CHANGE = 'text_change',
    DEFAULT_COUNTRY = 'default_country',
    OTHER_COUNTRY = 'other_country',
    SELECT_COUNTRY = 'select_country',
    CHECK_CURRENT = 'check_current',
    CHECK_FIVE_DAY = 'check_five_day'
}

/**
 * The initial state to load into the component.
 */
interface initialState {
    zipcode: number;
    cityName: string;
    countryType: ACTION_TYPES;
    countryCode: string;
    getCurrent: boolean;
    getFiveDay: boolean;
    countries: Array<CountryCodeModel>;
    inputListenerAttached: boolean;
    weatherDetails: any;
}

/**
 * Handles the main view and user input for the weather app.
 */
export class UserInput extends React.Component<{}, initialState> {

    /**
     * Default Constructor
     * @param props 
     */
    constructor(props: any) {
        super(props);
        this.state = {
            zipcode: 0,
            cityName: '',
            countryType: ACTION_TYPES.DEFAULT_COUNTRY,
            countryCode: 'us',
            getCurrent: true,
            getFiveDay: true,
            countries: [],
            inputListenerAttached: false,
            weatherDetails: null
        };
    }

    /**
     * After the component has loaded--loadsup the countries.
     */
    public async componentDidMount(): Promise<void> {
        const res: any = await axios.get(`${config.apiGatewayUrl}countries`);
        if (res && res.data) {
            const countries = res.data.data;
            this.setState({ countries });
        }
    }

    /**
     * Called everytime AFTER the component has been rendered.
     */
    public componentDidUpdate(): void {

        // Add event listener for Country Select.
        const selectBox = document.getElementById('lstCountries');
        if (selectBox) {
            selectBox.addEventListener("change", (e) => {
                this.handleClick(e, ACTION_TYPES.SELECT_COUNTRY);
            });
        }

        // Add event listener for text input.
        const inputBox = document.getElementById('areaInput');
        if (inputBox && !this.state.inputListenerAttached) {
            const updateState = _.debounce((e) => {
                this.handleClick(e, ACTION_TYPES.TEXT_CHANGE);
            }, 500);
            inputBox.addEventListener("keyup", updateState);
            this.setState({
                inputListenerAttached: true
            });
        }
    }

    /**
     * The public handler for all button clicks in the view.
     * @param $event The event and element that started the event.
     * @param action The action we are wanting to perform that the handler will switch on.
     */
    handleClick = ($event: any, action: string): void => {
        if ($event && action) {
            switch (action) {
                case ACTION_TYPES.TEXT_CHANGE:
                    if ($event.target.value) {
                        // Lets figure out if its a zipcode or a city name
                        if (isNaN($event.target.value)) {
                            this.setState({
                                zipcode: 0,
                                cityName: $event.target.value
                            });
                        } else {
                            this.setState({
                                zipcode: $event.target.value,
                                cityName: ''
                            });
                        }
                    }
                    break;                
                case ACTION_TYPES.CHECK_CURRENT:
                    this.setState({
                        getCurrent: !this.state.getCurrent
                    });
                    break;
                case ACTION_TYPES.CHECK_FIVE_DAY:
                    this.setState({
                        getFiveDay: !this.state.getFiveDay
                    });
                    break;          
                case ACTION_TYPES.DEFAULT_COUNTRY:
                    this.setState({
                        countryType: ACTION_TYPES.DEFAULT_COUNTRY,
                        countryCode: 'us'
                    });
                    break;       
                case ACTION_TYPES.OTHER_COUNTRY:
                    this.setState({
                        countryType: ACTION_TYPES.OTHER_COUNTRY,
                        countryCode: 'us'
                    });
                    break;     
                case ACTION_TYPES.SELECT_COUNTRY:
                    const code = $event.target.selectedOptions[0].value;
                    this.setState({
                        countryCode: code
                    });
                    break;        
                case ACTION_TYPES.SUBMIT:
                    // To prevent the page from refreshing.
                    $event.preventDefault();
                    this.submitForm();
                    break;
                default:
                    console.log('No Matching Action!');
                    break;                                                                                    
            }
        }
    }

    public buildCountrySelectBox(): string {
        let countries: Array<CountryCodeModel> = Object.assign([], this.state.countries);
        const htmlStart: string = `
            <label for="lstCountries">Select Country</label>
            <select class="form-control country-select" id="lstCountries">
        `;
        const buildOption = (val: string, display: string) => {
            return `<option value="${val}">${display}</option>`;
        };
        let options = '';
        forEach(countries, (c) => {
            options += buildOption(c.countryCode, c.countryName);
        });
        const htmlEnd: string = `
            </select>
        `;
        return `${htmlStart}${options}${htmlEnd}`;
    }

    public render(): any {
        return (<div className="container">
                <div className="row">
                <div className="col-sm-12">
                    <div className="input-wrapper">
                    <h3>Drystone Weather</h3>
                    <form onSubmit={(e) => { this.handleClick(e, ACTION_TYPES.SUBMIT) }}>
                        <div className="form-group">
                            <label htmlFor="areaInput">Where are you?</label>
                            <input type="text" className="form-control" id="areaInput" placeholder="Zipcode or City Name" />
                        </div>
                        <div className="form-group">
                            <div className="form-check form-check-inline">
                                <input onClick={(e) => { this.handleClick(e, ACTION_TYPES.CHECK_CURRENT) }} type="checkbox" className="form-check-input" id="chkCurrent" defaultChecked />
                                <label className="form-check-label" htmlFor="chkCurrent">Current</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input onClick={(e) => { this.handleClick(e, ACTION_TYPES.CHECK_FIVE_DAY) }} type="checkbox" className="form-check-input" id="chkFiveDay" defaultChecked />
                                <label className="form-check-label" htmlFor="chkFiveDay">Five Days</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-check form-check-inline">
                                <input onClick={(e) => { this.handleClick(e, ACTION_TYPES.DEFAULT_COUNTRY) }} className="form-check-input" type="radio" name="countryDefault" id="chkDefaultCountry" value="defaultCountry" defaultChecked />
                                <label className="form-check-label" htmlFor="chkDefaultCountry">
                                United States
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input onClick={(e) => { this.handleClick(e, ACTION_TYPES.OTHER_COUNTRY) }} className="form-check-input" type="radio" name="countryDefault" id="chkOtherCountry" value="otherCountry" />
                                <label className="form-check-label" htmlFor="chkOtherCountry">
                                Other
                                </label>
                            </div>
                        </div>
                        <div className="form-group" dangerouslySetInnerHTML={{__html: (this.state ? (this.state.countryType.valueOf() === ACTION_TYPES.OTHER_COUNTRY.valueOf() ? this.buildCountrySelectBox() : '') : '')}}>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    </form>
                </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        {this.state.weatherDetails ? <WeatherCard weatherDetails={this.state.weatherDetails} /> : ''}
                    </div>
                </div>
            </div>
        </div>)
    };

    /**
     * Submits the form and attempts to get weather data for the specified state options.
     */
    private async submitForm(): Promise<void> {
        const service: WeatherService = new WeatherService(Object.assign({}, this.state));
        const weatherDetails: {current: any, fiveDay: any} = await service.getWeatherData();

        // If its null--it means the server encountered an error--otherwise we should have a good object here.
        if (weatherDetails) {
            this.setState({
                weatherDetails: weatherDetails
            });
        }
    }
};
