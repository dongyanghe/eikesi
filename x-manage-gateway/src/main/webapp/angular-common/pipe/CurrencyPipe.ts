import { PipeTransform, Pipe } from '@angular/core';
import { PriceService } from '../service/PriceService';

@Pipe({
    name: 'price'
})
export class PricePipe implements PipeTransform {
    transform(price: any, type: any): any {
        if (!price) {
            return price;
        }
        let priceService: PriceService = new PriceService();
        return priceService.elementFilter(price, type);
    }
}
