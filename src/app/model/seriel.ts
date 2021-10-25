import { SeriersChildModel } from '../model/seriersChild';

export class SerieModel {
    public name: string;
    public series: SeriersChildModel[];
    constructor(name:  string, series: SeriersChildModel[]) {
        this.name = name;
        this.series = series;
    }
  }