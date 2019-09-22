import * as React from 'react';
import RepositoryItem from './RepositoryItem';
import { Repository } from './App';

/**
 * Component props
 */
type RepositoryContainerProps = {
    repositories: Repository[];
};

/**
 * Container wrapper component with repository items
 */
class RepositoryContainer extends React.Component<RepositoryContainerProps> {
    render() {
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
