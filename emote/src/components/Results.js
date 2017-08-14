import React, { Component } from 'react';

class Results extends Component {
	renderResults(responseData) {
	// console.log('resp data => ',responseData)
	if (responseData.length > 0) {
		let saved = responseData.map((responseData, index) => {
			return (
				<div
				key={index}> {responseData.tone_name}  {(responseData.score)*100}% </div>

			)
		})
		// console.log("RESPONSE", responseData)
		//made a key using length!!love it!!
		saved.push(<div className="button"><button key={saved.id} onClick={this.props.save}>Save</button></div>)
		return saved;
	}
}
	render() {
		return(

			
				<div>
					{this.renderResults(this.props.responseData)}
				</div>
		
			)
	}
}
export default Results;