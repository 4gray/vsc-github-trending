import * as React from 'react';
import './App.css';

import { Card, Grid } from '@material-ui/core';
import DateSelect from './DateSelect';
import LanguageSelect from './LanguageSelect';

class Header extends React.Component<any> {
    public render() {
        return (
            <Card className="Header">
                <Grid container={true} spacing={24}>
                    <Grid item={true} xs={3}>
                        <LanguageSelect
                            className="LanguageSelect"
                            languages={this.props.languages}
                            selectedLanguage={this.props.selectedLanguage}
                            onChange={this.props.onFilterChange}
                        />
                    </Grid>
                    <Grid item={true} xs={true}>
                        <DateSelect
                            className="DateSelect"
                            intervals={this.props.intervals}
                            selectedInterval={this.props.selectedInterval}
                            onChange={this.props.onFilterChange}
                        />
                    </Grid>
                </Grid>
            </Card>
        );
    }
}

export default Header;
