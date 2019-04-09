import {Injectable} from '@angular/core';
//  import { BrowserService } from '../../angular2Common/service/BrowserService';

/**
 * @author chenxingwu,hedongyang
 * 分析参数类型，容错判断
 */
@Injectable()
export class DateService {
  /**
   * 日期对象转为日期字符串
   * @param date 需要格式化的日期对象
   * @param sFormat 输出格式,默认为yyyy-MM-dd                         年：y，月：M，日：d，时：h，分：m，秒：s
   * @example  dateFormat(new Date())                                '2017-02-28'
   * @example  dateFormat(new Date(),'yyyy-MM-dd')                   '2017-02-28'
   * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')         '2017-02-28 12:24:00'
   * @example  dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss')         '2017-02-28 24:24:00'
   * @example  dateFormat(new Date(),'hh:mm')                       '09:24'
   * @example  dateFormat(new Date(),'yyyy-MM-ddThh:mm:ss+08:00')   '2017-02-28T09:24:00+08:00'
   * @returns {string}
   */
  static dateFormat(date: Date | string | number, sFormat: String = 'yyyy-MM-dd HH:mm:ss'): string {
    if (!date) {
      return ''
    };
    if (typeof date === 'string') {
      //  兼容苹果系统
      date = new Date(date.replace(/-/g, '/'));
    }
    if (typeof date === 'number') { // 考虑了纯秒数传入情况
      date = new Date(date);
    }
    if (!(date instanceof Date)) {
      return ''
    };
    let time = {
      Year: 0,
      TYear: '0',
      Month: 0,
      TMonth: '0',
      Day: 0,
      TDay: '0',
      Hour: 0,
      THour: '0',
      hour: 0,
      Thour: '0',
      Minute: 0,
      TMinute: '0',
      Second: 0,
      TSecond: '0',
      Millisecond: 0
    };
    time.Year = date.getFullYear();
    time.TYear = String(time.Year).substr(2);
    time.Month = date.getMonth() + 1;
    time.TMonth = time.Month < 10 ? '0' + time.Month : String(time.Month);
    time.Day = date.getDate();
    time.TDay = time.Day < 10 ? '0' + time.Day : String(time.Day);
    time.Hour = date.getHours();
    time.THour = time.Hour < 10 ? '0' + time.Hour : String(time.Hour);
    time.hour = time.Hour < 13 ? time.Hour : time.Hour;
    time.Thour = time.hour < 10 ? '0' + time.hour : String(time.hour);
    time.Minute = date.getMinutes();
    time.TMinute = time.Minute < 10 ? '0' + time.Minute : String(time.Minute);
    time.Second = date.getSeconds();
    time.TSecond = time.Second < 10 ? '0' + time.Second : String(time.Second);
    time.Millisecond = date.getMilliseconds();
    console.log('dateFormat：', date, sFormat, sFormat.replace(/yyyy/ig, String(time.Year))
      .replace(/yyy/ig, String(time.Year))
      .replace(/yy/ig, time.TYear)
      .replace(/y/ig, time.TYear)
      .replace(/MM/g, time.TMonth)
      .replace(/M/g, String(time.Month))
      .replace(/dd/ig, time.TDay)
      .replace(/d/ig, String(time.Day))
      .replace(/HH/g, time.THour)
      .replace(/H/g, String(time.Hour))
      .replace(/hh/g, time.Thour)
      .replace(/h/g, String(time.hour))
      .replace(/mm/g, time.TMinute)
      .replace(/m/g, String(time.Minute))
      .replace(/ss/ig, time.TSecond)
      .replace(/s/ig, String(time.Second))
      .replace(/fff/ig, String(time.Millisecond)));
    return sFormat.replace(/yyyy/ig, String(time.Year))
      .replace(/yyy/ig, String(time.Year))
      .replace(/yy/ig, time.TYear)
      .replace(/y/ig, time.TYear)
      .replace(/MM/g, time.TMonth)
      .replace(/M/g, String(time.Month))
      .replace(/dd/ig, time.TDay)
      .replace(/d/ig, String(time.Day))
      .replace(/HH/g, time.THour)
      .replace(/H/g, String(time.Hour))
      .replace(/hh/g, time.Thour)
      .replace(/h/g, String(time.hour))
      .replace(/mm/g, time.TMinute)
      .replace(/m/g, String(time.Minute))
      .replace(/ss/ig, time.TSecond)
      .replace(/s/ig, String(time.Second))
      .replace(/fff/ig, String(time.Millisecond))
  }
  /**
   * 日期的加减，只是天数的加减
   *
   * @param date,num
   * @return date
   */
  addDate(date, num) {
    if (!date) {
      date = new Date(); // 如果没有传入，默认为当前时间
    }
    if (!num) {
      num = 0; // 如果没有传入，默认为0
    }
    if (typeof (date) == 'string') {
      let dateArr = date.replace(/-/g, '/');
      date = new Date(dateArr); // 转date对象
    } else {
      date = date.toString();
      let dateArr = date.replace(/-/g, '/');
      date = new Date(dateArr);
    }
    if (typeof (date) == 'number') { // 考虑纯秒数传入情况
      date = new Date(date);
    }
    date = date.valueOf();
    date = date + num * 24 * 60 * 60 * 1000
    date = new Date(date);
    return date;
  }

