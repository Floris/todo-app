import React from 'react';
import './Nav.css'

const Nav = (props) => {

console.log(props);

return (
<div class="navbar">
  <a href="#home">+</a>
  <a>{props.username}</a>
</div>
);
}

export default Nav;