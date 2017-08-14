import React from 'react';

const Emotion = (props) => {
	return (
		<div>
			<h2> {props.emotion.tone_name} </h2>
			<h2> {props.emotion.score} </h2>
		</div>
	)
}

export default Emotion;