  /**
   * 返回一个七天的数组
   * [{01月01....},{01月02...}....]
   */
  getSevenDay() {

    let Arr = new Array();
    let date = new Date()
    let dayAdd;
    for (let i = 0; i < 7; i++) { // 测试版的日期，后期优化
      dayAdd = this.addDate(date, i);
      let obj = {mDd: '', label: '', date: ''};
      obj.mDd = this.add_zero(dayAdd.getMonth() + 1) + '月' + this.add_zero(dayAdd.getDate()) + '日';
      obj.date = dayAdd.getFullYear() + '-' + this.add_zero(dayAdd.getMonth() + 1) + '-' + this.add_zero(dayAdd.getDate()); // 字符串类型日期
      switch (i) { // 此switch,暂时留着
        case 0:
          obj.label = '今天';
          break;
        case 1:
          obj.label = '明天';
          break;
        case 2:
          obj.label = '后天';
          break;
        default:
          break;
      }
      Arr.push(obj);
    }
    return Arr;
  }

  /************************moment.js******************************** */
   //  moment('20111031', 'YYYYMMDD').fromNow();  //  5 年前
   //  moment('20120620', 'YYYYMMDD').fromNow();  //  5 年前
   //  moment().startOf('day').fromNow();         //  16 小时前
   //  moment().endOf('day').fromNow();           //  8 小时内

   //  moment().subtract(10, 'days').calendar();  //  2017年2月28日
   //  moment().subtract(6, 'days').calendar();   //  上周六下午3点37
   //  moment().subtract(3, 'days').calendar();   //  本周二下午3点37
   //  moment().subtract(1, 'days').calendar();   //  昨天下午3点37分
   //  moment().calendar();                       //  今天下午3点37分
   //  moment().add(1, 'days').calendar();        //  明天下午3点37分
   //  moment().add(3, 'days').calendar();        //  下周一下午3点37

   //  moment().subtract(10, 'days').calendar();  //  2017年2月28日
   //  moment().subtract(6, 'days').calendar();   //  上周六下午3点36
   //  moment().subtract(3, 'days').calendar();   //  本周二下午3点36
   //  moment().subtract(1, 'days').calendar();   //  昨天下午3点36分
   //  moment().calendar();                       //  今天下午3点36分
   //  moment().add(1, 'days').calendar();        //  明天下午3点36分
   //  moment().add(3, 'days').calendar();        //  下周一下午3点36
   //  moment().add(10, 'days').calendar();    if(typeof(date) == 'string'){ date =  new Date(date);}
  /************************moment.js******************************** */
  /**
   * @author chenxingwu
   * 转换时间,时间格式为约多少时间，但参考时间为传入值的endTime-startTime 例如：约1小时32分8秒
   *如果没有传endTime,则endTime默认当前时间
   * @param startTime endTime
   */
  countTime(startTime, endTime) {
    if (!startTime) {
      return ''
    }
    if (!endTime) {
      endTime = new Date(); // 如果没有传endTime，则endtime默认当前时间
    }
    if (typeof (startTime) == 'string') {
      let dateArr = startTime.replace(/-/g, '/');
      startTime = new Date(dateArr); // 转date对象
    } else {
      startTime = startTime.toString();
      let dateArr = startTime.replace(/-/g, '/');
      startTime = new Date(dateArr);
    }
    if (typeof (endTime) == 'string') {
      let dateArr = endTime.replace(/-/g, '/');
      endTime = new Date(dateArr); // 转date对象
    } else {
      endTime = endTime.toString();
      let dateArr = endTime.replace(/-/g, '/');
      endTime = new Date(dateArr);
    }
    let t = endTime.getTime() - startTime.getTime();
    if (t > 0) {
       //  let seconds = Math.floor((t / 1000) % 60);
      let minutes = Math.floor((t / 1000 / 60) % 60);
      let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      let days = Math.floor(t / (1000 * 60 * 60 * 24));

       //  return (days > 0 ? days + '天' : '') + hours + '小时' + minutes + '分' + seconds + '秒';
      return (days > 0 ? days + '天' : '') + hours + '小时' + minutes + '分';
    } else {
      return '';
    }
  }

