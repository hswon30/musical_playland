import React from "react";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default class AlbumCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card style={{ height: 275, width: 200 }}>
                <CardActionArea 
                    component={Button} 
                    onClick={() => this.props.handleClick(this.props.track)}
                    style={{ height: '100%', width: '100%' }}
                >
                    <CardMedia
                        component="img"
                        height="200"
                        src={this.props.url}
                        alt="Album artwork"
                    />
                    <CardContent height="75">
                        <Typography variant="h8" component="div">
                            {this.props.artistName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}