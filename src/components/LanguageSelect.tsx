import { NativeSelect } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import * as React from 'react';
import './App.css';

class LanguageSelect extends React.Component<any, any> {

    public render() {
        return (
            <form autoComplete="off">
                <FormControl className="repo-field">
                    <InputLabel className="label" htmlFor="language">Language</InputLabel>
                    <NativeSelect
                        className="LanguageSelect"
                        value={this.props.selectedLanguage}
                        onChange={this.props.onChange}
                        inputProps={{
                            id: 'language',
                            name: 'selectedLanguage'
                        }}>
                        <option disabled={true}>
                            All languages
                        </option>
                        {this.props.languages.all.map((lang: any) =>
                            <option key={lang.urlParam} value={lang.urlParam}>{lang.name}</option>
                        )}
                    </NativeSelect>
                </FormControl>
            </form>
        );
    }
}

export default LanguageSelect;
