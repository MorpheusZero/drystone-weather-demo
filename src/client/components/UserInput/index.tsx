import * as React from 'react';

/**
 * The action types we support for the button click handler.
 */
enum ACTION_TYPES {
    SUBMIT = 'submit',
    DEFAULT_COUNTRY = 'default_country',
    OTHER_COUNTRY = 'other_country',
    SELECT_COUNTRY = 'select_country',
    CHECK_CURRENT = 'check_current',
    CHECK_FIVE_DAY = 'check_five_day'
}

/**
 * The initial state to load into the component.
 */
type initialState = {
    zipcode: 0,
    cityName: '',
    countryType: ACTION_TYPES.DEFAULT_COUNTRY,
    countryCode: 'us',
    getCurrent: true,
    getFiveDay: false
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
        // Set the default state of the component.
        //this.handleClick = this.handleClick.bind(this);
    }

    /**
     * The public handler for all button clicks in the view.
     * @param $event The event and element that started the event.
     * @param action The action we are wanting to perform that the handler will switch on.
     */
    handleClick = (): void => {
        console.log('GOT HERE');
        alert('TEST');
    }

    public buildCountrySelectBox(): string {
        const htmlStart: string = `
        <div className="form-group">
            <label htmlFor="lstCountries">Select Country</label>
            <select className="form-control" id="lstCountries">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        </div>
        `;
        return htmlStart;
    }

    public render(): any {
        return (<div className="container">
                <div className="row">
                <div className="col-sm-12">
                    <div className="input-wrapper">
                    <h2>Drystone Weather</h2>
                    <button onClick={() => this.handleClick()} type="button" className="btn btn--default">TEST</button>
                    <form>
                        <div className="form-group">
                        <label htmlFor="areaInput">Where are you?</label>
                        <input type="text" className="form-control" id="areaInput" placeholder="Zipcode or City Name" />
                        </div>
                        <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="countryDefault" id="chkDefaultCountry" value="defaultCountry" checked />
                            <label className="form-check-label" htmlFor="chkDefaultCountry">
                            United States
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="countryDefault" id="chkOtherCountry" value="otherCountry" />
                            <label className="form-check-label" htmlFor="chkOtherCountry">
                            Other
                            </label>
                        </div>
                        {this.state ? (this.state.countryType.valueOf() === ACTION_TYPES.OTHER_COUNTRY.valueOf() ? this.buildCountrySelectBox() : '') : ''}
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>)
    };
};
