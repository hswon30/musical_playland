import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";


import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import { wordcloud_artists } from '../fetcher'


import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;


class WordCloudPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artistName: "",
            searchResults: []
        }

        this.handleArtistQueryChange = this.handleArtistQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
    }


    handleArtistQueryChange(event) {
        this.setState({ artistName: event.target.value })
    }

     
    updateSearchResults() {
        wordcloud_artists(this.state.artistName).then(res => {
            this.setState({ searchResults: res.results })
        })
    }

    componentDidMount() {
        wordcloud_artists(this.state.artistName).then(res => {
            this.setState({ searchResults: res.results })
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
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>

                <Divider />

                {/* result is in this.state.searchResults  */}
            
            </div>
        )
    }
}

export default WordCloudPage

    