  /**
   * @author chenxingwu
   * 32分8秒
   * 倒计时
   * @param Time 必须以秒或纯数字传进
   */
  countDownTime(time) {
    if (typeof (time) != 'number') { // 考虑不是纯秒数传入情况
      return '';
    }
    if (!time) {
      time = 0; // 如果没有传time，则默认为0；
    }
    if (time > 0) {
      let seconds = Math.floor((time) % 60);
      let minutes = Math.floor((time / 60) % 60);
       //  let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
       //  let days = Math.floor(time / (1000 * 60 * 60 * 24));

       // return (days > 0 ? days + '天' : '') + hours + '小时' + minutes + '分' + seconds + '秒';
      return minutes + '分' + seconds + '秒';
      ;
    } else {
      return time;
    }
  }


  /**
   * @author chenxingwu
   * 转换时间,时间格式为约多少时间，但参考时间为传入值的endTime-startTime 例如：约1小时32分8秒
   *如果没有传endTime,则endTime默认当前时间
   * @param startTime endTime
   */
  getTimeFormat(startTime, endTime) {
    if (!startTime) {
      return ''
    }
    if (!endTime) {
      endTime = new Date(); // 如果没有传endTime，则endtime默认当前时间
    }
    if (typeof (startTime) == 'string') {
      let dateArr = startTime.replace(/-/g, '/');
      startTime = new Date(dateArr); // 转date对象
    } else {
      startTime = startTime.toString();
      let dateArr = startTime.replace(/-/g, '/');
      startTime = new Date(dateArr);
    }
    if (typeof (endTime) == 'string') {
      let dateArr = endTime.replace(/-/g, '/');
      endTime = new Date(dateArr); // 转date对象
    } else {
      endTime = endTime.toString();
      let dateArr = endTime.replace(/-/g, '/');
      endTime = new Date(dateArr);
    }
    let startTimeNum = startTime.getTime();
    let endTimeNum = endTime.getTime();
    let diff: number = <number>((endTimeNum - startTimeNum) / 1000); // <int>((endTimeMills - startTimeMills) / 1000); // 秒
    let day_diff: number = <number>(Math.floor(diff / 86400)); // 天
    let buffer = new Array();
    if (day_diff < 0) {
      return ''; // 如果时间，返回空
    } else {
      if (day_diff == 0 && diff < 60) {
        if (diff <= 0)
          diff = 1;
        buffer.push(diff + '秒'); // 1秒
      } else if (day_diff == 0 && diff < 3600) { // 1分1秒
        buffer.push(Math.round(Math.floor(diff / 60)) + '分钟' + Math.round(Math.floor((diff % 60) / 60)) + '秒'); // 1分1秒
      } else if (day_diff == 0 && diff < 86400) { // 1小时1分1秒
        buffer.push(Math.round(Math.floor(diff / 3600)) + '小时' + Math.round(Math.floor((diff % 3600) / 60)) + '分钟'); // 1小时1分1秒
      } else if (day_diff < 7) { // 1天1小时1分1秒
        buffer.push(day_diff + '天' + Math.round(Math.floor((diff % 86400) / 3600)) + '小时' + Math.round(Math.floor((diff % 5184000) / 86400)) + '分钟');
      } else if (day_diff < 30) {
        buffer.push(Math.round(Math.floor(day_diff / 7)) + ' 星期'); // 1星期1天1小时1分1秒
      } else if (day_diff >= 30 && day_diff <= 179) {
        buffer.push(Math.round(Math.floor(day_diff / 30)) + '月'); // 1月1天1小时1分1秒 // 多少月
      } else if (day_diff >= 180 && day_diff < 365) {
        buffer.push('半年');
      } else if (day_diff >= 365) {
        buffer.push(Math.round(Math.floor(day_diff / 30 / 12)) + '年'); // 多少年
      }
    }
    return buffer.toString();
  };

