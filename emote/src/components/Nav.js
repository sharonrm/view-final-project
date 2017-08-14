import React from 'react';

const Nav = (props) => {
	return(
		<nav>
		<div onClick={()=> {props.changeMode('emotion')}}></div>
		</nav>
		)
}

export default Nav;