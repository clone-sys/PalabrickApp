import { Component, Input, OnInit } from '@angular/core';
// import { ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';




import { DatoEstadistica } from 'src/app/classes/datoEstadistica';


@Component({
  selector: 'app-graficopalabrick',
  templateUrl: './graficopalabrick.component.html',
  styleUrls: ['./graficopalabrick.component.css']
})
export class GraficopalabrickComponent implements OnInit {


  @Input() media!: number;
  @Input() maximo!: number;
  @Input() minimo!: number;
  @Input() array_bruto_datos!: Array<DatoEstadistica>;

  lineChartData!: ChartConfiguration['data'];

  lineChartOptions: ChartConfiguration['options'];

  lineChartType: ChartType = 'line';





  ejeX: Array<string>;
  ejeY: Array<number>;
  datos: Array<number>;


  constructor() {
    /* this.media=5;
    this.maximo=5;
    this.minimo=5; */
  }


  ngOnInit(): void {

    this.filtarDatos();


    this.actualizaGraficos(this.ejeX, this.ejeY, this.datos);

    this.lineChartOptions = {
      elements: {
        line: {
          tension: 0
        }
      },
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
     
        x: {},
        'y-axis-0':
        {
          position: 'left'    
        },
        ticks: {
          reverse: true
      },
             
      },

      plugins: {
        legend: { display: true }
      }
    };
  }


  actualizaGraficos(ejeX: Array<string>, ejeY: Array<number>, datos: Array<number>) {
    //this.lineChartData.datasets[0].data = [this.media, this.maximo, this.minimo];
    
    //const NUMBER_CFG = {count: 100, min: 0, max: 100};
    this.lineChartData = {
  
      datasets: [
        {        
          data: datos,         
          label: 'Victoria en la ronda',
          backgroundColor: '#0d5f5a',
          borderColor: '#0d5f5a',
          pointBackgroundColor: "#333",
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
          
          borderWidth:1               
        }
        
      ],
      labels: ejeX
      
    };
  }


  filtarDatos(): void {
    //array_bruto_datos

    this.datos = [];
    //this.ejeY = [0,1, 2, 3, 4, 5, 6,7];
    this.ejeX = [];

    let i = 0;
    for (let partida of this.array_bruto_datos) {
      i++

      if (i < 50) {

if (partida.resultado==7){
  partida.resultado=0;
}
        this.datos.push(partida.resultado);
        this.ejeX.push(i.toString());
        console.log("xxx: "+this.ejeX)
      //  this.ejeY.push(i);
      }

    }

  }

}

