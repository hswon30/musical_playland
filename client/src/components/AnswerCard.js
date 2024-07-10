import React from "react";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { popularity_getSong } from "../fetcher"

const COLOR_CORRECT = "green"
const COLOR_INCORRECT = "red"

export default class AnswerCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            trackInfo: {}
        }
    }

    async componentDidMount() {
        const popularity = await popularity_getSong(this.props.trackId)

        this.setState({ loading: false, trackInfo: popularity.results[0] })
    }

    render() {
        return (
            <Card style={{ 
                backgroundColor: this.props.isCorrect ? COLOR_CORRECT : COLOR_INCORRECT,
                height: 275, 
                width: 200
            }}>
                <CardContent style={{ width: '100%', height: '100%' }}>
                    <Typography variant="h6" component="div" style={{ paddingBottom: '5%' }}>
                        {this.props.artistName}
                    </Typography>

                    {this.state.loading && 
                        <Stack alignItems='center' justifyContent='center' style={{ height: '100%' }}>
                            <CircularProgress style={{ 'color': 'white' }} />
                        </Stack>
                    }

                    {!this.state.loading &&
                        <ul style={{ paddingLeft: 10 }}>
                            <li sx={{ display: 'list-item' }}>
                                Artist popularity: {this.state.trackInfo.artist_popularity}
                            </li>
                            <li sx={{ display: 'list-item' }}>
                                Artist followers: {this.state.trackInfo.ArtistFollowers}
                            </li>
                        </ul>
                    }
                </CardContent>
            </Card>
        )
    }
}