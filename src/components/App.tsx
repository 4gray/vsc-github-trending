import {
    CircularProgress,
    createMuiTheme,
    MuiThemeProvider,
} from '@material-ui/core';
import {} from '@material-ui/core';
import * as React from 'react';
import Header from './Header';
import './Header.css';
import RepositoryContainer from './RepositoryContainer';

class App extends React.Component<any> {
    private BASE_API_URL = 'https://github-trending-api.now.sh';

    public state = {
        intervals: ['daily', 'weekly', 'monthly'],
        languages: { all: [], popular: [] },
        loading: true,
        repositories: [],
        selectedInterval: 'daily',
        selectedLanguage: 'javascript',
    };

    public languages: string[] = [];

    public theme = createMuiTheme({
        palette: {
            type: 'dark',
        },
        typography: {
            useNextVariants: true,
        },
    });

    public componentDidMount() {
        // Handle messages sent from the extension to the webview
        window.addEventListener('message', async event => {
            this.setState({ loading: true });
            const message = event.data; // The json data that the extension sent
            switch (message.command) {
                case 'configuration':
                    this.languages = message.config.languages;
                    this.state.selectedLanguage =
                        message.config.selectedLanguage;
                    this.state.selectedInterval =
                        message.config.selectedInterval;
                    await this.getRepositories();
                    await this.getLanguages();
                    this.setState({ loading: false });
                    break;
            }
        });
    }

    public getLanguages() {
        return fetch(this.BASE_API_URL + '/languages')
            .then(response => response.json())
            .then(data => {
                // TODO: create model
                data = data.filter(
                    (item: { name: string; urlParam: string }) =>
                        this.languages.indexOf(item.urlParam) !== -1
                );
                this.setState({
                    languages: {
                        all: data,
                    },
                });
            });
    }

    public getRepositories() {
        this.setState({ loading: true });
        return fetch(
            this.BASE_API_URL +
                '/repositories?language=' +
                this.state.selectedLanguage +
                '&since=' +
                this.state.selectedInterval
        )
            .then(response => response.json())
            .then(data =>
                this.setState({ repositories: data, loading: false })
            );
    }

    public handleFilterChange = (event: any) => {
        this.setState({ [event.target.name]: event.target.value }, () =>
            this.getRepositories()
        );
    };

    public render() {
        let content;

        if (this.state.loading) {
            content = <CircularProgress className="spinner" />;
        } else {
            content = (
                <RepositoryContainer repositories={this.state.repositories} />
            );
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
                            onFilterChange={this.handleFilterChange}
                        />
                        {content}
                    </div>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }
}

export default App;
