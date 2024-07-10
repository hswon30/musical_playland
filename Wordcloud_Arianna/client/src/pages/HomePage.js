import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
 

 
class HomePage extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
         <MenuBar />
        
      </div>  
    )
  }
}

export default HomePage

