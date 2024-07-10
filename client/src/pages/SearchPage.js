import React from 'react';
import {useLocation} from "react-router-dom";
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import background from "./background_2.png"

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import { 
    playlist_getAllSongs, 
    playlist_getPlaylist, 
    playlist_search, 
    playlist_getSong, 
    playlist_insertSong
} from '../fetcher'

import MenuBar from '../components/MenuBar';


const { Column, ColumnGroup } = Table;



class SearchPage extends React.Component {    
    constructor(props) {
        super(props)
        this.state = {
            artistName: "",
            trackName: "",
            searchResults: [],
            selectedTrackId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedTrackDetails: null,
            columns: [
               
                {
                    title: "TrackName",
                    dataIndex: "TrackName",
                    key: "TrackName"
                },
                {
                    title: "Preview",
                    dataIndex: "Preview",
                    render: (text, record) => 
                    <audio controls>
                        <source src={text} type="audio/mpeg" />
                    </audio>
                },
                {
                    title: "AlbumName",
                    dataIndex: "AlbumName",
                    key: "AlbumName"
                },
                {
                    title: "Cover",
                    dataIndex: 'Cover',
                    render: (text, record) => <img src={JSON.parse(text.replaceAll("'", '"'))[2].url} width="64" height="64" />
                },
                {
                    title: "ArtistName",
                    dataIndex: "ArtistName",
                    key: "ArtistName"
                },
                {
                    title: "Genre",
                    dataIndex: "Genre",
                    render: (text, record) => JSON.parse(text.replaceAll("'", '" '))
                },
                
            ]

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
        
        // console.log(search);
        // console.log(this.props.location)
        let params = (new URL(document.location)).searchParams;
        console.log(document.location)
        // console.log(params)
        let title = params.get("title");
        let artist = params.get("artist");
        // console.log(title, artist)
        console.log(typeof(title), typeof(artist))
        console.log(title, artist)

        // if (title !== '' && title !== null && title !== undefined ) {
        if (document.location.search !== '') {
            this.state.artistName = artist;
            this.state.trackName = title;        
            this.updateSearchResults();

        }

        playlist_search(this.state.artistName, this.state.trackName, null, null).then(res => {
            this.setState({ searchResults: res.results })
        })

        playlist_getSong(this.state.selectedTrackId).then(res => {
            this.setState({ selectedTrackDetails: res.results })
        })
    }

    render() {
        return (
            <div style={{backgroundImage:`url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <MenuBar />

                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh'}}>
                    <Row>
                        <Col flex={2}>
                            <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                                <label>Artist Name</label>  
                                <FormInput placeholder="Artist Name" value={this.state.artistName} onChange={this.handleArtistQueryChange} />
                            </FormGroup>
                        </Col>
                        <Col flex={2}>
                            <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                                <label>Track Name</label>
                                <FormInput placeholder="Track Name" value={this.state.trackName} onChange={this.handleTrackQueryChange} />
                            </FormGroup>
                        </Col>
                        <Col flex={2}>
                            <FormGroup style={{ width: '10vw' }}>
                                <Button  pill theme="secondary" style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>

                <Divider />

                {/* Copy over your implementation of the matches table from the home page */}
                <div style={{ width: '80vw', margin: '0 auto', marginTop: '5vh', }}>
                    <Table 
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {this.goToTrack(record.TrackId)}, 
                            };
                        }} 
                        dataSource={this.state.searchResults} 
                        pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}
                        columns={this.state.columns}
                        // expandable={{
                        //     expandedRowRender: (record) => (
                        //         // <p style={{ margin: 0 }}>{JSON.stringify(record)}</p>
                        //         <Row type="flex" align="center">
                        //             <p style={{ margin: 0 }}>{JSON.stringify(record)}</p>
                        //             <audio controls>
                        //                 <source type="audio/mpeg" />
                        //             </audio>
                        //         </Row>
                        //     ),
                        //     onExpand: (expanded, record) => console.log("onExpand: ", record, expanded)
                        // }}
                    >
                    </Table>
                </div>
            
            </div>
        )
    }
}

export default SearchPage;


