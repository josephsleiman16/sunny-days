import { IonContent, IonIcon, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';

import { Line } from 'react-chartjs-2';

const Graph  = ({data, status, parameter}) => {

    if(!data){return (<IonPage></IonPage>)};
    const timeLineData = data?.properties?.parameter[parameter]
    // const unitVal = data?.p
    if(!timeLineData){return (<IonPage></IonPage>)};

    console.log('time line data',timeLineData);
    const labels = Object.keys(timeLineData);
    let values = Object.values(timeLineData);

    //HOURLY YYYYMMDDHH = 10
    //DAILY YYYYMMDD = 8
    //WEEKLY YYYYMMDD = 8
    //Monthly YYYYMM = 6
    //Annually YYYYMM = 6

    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    let theLabels= '';
    console.log('labesl: ',labels);

    const years = labels.map(x => x.substring(0,4));
    const months = labels.map(x => parseInt(x.substring(4,6)));
    const theseMonths = months.map(x => monthNames[x-1]);
    
    if(status=="annually"){
        //annually
        let filterLabels = months.filter(x => x==13);
        let filterYears = years.filter((x,i) => months[i]==13);
        theLabels = filterYears.map((x,i) =>  x);
        values = values.filter((x,i) => months[i]==13);

    }
    else if (status=="weekly"){
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
      const days = labels.map(x => parseInt(x.substring(6,8)));
      formatLabels = theseMonths.map((x, i) => days[i]+' '+x + ' ' + years[i]);
      
      //calculating rolling weekly averages of values and labels going backwards
      weekEnd = formatLabels[formatLabels.length-1];
      for (var i = values.length - 1; i >= 0; i--) {
        temp += values[i];
        counter +=1;
        if (counter == 7){
          counter = 0;
          weekVals.push(temp/7);
          temp = 0;
          weekLabels.push(formatLabels[i] + ' - ' + weekEnd);
          weekEnd = formatLabels[i-1];
        }
      }
      if (counter!=0){
        weekVals.push(temp/counter);
        weekLabels.push(formatLabels[0] + ' - ' + weekEnd);
      }     
      //reversing back arrays
      theLabels = weekLabels.reverse();
      values = weekVals.reverse();
  }
    else if (labels[0].length===8){
        //daily
        const days = labels.map(x => parseInt(x.substring(6,8)));
        // date month year 
        theLabels = theseMonths.map((x, i) => days[i]+' '+x + ' ' + years[i]);

    } else if(labels[0].length===10){
        //Hourly
        const days = labels.map(x => parseInt(x.substring(6,8)));
        const hours = labels.map( x=> parseInt(x.substring(8,10)))         
        const hoursTrue = hours.map( x=> x>=12 ? (x==12? x+'pm': (x-12)+'pm') : (x==0 ? x+12+'am': x+'am'));    
        theLabels = theseMonths.map((x, i) =>  hoursTrue[i]+' '+ days[i]+' '+x + ' ' + years[i]);
    }else{
        //monthly
        let filterLabels = months.filter(x => x<13);
        let filterYears = years.filter((x,i) => months[i]<13);
        theLabels = filterLabels.map((x,i) => monthNames[x-1] +' '+filterYears[i]);
        values = values.filter((x,i) => months[i]<13);
    }

    console.log(theLabels);
    console.log(values);
    let graphLabel;
    switch(parameter){
        case "ALLSKY_SFC_SW_DWN":
            graphLabel="Solar Radiance";
            break;
        case "TS":
            graphLabel="Surface Temperature";
            break;
        case "CLRSKY_DAYS":
            graphLabel="Clear Days"
            break;
        case "ALLSKY_SFC_UV_INDEX":
            graphLabel="UV Exposure"
            break;
        case "WSC":
            graphLabel="Wind Speed (Surface)"
            break;
        case "WS50M":
            graphLabel="Wind Speed (50 metres)"
            break;
        case "PRECTOTCORR":
            graphLabel="Precipitation (Rain)"
            break;
        case "PRECSNOLAND":
            graphLabel="Precipitation (Snow)"
            break;
        case "CLOUD_AMT_DAY":
            graphLabel="Cloud Amount (Day)"
            break;
        case "CLOUD_AMT_NIGHT":
            graphLabel="Cloud Amount (Night)"
            break;
        default:
            graphLabel="Cloud Amount";
            break;

    }
    const state = {
    labels: theLabels,
    datasets: [ 
        {
        label: graphLabel, 
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        pointRadius: 1,
        data: values
        }
    ]
    }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Results</IonTitle>
          </IonToolbar>
        </IonHeader>
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
                        text:"UNITS", //The fetched JSON object has a property for units 
                        color: "black"
                    }
                },
                x: {
                    display:true,
                    title:{
                        display:false,
                        text:"x saxi",
                        color: "black"
                    }
                }
            }
          }}
        />
        {/* <ExploreContainer name="Tab 2 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Graph;
