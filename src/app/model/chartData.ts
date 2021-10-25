import { SerieModel } from '../model/seriel';

export class ChartDataModel {
    public data: SerieModel[];
    constructor(data:  SerieModel[]) {
        this.data = data;
    }
}