  /**
   * @author chenxingwu
   * 转换日期，格式 <!--2月18日 后天（周三）---start
   * @param date format
   */
  getCurDate(date: any, format: string) {
    let nowDate = new Date();
    let week;
    if (!date) {
      date = nowDate;
    }
    if (typeof (date) == 'string') {
      let dateArr = date.replace(/-/g, '/');
      date = new Date(dateArr); // 转换对象
    } else {
      date = date.toString();
      let dateArr = date.replace(/-/g, '/');
      date = new Date(dateArr);
    }
    if (!format) {
      return date;
    }


    switch (date.getDay()) {
      case 1:
        week = '星期一';
        break;
      case 2:
        week = '星期二';
        break;
      case 3:
        week = '星期三';
        break;
      case 4:
        week = '星期四';
        break;
      case 5:
        week = '星期五';
        break;
      case 6:
        week = '星期六';
        break;
      default:
        week = '星期日';
    }

    let toDate = date.getDay() - nowDate.getDay(); // 判断几天后，例如：今天或明天或后天,其他返回空
    let intervalDate;
    let currentDate;

    let years = date.getFullYear(); // 获取年月日时分秒
    let month = this.add_zero(date.getMonth() + 1);
    let days = this.add_zero(date.getDate());
    let hours = this.add_zero(date.getHours());
    let minutes = this.add_zero(date.getMinutes());
    let seconds = this.add_zero(date.getSeconds());
    if (format == 'mm-dd-day-week') { //  // 2月18日 今天 星期一
      switch (toDate) {
        case 0:
          intervalDate = '今天';
          break;
        case 1:
          intervalDate = '明天';
          break;
        case 2:
          intervalDate = '后天';
          break;
        default:
          intervalDate = '';
      }
      let currentDate = month + '月' + days + '日' + ' ' + intervalDate + ' ' + week
      return currentDate;
    } else {
      switch (format) {
        case 'mm-dd-week':
          currentDate = month + '月' + days + '日' + ' ' + week
          break;
        case 'yyyy-mm-dd-week':
          currentDate = years + '年' + month + '月' + days + '日' + ' ' + week
          break;
        case 'yyyy-mm-dd HH:mm:ss':
          currentDate = years + '-' + month + '-' + days + '-' + hours + ':' + minutes + ':' + seconds
          break;
        case 'mm-dd HH:mm':
          currentDate = month + '月' + days + '日' + ' ' + hours + ':' + minutes;
          break;
        case 'yyyy-mm-dd':
          currentDate = years + '年' + month + '月' + days + '日'
          break;
      }
      return currentDate;
    }

  };

  add_zero(temp) {
    if (temp < 10)
      return '0' + temp;
    else
      return temp;
  };

  /************ 转换日期，格式 <!--2月18日 后天（周三）***********---end*/
  /************ 转换日期， // 2017-03-10 10:31:12 // 2月18日 08:08 // 2018年2月18日***********---end*/


  /**
   * @author chenxingwu
   *为年月日添加时分秒 字符串类型
   * 转换日期，格式 '2008-08-08 00:00:00'---start
   * @param dateStr
   */
  appendTime(dateStr) {
    if (dateStr && dateStr.indexOf(' 00:00:00') == -1) {
      return dateStr + ' 00:00:00';
    } else {
      return dateStr;
    }
  }

  /************ 转换日期，格式 '2008-08-08 00:00:00'***********---end*/

  /**
   * 将date对象、date字符串、秒数返回指定格式时间字符串
   * 转换日期格式 ios时间处理，格式 '2008-08-08'ios,safari不支持'需要格式是：'2008/08/08';
   * @param date, format
   */
  formatDate(date, format): string {
    if (!date) return '';
    if (!format) format = 'yyyy-MM-dd';
    switch (typeof date) {
      case 'string':
        date = new Date(date.replace(/-/g, '/'));
        break;
      case 'number': // 考虑了纯秒数传入情况
        date = new Date(date);
        break;
    }
    if (!(date instanceof Date)) return '';
    let dict = {
      'yyyy': date.getFullYear(),
      'M': date.getMonth() + 1,
      'd': date.getDate(),
      'H': date.getHours(),
      'm': date.getMinutes(),
      's': date.getSeconds(),
      'MM': ('' + (date.getMonth() + 101)).substr(1),
      'dd': ('' + (date.getDate() + 100)).substr(1),
      'HH': ('' + (date.getHours() + 100)).substr(1),
      'mm': ('' + (date.getMinutes() + 100)).substr(1),
      'ss': ('' + (date.getSeconds() + 100)).substr(1)
    };
    console.log('formatDate:' + format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
      return dict[arguments[0]];
    }));
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
      return dict[arguments[0]];
    });
  }
}
