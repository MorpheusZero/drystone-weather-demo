import * as React from 'react';
import config from '../../../../config/config';
import * as moment from 'moment';

/**
 * Handles the main view and user input for the weather card details.
 */
export class WeatherCard extends React.Component<{ weatherDetails: any}, any> {

    /**
     * Default Constructor
     * @param props 
     */
    constructor(props: any) {
        super(props);
    }

    /**
     * Builds the container for the current conditions card.
     * @param name 
     * @param main 
     * @param wind 
     * @param weather 
     */
    private buildCurrentConditionsCard(name: string, main: any, wind: any, weather: any, sys: any): string {
        const iconPath: string = config.iconBaseUrl.replace('{ICON}', weather[0].icon);
        return `
        <div class="condition-card">
            <h4 class="center weight--bold">${name}</h4>
    <p class="center"><img src="${iconPath}"></img></p>
            <p>Wind: ${Math.round(wind.speed)} mph</p>
            <p>Humidity: ${Math.round(main.humidity)}</p>
            <p>Current Temp: ${Math.round(main.temp)}&deg;F</p>
            <p>High: ${Math.round(main.temp_max)}&deg;F</p>
            <p>Low: ${Math.round(main.temp_min)}&deg;F</p>
        </div>
        `;
    }

    private buildForecastCard(name: string, list: Array<any>): string {
        let daysReplaceString = '';
        for (let i = 1; i <= 40; i = i + 8) {
            const iconPath: string = config.iconBaseUrl.replace('{ICON}', list[i].weather[0].icon);
            daysReplaceString += `
            <p>
            <span class="weight--bold">${moment(list[i].dt_txt).format("MMM Do YYYY")}</span>
            <br />
            <img class="icon" src="${iconPath}"></img> H:${Math.round(list[i].main.temp_max)}&deg;F L:${Math.round(list[i].main.temp_min)}&deg;F
            </p>
            `;
        }
        return `
        <div class="condition-card">
            <h4 class="center weight--bold">${name}</h4>
            ${daysReplaceString}
        </div>
        `;
    }

    public render(): any {
        return (
        <div>
            <div className="form-group block-margin--right" dangerouslySetInnerHTML={{__html: (this.props.weatherDetails && this.props.weatherDetails.current) ? this.buildCurrentConditionsCard(this.props.weatherDetails.current.name, this.props.weatherDetails.current.main, this.props.weatherDetails.current.wind, this.props.weatherDetails.current.weather, this.props.weatherDetails.current.sys) : ''}}></div>
            <div className="form-group block-margin--right" dangerouslySetInnerHTML={{__html: (this.props.weatherDetails && this.props.weatherDetails.fiveDay) ? this.buildForecastCard(this.props.weatherDetails.fiveDay.city.name, this.props.weatherDetails.fiveDay.list) : ''}}></div>
        </div>
    )
    }

}