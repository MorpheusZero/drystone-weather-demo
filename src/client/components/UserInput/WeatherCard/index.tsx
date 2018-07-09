import * as React from 'react';
import config from '../../../../config/config';

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

    
    private buildConditionsCard(name: string, main: any, wind: any, weather: any): string {
        const iconPath: string = config.iconBaseUrl.replace('{ICON}', weather[0].icon);
        return `
        <div class="">
            <p>${name}</p>
            <img src="${iconPath}"></img>
            <p>Wind: ${wind.speed}</p>
            <p>Humidity: ${main.humidity}</p>
            <p>Current Temp: ${main.temp}</p>
            <p>High: ${main.temp_max}</p>
            <p>Low: ${main.temp_min}</p>
        </div>
        `;
    }

    public render(): any {
        return (<div className="form-group" dangerouslySetInnerHTML={{__html: (this.props.weatherDetails && this.props.weatherDetails.current) ? this.buildConditionsCard(this.props.weatherDetails.current.name, this.props.weatherDetails.current.main, this.props.weatherDetails.current.wind, this.props.weatherDetails.current.weather) : ''}}></div>)
    }

}