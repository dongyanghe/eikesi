import { PipeTransform, Pipe } from '@angular/core';
import { DateService } from '../service/DateService';

@Pipe({
  name: 'translationDate'
})
export class TranslationDatePipe implements PipeTransform {
  /**
   * 将时间转换为语意化的描述
   * 转换格式：2月18日 后天（周三）
   * @param dateAny
   * @param format
   * @returns {any}
   */
  transform(dateAny: Date | string | number, format: any): string {

    let dateService = new DateService();
    if (!dateAny) { // 判断空
      return '';
    }
    switch (format) {
      case 'mm-dd-day-week':  //  转换格式：2月18日 后天（周三）
        return dateService.getCurDate(dateAny, format);
      case 'yyyy-mm-dd-week': // 转换格式：2018年2月18日 （周三）
        return dateService.getCurDate(dateAny, format);
      case 'mm-dd-week':  //  转换格式：2月18日 （周三）
        return dateService.getCurDate(dateAny, format);
      case 'yyyy-mm-dd hh:mm:ss': // 转换格式：2018-2-18 08:08
        return dateService.getCurDate(dateAny, format);
      case 'yyyy-mm-dd':  //  转换格式：2018年2月18日
        return dateService.getCurDate(dateAny, format);
      case 'mm-dd HH:mm': // 转换格式：2月18日 08:08
        return dateService.getCurDate(dateAny, format);
      case 'yyyy-mm-dd 00:00:00': // 转换格式：2018-2-18 00:00:00
        return dateService.appendTime(dateAny);
      case 'countDownTime': // 倒计时
        return dateService.countDownTime(dateAny);
      //  case'yyyy-mm-dd 00:00:00':
      // 		 return dateService.(dateAny,format);
      //  case'yyyy-mm-dd':
      // 		 return dateService.appendTime(dateAny,format);
      default:
        return DateService.dateFormat(dateAny, format);
    }
  }
}
/**
 * 同上
 * 非纯版
 */
@Pipe({
  name: 'translationDateImpure',
  pure: false
})
export class TranslationDateImpurePipe extends TranslationDatePipe implements PipeTransform {}
