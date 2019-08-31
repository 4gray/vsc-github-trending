import * as React from 'react';
import RepositoryItem from './RepositoryItem';

class RepositoryContainer extends React.Component<any, any> {
    public render() {
        return (
            <div>
                {this.props.repositories.map((item: any, index: number) => (
                    <RepositoryItem key={index} item={item} />
                ))}
            </div>
        );
    }
}

export default RepositoryContainer;
