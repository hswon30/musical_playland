import ReactDOM from 'react-dom';
import React from 'react';
// import * as d3 from 'd3';
import ReactWordcloud from 'react-wordcloud';
import { useMemo } from 'react';

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
            searchResults: [],
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
       
        let words = [
            {
              text: 'told',
              value: 64,
            },
            {
              text: 'mistake',
              value: 11,
            },
            {
              text: 'thought',
              value: 16,
            },
            {
              text: 'bad',
              value: 17,
            },
          ];
         
        
        // let words = [this.state.searchResults];

        // const words = [this.state.searchResults];

          const callbacks = {
            getWordColor: word => word.value > 50 ? "blue" : "red",
            onWordClick: console.log,
            onWordMouseOver: console.log,
            getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "Album Name" : "Track Name"}]`,
          }
          const size = [800, 700];
          const options = {
            rotations: 3,
            rotationAngles: [-90, 0],
            fontsizes: [300,300],
            // fontWeight: 400,
          };

        //   const size = useMemo(() => {
        //     return [400, 300];
        //   }, []);
        //   const size = [600, 400];
          

          function SimpleWordcloud() {
            // return <ReactWordcloud words={words} />
            return (
                <ReactWordcloud
                //   callbacks={callbacks}
                  options={options}
                  size={size}
                  words={finalWords}
                />
              );
          }

          function toArr(arr){
            let output = []
            if (arr.length > 100){
                arr = arr.slice(0,50)
            }
            for(let i = 0; i < arr.length;i++){
                var str1 = JSON.stringify(arr[i]);
                const words1 = str1.split(/:|,/);
                let newArr = [];
                for(let i = 0; i < words1.length; i++) {
                    let newWord = words1[i].replace(/{|"|}/, "");
                    let newWord1 = newWord.replace(/{|"|}/, "");
                    let newWord2 = newWord1.replace(/{|"|}/, "");
                    newArr.push(newWord2)
                }
                if (!Object.values(output).includes(newArr[1])){
                    output.push({text: newArr[1],value:64})
                }
                if (!Object.values(output).includes(newArr[5])){
                    output.push({text:newArr[5],value:64})
                }
          }
          return output;
        }


          var test = this.state.searchResults
          var test1 = JSON.stringify(test)
          var test2 = test1.substring(3,12)
          let finalWords = toArr(test)




        return (
            
            <div> 
                
                <MenuBar />

                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh'}}>
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
                
                
                <div style={{ width: '60vw', margin: '0 auto', marginTop: '15vh' }}>
                {SimpleWordcloud()}
                </div>
            </div>

            
        )
    }
}

export default WordCloudPage

    

