import { Chip, Link, Tooltip } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import StarIcon from '@material-ui/icons/Star';
import * as React from 'react';
import './RepositoryItem.css';
import { Repository } from './App';

/**
 * Component props
 */
type RepositoryItemProps = {
    item: Repository;
};

/**
 * Repository Item component
 * Component with material card represents single repository item
 */
class RepositoryItem extends React.Component<RepositoryItemProps> {
    /**
     * Format amount of stars if the number is bigger then 999
     * @param num number of stars
     */
    formatStars(num: number) {
        return num > 999 ? (num / 1000).toFixed(1) + 'k' : num;
    }

    render() {
        return (
            <Card
                title={this.props.item.name}
                key={this.props.item.url}
                className="Item">
                <CardContent>
                    <Typography variant="h6" component="h6">
                        <a href={this.props.item.url}>
                            {this.props.item.author} / {this.props.item.name}
                        </a>
                    </Typography>
                    {this.props.item.description}
                </CardContent>
                <CardActions
                    className="CardActions"
                    disableActionSpacing={true}>
                    <Tooltip title="Language" aria-label="Language">
                        <Chip
                            label={this.props.item.language}
                            variant="outlined"
                            className="chip"
                        />
                    </Tooltip>

                    <Tooltip title="Stars" aria-label="Stars">
                        <Chip
                            icon={<StarIcon />}
                            label={this.formatStars(this.props.item.stars)}
                            variant="outlined"
                            className="chip"
                        />
                    </Tooltip>

                    <Tooltip title="Forks" aria-label="Forks">
                        <Chip
                            icon={<CallSplitIcon />}
                            label={this.formatStars(this.props.item.forks)}
                            variant="outlined"
                            className="chip"
                        />
                    </Tooltip>

                    {this.props.item.builtBy.map((person: any) => (
                        <Tooltip
                            key={person.username}
                            title={person.username}
                            aria-label={person.username}>
                            <Link href={person.href}>
                                <img
                                    alt="avatar"
                                    src={person.avatar}
                                    width={30}
                                    height={30}
                                    className="avatar"
                                />
                            </Link>
                        </Tooltip>
                    ))}
                </CardActions>
            </Card>
        );
    }
}

export default RepositoryItem;
