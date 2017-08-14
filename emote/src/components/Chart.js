import React, { Component } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';

class Chart extends Component {
    getScores(data) {
        //this is a copy of all the incorrect format
        let newData = data
        // console.log("Help me, I'M A CHART---->", data)
        //map over and the map function - here we are parsing to get score * 100 and then add to array - scores
        if (data.datasets[0].data.length > 0) {
            let scores = data.datasets[0].data.map((dataEl, index) => {
                return (dataEl.score * 100)
            });
            //this is the newData from line 7. Go into it and  find the data property and set it to the array we just made.

            newData.datasets[0].data = scores
            return newData;
        }


    }

    render() {
        return ( <
            div className = "chart" >
            <
            Pie data = { this.getScores(this.props.data) } options = {
                {

                }
            }
            /> <
            /div>


        )

    }
}

export default Chart;