import { NativeSelect } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import * as React from 'react';
import './App.css';
import { Language } from './App';

/**
 * Component props
 */
type LanguageSelectProps = {
    className: string;
    selectedLanguage: string;
    onChange?(event: any): void;
    languages: Language[];
};

/**
 * Language selector component
 */
class LanguageSelect extends React.Component<LanguageSelectProps> {
    render() {
        return (
            <form autoComplete="off">
                <FormControl className="repo-field">
                    <InputLabel shrink className="label" htmlFor="language">
                        Language
                    </InputLabel>
                    <NativeSelect
                        className="LanguageSelect"
                        value={this.props.selectedLanguage}
                        onChange={this.props.onChange}
                        inputProps={{
                            id: 'language',
                            name: 'selectedLanguage',
                        }}>
                        <option disabled={true}>Select language</option>
                        <option key="" value="">
                            All languages
                        </option>
                        {this.props.languages.map((lang: any) => (
                            <option key={lang.urlParam} value={lang.urlParam}>
                                {lang.name}
                            </option>
                        ))}
                    </NativeSelect>
                </FormControl>
            </form>
        );
    }
}

export default LanguageSelect;
