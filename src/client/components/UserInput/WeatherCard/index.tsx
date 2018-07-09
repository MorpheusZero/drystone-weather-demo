import * as React from 'react';

/**
 * Handles the main view and user input for the weather card details.
 */
export class WeatherCard extends React.Component<{ weatherDetails: any}, {}> {

    /**
     * Default Constructor
     * @param props 
     */
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    
    private buildConditionsCard(): string {
        return `
        <div class="">

        </div>
        `;
    }

    public render(): any {
        return (<div>TEST</div>);
    }

}