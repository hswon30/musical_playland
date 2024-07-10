import React from "react";
import Box from '@mui/material/Box';
import background from './background_2.png'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { maxHeight, maxWidth } from "@mui/system";
import styled from 'styled-components'
import CircularProgress from '@mui/material/CircularProgress';
import { popularity_getCompResults } from "../fetcher"
import AlbumCard from "../components/AlbumCard";
import AnswerCard from "../components/AnswerCard";
import MenuBar from '../components/MenuBar';

const StyledButton = styled(Button)`
    &:hover {
        background-color: #560000
    };
    border-radius: 12;
    background-color: #990000;
    padding: 12px 30px;
    font-size: 16px;
`;

const TRACK1 = "track1"
const TRACK2 = "track2"

export default class WhoSangItBetter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            correctStreak: 0,
            songName: "",
            track1: {},
            track2: {},
            url1: "",
            url2: "",
            isAnswered: false,
            correctAnswer: ""
        }

        this.handleAlbumClick = this.handleAlbumClick.bind(this);
        this.handleNextRoundClick = this.handleNextRoundClick.bind(this);
    }

    handleAlbumClick(track) {
        const isCorrect = track === this.state.correctAnswer

        this.setState({
            ...this.state,
            correctStreak: isCorrect ? this.state.correctStreak + 1 : 0,
            isAnswered: true
        })
    }

    async fetchNewSongInfo() {
        this.setState({ ...this.state, isLoading: true })
        const popCompResults = await popularity_getCompResults();

        const trackTitle = popCompResults.results[0].TrackName
        const url1 = JSON.parse(popCompResults.results[0].AlbumImages.replace(/'/g, '"'))[0].url
        const url2 = JSON.parse(popCompResults.results[1].AlbumImages.replace(/'/g, '"'))[0].url
        const pop1 = popCompResults.results[0].TrackPopularity
        const pop2 = popCompResults.results[1].TrackPopularity

        this.setState({ 
            isLoading: false,
            correctStreak: this.state.correctStreak,
            songName: trackTitle,
            track1: popCompResults.results[0],
            track2: popCompResults.results[1],
            url1: url1,
            url2: url2,
            isAnswered: false,
            correctAnswer: pop1 >= pop2 ? TRACK1 : TRACK2
        })
    }

    async handleNextRoundClick(event) {
        await this.fetchNewSongInfo()
    }

    async componentDidMount() {
        await this.fetchNewSongInfo()
    }

    render() {
        return (
          <div>
            <MenuBar />
            <Box sx={{ width: maxWidth, height: maxHeight, backgroundImage:`url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', boxShadow: 1}} >
                <Box sx={{backgroundImage:`url(${background})`, pt: 8, pb: 50 }} >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h3"
                            align="center"
                            color="#536878"
                            gutterBottom
                        >
                            Who sang it better?
                        </Typography>

                        {!this.state.isLoading &&
                            <Typography variant="h5" align="center" color="black" paragraph sx={{ textDecoration: 'underline' }} >
                                {this.state.songName}
                            </Typography>
                        }

                        {this.state.isLoading && 
                            <Stack alignItems='center' justifyContent='center' style={{ height: '100%' }}>
                                <CircularProgress style={{ 'color': 'white' }} />
                            </Stack>
                        }

                        {!this.state.isLoading && !this.state.isAnswered &&
                            <Stack 
                                sx={{ pt: 2 }}
                                direction="row"
                                spacing={8}
                                justifyContent="center"
                            >
                                <AlbumCard
                                    track={TRACK1}
                                    url={this.state.url1}
                                    artistName={this.state.track1.ArtistName}
                                    handleClick={this.handleAlbumClick}
                                />
                                <AlbumCard
                                    track={TRACK2}
                                    url={this.state.url2}
                                    artistName={this.state.track2.ArtistName}
                                    handleClick={this.handleAlbumClick}
                                />
                            </Stack>
                        }
                        {!this.state.isLoading && this.state.isAnswered &&
                            <Stack 
                                sx={{ pt: 2 }}
                                direction="row"
                                spacing={8}
                                justifyContent="center"
                            >
                                <AnswerCard 
                                    isCorrect={this.state.correctAnswer === TRACK1}
                                    artistName={this.state.track1.ArtistName}
                                    trackId={this.state.track1.TrackId}
                                />
                                <AnswerCard 
                                    isCorrect={this.state.correctAnswer === TRACK2}
                                    artistName={this.state.track2.ArtistName}
                                    trackId={this.state.track2.TrackId}
                                />
                            </Stack>
                        }
                        <Typography sx={{ pt: 3 }} color = "black" align="center">
                            Current streak: {this.state.correctStreak}
                        </Typography>
                        {!this.state.isLoading && this.state.isAnswered &&
                            <Box sx={{ pt: 3 }} textAlign='center'>
                                <StyledButton variant='contained' onClick={this.handleNextRoundClick}>
                                    Next round
                                </StyledButton>
                            </Box>
                        }
                    </Container>
                </Box>
            </Box>

        </div>        
        )
        
    }
}