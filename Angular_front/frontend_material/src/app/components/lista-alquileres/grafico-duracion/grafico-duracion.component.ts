import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels'


@Component({
  selector: 'app-grafico-duracion',
  templateUrl: './grafico-duracion.component.html',
  styleUrls: ['./grafico-duracion.component.css']
})
export class GraficoDuracionComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
    datasets: [
      {
        data: [300, 500, 100],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }





  actualizarDatos(datos: any[]): void {
    console.log('Datos recibidos:', datos);


    const processedData = datos.map(item => ({
      name: item.tipoMaquinaria,
      value: item.duracionTotal
    }));

    console.log('Datos procesados:', processedData);

    this.pieChartData = {
      labels: processedData.map(item => item.name),
      datasets: [
        {
          data: processedData.map(item => item.value),
        },
      ],
    };

    this.chart?.update();

    console.log('Gráfico actualizado con datos:', this.pieChartData);
  }
}


