import React from 'react';
import background from './teampage.jpg';
import MenuBar from '../components/MenuBar';

class AboutPage extends React.Component{
   render(){
    return (
        <div align='center'>
             <MenuBar />
            <div>
          <img src={background} />
        </div>
        </div>
      );
   }
}

export default AboutPage;