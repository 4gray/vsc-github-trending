import { NativeSelect } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import * as React from 'react';
import './App.css';

class DateSelect extends React.Component<any, any> {
    public render() {
        return (
            <form autoComplete="off">
                <FormControl className="repo-field">
                    <InputLabel className="label" htmlFor="interval">
                        Trending for:
                    </InputLabel>
                    <NativeSelect
                        className="DateSelect"
                        value={this.props.selectedInterval}
                        onChange={this.props.onChange}
                        inputProps={{
                            id: 'interval',
                            name: 'selectedInterval',
                        }}>
                        {this.props.intervals.map(
                            (item: string, index: number) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            )
                        )}
                    </NativeSelect>
                </FormControl>
            </form>
        );
    }
}

export default DateSelect;
