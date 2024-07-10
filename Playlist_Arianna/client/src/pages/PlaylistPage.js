import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";


import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import { playlist_getAllSongs, playlist_getPlaylist, playlist_search, playlist_getSong, playlist_insertSong
} from '../fetcher'


import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;


class PlaylistPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artistName: "",
            trackName: "",
            searchResults: [],
            selectedTrackId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedTrackDetails: null

        }

        this.handleArtistQueryChange = this.handleArtistQueryChange.bind(this)
        this.handleTrackQueryChange = this.handleTrackQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToTrack = this.goToTrack.bind(this)
    }


    handleArtistQueryChange(event) {
        this.setState({ artistName: event.target.value })
    }

    handleTrackQueryChange(event) {
        this.setState({ trackName: event.target.value })
    }

    goToTrack(trackId) {
        window.location = `/playlist/onesong?id=${trackId}`
        
    }

    updateSearchResults() {
        playlist_search(this.state.artistName, this.state.trackName, null, null).then(res => {
            this.setState({ searchResults: res.results })
        })
    }


    componentDidMount() {
        playlist_search(this.state.artistName, this.state.trackName, null, null).then(res => {
            this.setState({ searchResults: res.results })
        })

        playlist_getSong(this.state.selectedTrackId).then(res => {
            this.setState({ selectedTrackDetails: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />

                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Artist Name</label>
                            <FormInput placeholder="Artist Name" value={this.state.artistName} onChange={this.handleArtistQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Track Name</label>
                            <FormInput placeholder="Track Name" value={this.state.trackName} onChange={this.handleTrackQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>

                <Divider />

                {/* Copy over your implementation of the matches table from the home page */}
                <div style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Table onRow={(record, rowIndex) => {
                        return {
                        onClick: event => {this.goToTrack(record.TrackId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
                        };
                    }} dataSource={this.state.searchResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                        <ColumnGroup>
                        <Column title="TrackId" dataIndex="TrackId" key="TrackId"/>
                        <Column title="TrackName" dataIndex="TrackName" key="TrackName"/>
                        <Column title="Preview" dataIndex="Preview" key="Preview"/>
                        <Column title="AlbumName" dataIndex="AlbumName" key="AlbumName"/>
                        <Column title="Cover" dataIndex="Cover" key="Cover"/>
                        <Column title="ArtistName" dataIndex="ArtistName" key="ArtistName"/>
                        <Column title="Genre" dataIndex="Genre" key="Genre"/>
                        </ColumnGroup>
                    </Table>
                </div>
            
            </div>
        )
    }
}

export default PlaylistPage

    

