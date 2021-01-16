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

/**
 * Representation of language item objects received from Github Trending API
 */
export type Language = { name: string; urlParam: string };

/**
 * Representation of repository item objects received from Github Trending API
 */
export type Repository = {
    author: string;
    name: string;
    avatar: string;
    url: string;
    description: string;
    language: string;
    languageColor: string;
    stars: number;
    forks: number;
    currentPeriodStars: number;
    builtBy: Developer[];
};

/**
 * Representation of developer objects received from Github Trending API
 */
type Developer = {
    username: string;
    href: string;
    avatar: string;
};

/**
 * App state representation
 */
type AppState = {
    intervals: string[];
    languages: Language[];
    loading: boolean;
    repositories: Repository[];
    selectedInterval: string;
    selectedLanguage: string;
};

/**
 * App component
 */
class App extends React.Component<any, AppState> {
    /** Base URL of Github Trending API */
    BASE_API_URL = 'https://gtrend.yapie.me';

    state: AppState = {
        /** trending interval */
        intervals: ['daily', 'weekly', 'monthly'],
        /** list with fetched languages */
        languages: [],
        /** loading state */
        loading: true,
        /** list with fetched repositories */
        repositories: [],
        /** user selected option for trending interval */
        selectedInterval: 'daily',
        /** user selected option for language */
        selectedLanguage: 'javascript',
    };

    /** List with strings (urlParam) of preferred languages */
    languages: string[] = [];

    /** Dark theme setting for components */
    theme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });

    /**
     * Register listener to get message with configuration from the extension file
     */
    componentDidMount() {
        // Handle messages sent from the extension to the webview
        window.addEventListener('message', async (event: any) => {
            this.setState({ loading: true });
            const message = event.data; // The json data that the extension sent
            if (message.command === 'configuration') {
                // set received configuration
                this.languages = message.config.languages;
                this.state.selectedLanguage = message.config.selectedLanguage;
                this.state.selectedInterval = message.config.selectedInterval;
                await this.getRepositories();
                await this.getLanguages();
                this.setState({ loading: false });
            }
        });
    }

    /**
     * Sends request to get and set all languages
     */
    getLanguages() {
        return fetch(this.BASE_API_URL + '/languages')
            .then(response => response.json())
            .then(data => {
                data = data.filter(
                    (item: Language) =>
                        this.languages.indexOf(item.urlParam) !== -1
                );
                this.setState({
                    languages: data,
                });
            });
    }

    /**
     * Sends request to get and set all repositories
     */
    getRepositories() {
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

    /**
     * Changes component state (selectedInterval or selectedLanguage) on filter change
     */
    handleFilterChange = (event: any) => {
        const { target } = event;
        const { name, value } = target;
        if (name === 'selectedInterval') {
            this.setState(
                { selectedInterval: value },
                this.getRepositories.bind(this)
            );
        } else if (name === 'selectedLanguage') {
            this.setState(
                { selectedLanguage: value },
                this.getRepositories.bind(this)
            );
        }
    };

    render() {
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
