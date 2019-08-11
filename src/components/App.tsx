import { CircularProgress, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { } from '@material-ui/core';
import * as React from 'react';
import Header from './Header';
import './Header.css';
import RepositoryContainer from './RepositoryContainer';

class App extends React.Component<any> {

    public state = {
        intervals: ['daily', 'weekly', 'monthly'],
        languages: { all: [], popular: [] },
        loading: true,
        repositories: [],
        selectedInterval: 'daily',
        selectedLanguage: 'javascript'
    };

    public theme = createMuiTheme({
        palette: {
            type: 'dark',
        },
        typography: {
            useNextVariants: true
        }
    });

    public componentDidMount() {
        Promise.all([
            this.getRepositories(),
            this.getLanguages()
        ]).then(result => {
            this.setState({ loading: false });
        });
    }

    public getLanguages() {
        fetch('https://github-trending-api.now.sh/languages')
            .then(response => response.json())
            .then(
                data => this.setState({
                    languages: {
                        all: data
                    }
                })
            );
    }

    public getRepositories() {
        this.setState({ loading: true });
        fetch('https://github-trending-api.now.sh/repositories?language=' + this.state.selectedLanguage
            + '&since=' + this.state.selectedInterval)
            .then(response => response.json())
            .then(data => this.setState({ repositories: data, loading: false }));
    }

    public handleFilterChange = (event: any) => {
        this.setState({ [event.target.name]: event.target.value }, () => this.getRepositories());
    }

    public render() {
        let content;

        if (this.state.loading) {
            content = <CircularProgress className="spinner" />
        } else {
            content = <RepositoryContainer repositories={this.state.repositories} />
        }
        return (
            <React.Fragment>
                <MuiThemeProvider theme={this.theme}>

                    <div className="App">
                        <Header
                            languages={this.state.languages}
                            intervals={this.state.intervals}
                            selectedInterval={this.state.selectedInterval}
                            selectedLanguage={this.state.selectedLanguage}
                            onFilterChange={this.handleFilterChange} />
                        {content}
                    </div>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }
}

export default App;
