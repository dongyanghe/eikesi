import { Injectable } from '@angular/core';

@Injectable()
export class PriceService {
    /**
     * 过滤货币,分转元，不加货币符号
     * @param price type//传进管道类型
     */
    elementFilter(price, type) {
        // price = price.toFixed(2);
        // let html = (price / 100).toFixed(2);
        // return html;
        try {
            if (!price && price !== 0) {
                return '';
            }
            if (typeof price === 'string') {
                price = parseFloat(price);
            }
            if (isNaN(price)) {
                return '';
            }
            //  input = input.toFixed(2);
            let html;
            switch (type) {
                case 'priceToFixed2':
                    price = price.toFixed(2); // 小数点后保留两位
                    return price;
                case 'priceNumber':
                    price = price / 100;
                    price = price.toFixed(2); // 小数点后保留两位
                    return price;
                case 'price':
                    price = price / 100;
                    price = price.toFixed(2);
                    html = price + '元';
                    break;
                case 'repairPrice':
                    html = price + '元';
                    break;
                case 'totalCost':
                    html = price + '元';
                    break;
                case 'dayOilPrice':
                    html = price + '元';
                    break;
                case 'realPay':
                    if (price % 100 !== 0) {
                        price = price / 100;
                        price = price.toFixed(2);
                        html = price;
                    } else {
                        html = price / 100 + '.00';
                    }
                    break;
                case 'priceThousand':
                    html = this.priceFilter(price);
                    break;
                case 'mileage':
                    html = price / 1000 + '公里';
                    break;
                case 'kilometers':
                    html = price + '公里';
                    break;
                case 'lastMileage':
                    html = price + '公里';
                    break;
                case 'totalMileage':
                    html = price + '公里';
                    break;
                case 'theMileage':
                    html = price + '公里';
                    break;
                case 'rise':
                    html = price + '升';
                    break;
                case 'travelTime':
                    html = price + '分钟';
                    break;
                case 'busAmount':
                    html = price + '辆车';
                    break;
            }
            return html;
        } catch (e) {
            console.error('grid中列表数据尾端添加后缀失败');
            console.error(e);
        }
        return '';
    }

    /**
     * @author chenxingwu
     * 过滤货币，格式为数字千分位形式，即从个位数起，每三位之间加一个逗号。例如“10,000”,priceFilter:string
     *  @param price
     */
    priceFilter(price) {
        try {
            if (isNaN(price)) {
                return '';
            }
            let result = '';
            price = (price / 100.0 || 0).toString();
            //分转元,因为后台存储为分，所以要转为元
            if (price.indexOf('.') === -1) {
                while (price.length > 3) {
                    result = ',' + price.slice(-3) + result;
                    price = price.slice(0, price.length - 3);
                }
                if (price) {
                    result = price + result;
                }
            } else {
                let priceFilter = price.slice(price.indexOf('.'), price.length);
                price = price.slice(0, price.indexOf('.'));
                while (price.length > 3) {
                    result = ',' + price.slice(-3) + result;
                    price = price.slice(0, price.length - 3);
                }
                if (price) {
                    result = price + result + priceFilter;
                }
            }
            return result;
        } catch (e) {
            console.warn('价格过滤失败...');
            console.error(e);
        }
    }
}
