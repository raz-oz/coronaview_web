
import { Component, OnInit } from '@angular/core';
import { CoronaService } from '../service/corona.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartDataModel } from '../model/chartData';
import { SerieModel } from '../model/seriel';
import { SeriersChildModel } from '../model/seriersChild';

@Component({
  selector: 'app-israel-overall',
  templateUrl: './israel-overall.component.html',
  styleUrls: ['./../app.component.navbar.css'],
  providers: [NgxChartsModule]
})

export class IsraelOverallComponent implements OnInit {
 
  israelData: any;

  ngxData: ChartDataModel = {
    data: []
  };

  multi: any[];
  verified: any[];
  overall: any[];
  overallGauge: any[];
  overallDate: string;
  view: any[] = [1000, 600];
  viewCard: any[] = [700, 400];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  cardColor: string = '#232837';
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };  
  
  constructor(private coronaService: CoronaService) {
  }
 
  ngOnInit() {
    this.israelData = this.coronaService.getIsraelData();
    console.log(this.israelData);

    this.fill();

    this.multi = this.ngxData.data;
  }


  fill() {
    var serielModelList = [];

    var overallSeriesList = [];
    var verifiedSeriesList = [];
    var criticalSeriesList = [];
    var hospitalizedSeriesList = [];
    var respirationSeriesList = [];
    var deathsSeriesList = [];

    for (var i = 0; i < this.israelData.length; i++) {
          overallSeriesList.push(new SeriersChildModel(this.israelData[i].date, this.israelData[i].overallTests));
          verifiedSeriesList.push(new SeriersChildModel(this.israelData[i].date, this.israelData[i].verified));
          criticalSeriesList.push(new SeriersChildModel(this.israelData[i].date, this.israelData[i].critical));
          hospitalizedSeriesList.push(new SeriersChildModel(this.israelData[i].date, this.israelData[i].hospitalized));
          respirationSeriesList.push(new SeriersChildModel(this.israelData[i].date, this.israelData[i].respiration));
          deathsSeriesList.push(new SeriersChildModel(this.israelData[i].date, this.israelData[i].deaths)); 
    }

    var last = this.israelData.length - 1;
    this.overall = [
      { "name": "Overall Tests", "value": this.formatNumber(this.israelData[last].overallTests) },
      { "name": "Verified", "value": this.formatNumber(this.israelData[last].verified) },
      { "name": "Hospitalized", "value": this.formatNumber(this.israelData[last].hospitalized) },
      { "name": "Critical", "value": this.formatNumber(this.israelData[last].critical) },
      { "name": "Respiration", "value": this.formatNumber(this.israelData[last].respiration) },
      { "name": "Deaths", "value": this.formatNumber(this.israelData[last].deaths) }
    ];     
    this.overallDate = this.israelData[last].date;

    this.overallGauge = [
      //{ "name": "Overall Tests", "value": this.israelData[last].overallTests },
      //{ "name": "Verified", "value": this.israelData[last].verified },
      { "name": "Hospitalized", "value": this.israelData[last].hospitalized },
      { "name": "Critical", "value": this.israelData[last].critical },
      { "name": "Respiration", "value": this.israelData[last].respiration },
      { "name": "Deaths", "value": this.israelData[last].deaths }
    ];    

    //serielModelList.push(new SerieModel("Overall Tests", overallSeriesList));   
    serielModelList.push(new SerieModel("Hospitalized", hospitalizedSeriesList));   
    serielModelList.push(new SerieModel("Critical", criticalSeriesList));   
    serielModelList.push(new SerieModel("Respiration", respirationSeriesList));   
    serielModelList.push(new SerieModel("Deaths", deathsSeriesList));   

    this.ngxData = new ChartDataModel(serielModelList);

    var serielModelList2 = [];
    serielModelList2.push(new SerieModel("Verified", verifiedSeriesList));   
    this.verified = new ChartDataModel(serielModelList2).data;
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  get diagnostic() { 
    return JSON.stringify(this.ngxData); 
  }

  onSelect(data): void {
  }

  onActivate(data): void {
  }

  onDeactivate(data): void {
  }
}
