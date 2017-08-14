import React, { Component } from 'react';
// import $ from 'jquery';
import axios from 'axios';
import Results from './Results';
import Nav from './Nav';
import Emotion from './Emotion';
import {Pie} from 'react-chartjs-2';
import Chart from './Chart'



class Content extends Component {
	constructor (props) {
	console.log(props)
		super(props);
			this.state = {
				chartData:{
					labels:["Anger", "Disgust", "Fear", "Joy", "Sadness"],
					datasets: [ 
					{
						label: "Tone Analysis",
						data: [20,10,30,35,5],
						backgroundColor:[
						"#F20530",
						"#F25C78",
						"#9FE4F2",
						"#4FD4E1",
						"#4FD4E1"]

						}
					]
				},
				contentValue: "",
				data: [],
				url: 'http://localhost:3000/api',
				mode: false,
				current: false,
				results: [],
				analysis: []
			}
		}

		//called in renderView to change the view
		changeMode(mode, current = false) {
			this.setState(prev => {
				prev.mode = mode;
				prev.current = current;
				return prev;
			})
			this.seeResult = this.seeResult.bind(this)
		}


	handleSubmit(event) {
		// console.log("from handleSubmit", event.currentTarget.content.value)
		event.preventDefault();

		axios.post(this.state.url, {
			contentValue: this.state.contentValue
		}).then((response)=> {
			// console.log(response.data.response.document_tone.tone_categories["0"].tones)
			let dataState = this.state.chartData.datasets[0]
			dataState.data = response.data.response.document_tone.tone_categories["0"].tones;
			// setState
			this.setState({dataState});
			// console.log(this.state.chartData.datasets[0].data)
		}).catch((error)=> {
			console.log('err while posting: ', error);
		})
	}

	handleContentChange(event) {
		// console.log(event.target)
		this.setState({contentValue: event.target.value});
		
		}

	//save data in the same place you are setting the state for the data. 
	//Post results to backend.

	save(data) {

		let parseThis = this.state.chartData.datasets[0].data;
		let x = parseThis.map(element => {
			return element.score;
			// console.log(parseThis)
		})

		axios.post("http://localhost:3000/table", x)
			.then(res => {
				// const emotionCopy = {...data, id: res.data.id};
				// console.log("I am EMOTION----->",data)
				this.setState({
					results: this.state.results.push(x),
					mode: 'emotion',
					// current: emotionCopy
				})
			
				})
				.catch(err => {
					console.log(err)
			})
	   }

	   //get last 5 results from table
	   seeResult(){
	   	console.log('inside SEE Results')
	   	axios.get("http://localhost:3000/table")
	   		 .then(response => this.setState({
	   		 		mode: 'analysis',
	   		 		analysis: response.data
	   		 	},this.renderSummationofSearch)	
   		 )
	   		 .catch(err=>console.log(err))
	   }

	   renderSummationofSearch(){
	   		// console.log('this is the array that we are getting back', this.state.analysis);
	   		let analysisResults = this.state.analysis;
	   		return(
	  			<div>
					<h3>Average for the last 3 querries</h3>
						<ul>
							<li>Anger: {analysisResults.anger_avg}</li>
							<li>Disgust: {analysisResults.disgust_avg}</li>
							<li>Fear: {analysisResults.fear_avg}</li>
							<li>Joy: {analysisResults.joy_avg}</li>
							<li>Sadness: {analysisResults.sadness}</li>
						</ul>
				</div>
	   		)


	   }

	   setEmotion(emotion) {
	   	this.setSave(prev => {
	   		prev.current = emotion;
	   		prev.mode = 'emotion';
	   		return prev;
	   	})
	   }

	   renderView() {
	   	// console.log(this.state.mode)
	   	// console.log(this.state.current)
	   	if(this.state.mode === 'emotion') {
	   		return(<Emotion emotion={this.state.current} />)
	   	} else if (this.state.mode==='analysis'){ 
	   		return (<div>
	   				{this.renderSummationofSearch()}
	   				</div>
	   			)
	   		}else if(this.state.mode==='results'){
	   			return(<div>
	   			{this.save()}
	   			</div>
	   			)
	   		}
	   }

	   showChart(){
	
}

	
	render() {
		return(
			<div className='container'>
			<Chart data = {this.state.chartData}/>
			{this.renderView()}
			<form onSubmit={this.handleSubmit.bind(this)} id="usrform">
				<label className='content'>
				<textarea
				    type="text" name="content"
					value={this.state.contentValue}
					onChange={this.handleContentChange.bind(this)}/>
					</label>
						<div className="containerSubmit">
						<input type="submit" value="Submit" id="submit" className="results-button" />
							
							<div className="results-button" id="view-saved" onClick={() => {this.seeResult()}}> View Saved </div>
								<Results responseData={this.state.chartData.datasets[0].data} key={this.state.chartData.datasets[0].data.length + 1}
							 // setEmotion={this.setEmotion.bind(this)}
							 	save={this.save.bind(this)}
							 	/>
							</div>
						
					
				
				</form>
				<Nav changeMode = {this.changeMode.bind(this)} />
				</div>
			
		)
	}
}
	
 export default Content;