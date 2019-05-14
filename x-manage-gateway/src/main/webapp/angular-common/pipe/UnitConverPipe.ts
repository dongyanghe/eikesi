import { PipeTransform, Pipe } from '@angular/core';
import { UnitConverService } from '../service/UnitConverService';

@Pipe({
    name: 'unitconver'
})
/**
 * 在shared.module中已经引入
 */
export class UnitConverPipe implements PipeTransform {
    /**
     * value       传进的普通值，传进的对象、数组、方法等返回0
     * targetType  最终转换的类型: yuan(元，保留两位小数) cent(分，整数)
     * unit        后缀的单位
     */
    transform(value: any, targetType: any, unit?: string): any {
        let unitConverService: UnitConverService = new UnitConverService();
        return unitConverService.switchType(value, targetType, unit);
    }
}
