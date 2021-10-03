import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';

import { Line } from 'react-chartjs-2';

const Graph  = ({data, status, parameter}) => {

    if(!data){return (<IonPage></IonPage>)};
    const timeLineData = data?.properties?.parameter[parameter]; //gets dates and values
    let unitVal; //gets units

    if(!timeLineData){return (<IonPage></IonPage>)};

    if(!data?.parameters?.[parameter].units)
        {return (<IonPage></IonPage>)}
    else{
         unitVal= data?.parameters?.[parameter].units;
    } 
    console.log('time line data',timeLineData);
    console.log("Units: ", unitVal);

    const labels = Object.keys(timeLineData);
    let values = Object.values(timeLineData);
    console.log("data:", values)
    console.log("labels:", labels)

    let positiveValues = values.filter(x => x > -500);
    let positiveLabels = labels.filter((x,i) => values[i] > -500);

    console.log("positive1", positiveValues);
    console.log("positive2",positiveLabels);
    //HOURLY YYYYMMDDHH = 10
    //DAILY YYYYMMDD = 8
    //WEEKLY YYYYMMDD = 8
    //Monthly YYYYMM = 6
    //Annually YYYYMM = 6

    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    let theLabels= '';

    const years = positiveLabels.map(x => x.substring(0,4));
    const months = positiveLabels.map(x => parseInt(x.substring(4,6)));
    const theseMonths = months.map(x => monthNames[x-1]);
    
    if(status==="annually"){
        //annually
        let filterYears = years.filter((x,i) => months[i]===13);
        theLabels = filterYears.map((x,i) =>  x);
        positiveValues = positiveValues.filter((x,i) => months[i]===13);

    }
    else if (status==="weekly"){
      //weekly (YYYYMMDD)
      //01/01/21 - 08/01/2021
      //01 June 2021 - 08 June 2021
      let weekVals = [];
      let weekLabels = [];
      let temp = 0;
      let counter = 0;
      let weekEnd;
      let formatLabels = '';

      //formatting labels to eg. 03 June 2021
      const days = positiveLabels.map(x => parseInt(x.substring(6,8)));
      formatLabels = theseMonths.map((x, i) => days[i]+' '+x + ' ' + years[i]);
      
      //calculating rolling weekly averages of values and labels going backwards
      weekEnd = formatLabels[formatLabels.length-1];
      for (var i = positiveValues.length - 1; i >= 0; i--) {
        temp += positiveValues[i];
        counter +=1;
        if (counter === 7){
          counter = 0;
          weekVals.push(temp/7);
          temp = 0;
          weekLabels.push(formatLabels[i] + ' - ' + weekEnd);
          weekEnd = formatLabels[i-1];
        }
      }
      if (counter!==0){
        weekVals.push(temp/counter);
        weekLabels.push(formatLabels[0] + ' - ' + weekEnd);
      }     
      //reversing back arrays
      theLabels = weekLabels.reverse();
      positiveValues = weekVals.reverse();
  }
    else if (labels[0].length===8){
        //daily
        const days = positiveLabels.map(x => parseInt(x.substring(6,8)));
        // date month year 
        theLabels = theseMonths.map((x, i) => days[i]+' '+x + ' ' + years[i]);

    } else if(labels[0].length===10){
        //Hourly
        const days = positiveLabels.map(x => parseInt(x.substring(6,8)));
        const hours = positiveLabels.map( x=> parseInt(x.substring(8,10)))         
        const hoursTrue = hours.map( x=> x>=12 ? (x===12? x+'pm': (x-12)+'pm') : (x===0 ? x+12+'am': x+'am'));    
        theLabels = theseMonths.map((x, i) =>  hoursTrue[i]+' '+ days[i]+' '+x + ' ' + years[i]);
    }else{
        //monthly
        let filterLabels = months.filter(x => x<13);
        let filterYears = years.filter((x,i) => months[i]<13);
        theLabels = filterLabels.map((x,i) => monthNames[x-1] +' '+filterYears[i]);
        positiveValues = positiveValues.filter((x,i) => months[i]<13);
    }

    console.log(theLabels);
    console.log(positiveValues);
    let graphLabel;
    let graphColor;
    switch(parameter){
        case "ALLSKY_SFC_SW_DWN":
            graphLabel="Solar Radiance";
            graphColor="#FFD700";
            break;       
        case "TS":
            graphLabel="Surface Temperature";
            graphColor="#DC143C";
            break;
        case "WS2M":
            graphLabel="Wind Speed (Surface)"
            graphColor="#7FFF00";
            break;
        case "WS50M":
            graphLabel="Wind Speed (50 metres)"
            graphColor="#191970";
            break;
        case "PRECTOTCORR":
            graphLabel="Precipitation (Rain)"
            graphColor="#FF1493";
            break;
        case "PRECSNOLAND":
            graphLabel="Precipitation (Snow on Land)"
            graphColor="#8B008B";
            break;
        case "QV2M":
            graphLabel="Humidity"
            graphColor="#FF7F50";
            break;
        default:
          graphColor="#00BFFF";
          graphLabel="Cloud Amount (Day)"
          break;

    }
    const state = {
    labels: theLabels,
    datasets: [ 
        {
        label: graphLabel, 
        fill: false,
        lineTension: 0.5,
        backgroundColor: graphColor,
        borderColor: graphColor,
        borderWidth: 1,
        pointRadius: 1,
        data: positiveValues
        }
    ]
    }


  return (
        <Line
          data={state}
          options={{
            responsive: true,
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            scales: {
                y: {
                    display:true,
                    title:{
                        display:true,
                        text:unitVal, //The fetched JSON object has a property for units 
                        color: "black"
                    }
                },
                x: {
                    display:true,
                    title:{
                        display:true,
                        text:"",
                        color: "black"
                    }
                }
            }
          }}
        />
  );
};

export default Graph;
