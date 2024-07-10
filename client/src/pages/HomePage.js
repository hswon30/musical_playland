// @mui material components
import Box from "@mui/material/Box";
import Button from '@mui/material/Button'
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel"
// import Menu from '@mui/material/Menu';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography"
import { blue } from "@mui/material/colors";

import MenuBar from '../components/MenuBar';

import React, { useState } from "react";

function MainPage() {
  
  const bgColor = blue[50];
  const buttonColor = blue[500];

  const [option, setOption] = useState('');
  const onSelectOption = (event) => {
    setOption(event.target.value);
  };
  const [value, setValue] = useState('');

  return (
    <>
      <MenuBar />
      <Box
        minHeight="95vh"
        width="100%"
        sx={{
          backgroundColor: bgColor,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <Typography
              variant="h3"
              color="black"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                },
              })}
            >
              Musical Playland
            </Typography>
            <Typography
              variant="body1"
              color="black"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
              sx={{
                width: 1,
              }}
            >
              {/* FIXME this is where the setence goes in  */}
            </Typography>
            <Box 
              display='flex'
              justifyContent='space-between'
              mt={2} 
              sx={{
                  width: 1,
                }} 
            >
              <FormControl 
                size="large"
                sx={{
                  color: buttonColor,
                  width: '18%',
                  m: 1,
                }}
              >
                <InputLabel id="search-option-select-label">OPTIONS</InputLabel>
                <Select
                  labelId="search-option-select-label"
                  id="search-option-select"
                  value={option}
                  label="Options"
                  onChange={onSelectOption}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'title'}>Title</MenuItem>
                  <MenuItem value={'artist'}>Artist</MenuItem>
                </Select>
              </FormControl>
              <TextField 
                type="text"
                label="Search songs by title or artist name" 
                variant="standard" 
                sx={{
                  borderColor: "transparent",
                  width: '60%',
                }}
                value={value} 
                onChange={(e) => setValue(e.target.value)}
              />
              <Button 
                variant="outlined" 
                sx={{
                  color: buttonColor,
                  align: 'right',
                  width: '15%',
                }}
                onClick={event => {
                  if (option === 'title') {
                    // console.log(`/search?title=${value}&artist=`)
                    window.location.href=`/search?title=${value}&artist=`
                  } else if (option === 'artist') {
                    // console.log(`/search?title=&artist=${value}`)
                    window.location.href=`/search?title=&artist=${value}`
                  } else {
                    console.log(`/search?title=${value}&artist=${value}`)
                    window.location.href=`/search?title=${value}&artist=${value}` 
                  }
                  
                  // window.location.href='/search?title={$}&keyword={$}'}
                // onClick={() => { window.location.href='/search/{$this.option=option}'
                  
                // }}
                }
              }
              >
                SEARCH
              </Button >
            </Box>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default MainPage;

// import React from 'react';
// import {
//   Table,
//   Pagination,
//   Select
// } from 'antd'

// import MenuBar from '../components/MenuBar';
 

 
// class HomePage extends React.Component {

//   constructor(props) {
//     super(props)
//   }

//   render() {
//     return (
//       <div>
//          <MenuBar />
        
//       </div>  
//     )
//   }
// }

// export default HomePage

