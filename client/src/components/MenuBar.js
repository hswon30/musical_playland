import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";
import { 
  QueueMusic, 
  Compare, 
  Cloud 
} from '@mui/icons-material';

class MenuBar extends React.Component {
    render() {
        return(
          <Navbar type="light" theme="white" expand="md" className="justify-content-between px-8">
            <NavbarBrand href="/"> 🎵usical Playland</NavbarBrand>
            <Nav navbar>
              <NavItem>
                <NavLink active href="/search" className='mx-3'>
                  <QueueMusic />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active href="/compare">
                  <Compare />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active  href="/wordcloud" className='mx-3'>
                  <Cloud />
                </NavLink>
              </NavItem>
            </Nav>
            <NavLink active href="/about">
              <h6>ABOUT</h6>
            </NavLink>
          </Navbar>
        )
    }
}

export default MenuBar


// import React from 'react';
// import {
//     Navbar,
//     NavbarBrand,
//     Nav,
//     NavItem,
//     NavLink
//   } from "shards-react";

// class MenuBar extends React.Component {
//     render() {
//         return(
//             <Navbar type="dark" theme="primary" expand="md">
//         <NavbarBrand href="/">Musical Playland</NavbarBrand>
//           <Nav navbar>
//           <NavItem>
//               <NavLink active href="/">
//                 Home
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink active href="/playlist">
//                 Playlist
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink active  href="/popularity" >
//                 Popularity
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink active  href="/playlist" >
//                 Playlist Slide
//               </NavLink>
//             </NavItem>
//           </Nav>
//       </Navbar>
//         )
//     }
// }

// export default MenuBar
