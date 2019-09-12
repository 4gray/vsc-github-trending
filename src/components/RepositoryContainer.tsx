import * as React from 'react';
import RepositoryItem from './RepositoryItem';

/**
 * Container wrapper component with repository items
 */
class RepositoryContainer extends React.Component<any, any> {
    public render() {
        return (
            <>
                {this.props.repositories.map((item: any, index: number) => (
                    <RepositoryItem key={index} item={item} />
                ))}
            </>
        );
    }
}

export default RepositoryContainer;
