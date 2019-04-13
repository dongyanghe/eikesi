export const VALIDATION = {
  'otherName': {
    'value': /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,})$/i,
    'label': '输入的名称格式不正确'
  },
  'describe': {
    'value': /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,})$/i,
    'label': '输入的格式不正确'
  },
  'code': {
    'value': /^([a-zA-Z0-9]{1,})$/,
    'label': '英文和数字的组合'
  },
  'AppID': {
    'value': /^([a-zA-Z0-9]{1,32})$/,
    'label': '请输入32位以内数字字母的组合'
  },
  'certificatePwd': {
    'value': /^([a-zA-Z0-9_]{1,32})$/,
    'label': '请输入正确的密码'
  },
  'totalNumber': {
    'value': /^(?:[1-9]\d{0,6}|0|50000000|[1-4]\d{7})$/,
    'label': '整数[1-50000000]，Eg：10000'
  },
  'md5': {
    'value': /^([a-zA-Z0-9_]{1,32})$/,
    'label': '请输入32位正确的MD5'
  },
  'contactPerson': {
    'value': /^([a-zA-Z\u4e00-\u9fa5]{2,})$/,
    'label': '2 - 10位的英文或汉字'
  },
  'redPacketsName': {
    'value': /^([a-zA-Z\u4e00-\u9fa5]{1,30})$/,
    'label': '1 - 30位的英文或汉字'
  },
  'noticeTitle': {
    'value': /^([a-zA-Z\u4e00-\u9fa5]{1,15})$/,
    'label': '1 - 30位的英文或汉字'
  },
  'activityName': {
    'value': /^([a-zA-Z\u4e00-\u9fa5]{2,20})$/,
    'label': '2 - 20位的英文或汉字'
  },
  'couponsName': {
    'value': /^([a-zA-Z\u4e00-\u9fa5]{1,15})$/,
    'label': '1 - 15位的英文或汉字'
  },
  'million': {
    'value': /^(?:[1-9][0-9]{0,5}|1000000)$/,
    'label': '整数[1-1000000]，Eg：10000'
  },
  '100hundred': {
    'value': /^(?:[1-9][0-9]{0,3}|10000)$/,
    'label': '整数[1-10000]，Eg：1000'
  },
  '10hundred': {
    'value': /^(?:[1-9][0-9]{0,2}|1000)$/,
    'label': '整数[1-1000]，Eg：100'
  },
  '1hundred': {
    'value': /^(?:[1-9][0-9]{0,1}|1000)$/,
    'label': '整数[1-1000]，Eg：100'
  },
  'hundred': {
    'value': /^(?:[1-9][0-9]{0,1}|100)$/,
    'label': '整数[1-100]，Eg：50'
  },
  'roleName': {
    'value': /^([a-zA-Z\u4e00-\u9fa5]{2,10})$/,
    'label': '2 - 10位的英文或汉字'
  },
  'character': {
    'value': /^.{1,100}$/,
    'label': '输入正确的字符长度'
  },
  'character50': {
    'value': /^.{1,50}$/,
    'label': '输入字符不能超过50个字'
  },
  'name': {
    'value': /(^[\u4e00-\u9fa5 ]{2,}$)|(^[a-zA-Z\/ ]{2,}$)/,
    'label': '英文或汉字'
  },
  'phone': {
    'value': /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/i,
    'label': '输入的电话、传真格式不正确<'
  },
  'chMobile': {
    'value': /^1[3|4|5|7|6|8][0-9]\d{8,8}$/,
    'label': '输入的手机号码格式不正确'
  },
  'phoneAndChMobile': {
    'value': /^((0\d{2,3}-\d{7,8})|(1[345678]\d{9}))$/,
    'label': '输入的电话或手机号码格式不正确'
  },
  'company': {
    'value': /.*/i,
    'label': '输入的名称格式不正确'
  },
  'address': {
    'value': /.*/i,
    'label': '输入的地址格式不正确'
  },
  'zipcode': {
    'value': /^[1-9]\d{5}$/i,
    'label': '输入的邮编格式不正确'
  },
  'date': {
    'value': /^(\d{4})-(\d{2})-(\d{2})$/i,
    'label': '日期格式为：yyyy-mm-dd，如2015-01-01'
  },
  'time': {
    'value': /^(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/i,
    'label': '时间格式为：yyyy-mm-dd hh:mm:ss或hh:mm，如2008-08-08 18:00'
  },
  'price': {
    'value': /^([1-9]?[0-9]{1,5})(\.[0-9]{1,2})?$/,
    'label': '数字x元x毛x分，格式为：xx、xx.xx、x.xx'
  },
  'faceValue': {
    'value': /^([0-9]*)(\.[0-9]{2})$/,
    'label': '保留两位小数'
  },
  'faceValue1': {
    'value': /^([0-9]*)(\.[0-9]{1})$/,
    'label': '保留一位小数'
  },
  'ticketPrice': {
    'value': /^([1-9]?[0-9]{0,2})(\.[0-9]{1,2})?$/,
    'label': '数字:1-999.99'
  },
  'float': {  //  通过_m_n传值，value改为字符串
    'value': '^(0|[1-9][0-9]{0,regexp_m})(\\.[0-9]{1,regexp_n})?$',
    'label': '格式为：regexp_m位整数和regexp_n位小数'
  },
  'coupon': {
    'value': /^([1-9][0-9]{0,1})$/,
    'label': '数字:1-99'
  },
  'carNumber': {
    'value': /^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{4}[a-zA-Z_0-9_\u4e00-\u9fa5]$/i,
    'label': '输入的车牌号码格式不正确'
  },
  'email': {
    'value': /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    'label': '输入的邮箱格式不正确'
  },
  'qq': {
    'value': /^[1-9][0-9]{4,12}$/i,
    'label': '输入的QQ号码格式不正确'
  },
  'weixin': {
    'value': /^[A-Za-z][A-Za-z0-9_-]{5,19}$/i,
    'label': '输入的微信号码格式不正确'
  },
  'password': {
    'value': /^[A-Za-z0-9*#]{6,18}$/,
    'label': '6-18位字母大小写、数字、*、#的组合'
  },
  'percent': {
    'value': /^(0|[1-9][0-9]{0,3})(\.[0-9]{1,2})?%$/i,
    'label': '格式为：xxxx.xx%，如123.45%'
  },
  'integer': {
    'value': /^(0|[1-9][0-9]*)$/i,
    'label': '格式为：正整数'
  },
  'integer1': {
    'value': /^(0|[1-9][0-9]*)$/i,
    'label': '必须是数字'
  },
  'number': {
    'value': /^\d{1,2}$/i,
    'label': '格式为：两位数字'
  },
  'specialTicket': {
    'value': /^\d{1,2}$/i,
    'label': '1-2位数字'
  },
  'specialTicketPrice': {
    'value': /^([0-9]{1,3})+([.]{1}[0-9]+){0,1}$$/i,
    'label': '金额为:1-300'
  },
  'cnaps': {
    'value': /^\d{12}$/,
    'label': '格式为：12位数字'
  },
  'upperCase': {
    'value': /^[A-Z]+$/i,
    'label': '格式为：英文大写字母'
  },
  'lowerCase': {
    'value': /^[a-z]+$/i,
    'label': '格式为：英文小写字母'
  },
  'letter': {
    'value': /^[A-Za-z]+$/i,
    'label': '格式为：英文大小写'
  },
  'string': {
    'value': /.*/i,
    'label': '输入非法字符'
  },
  'license': {
    'value': /(^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{6}$)|(^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$)/i,
    'label': '格式为：首位中文、大写英文、数字加英语'
  },
  'chString': {
    'value': /^[\u4e00-\u9fa5]+$/i,
    'label': '格式为：中文字符'
  },
  'enString': {
    'value': /^[A-Za-z\s_]+$/i,
    'label': '格式为：英文字符、空格及下划线'
  },
  'chEnString': {
    'value': /^([\u4e00-\u9fa5A-Za-z\s]+)$/i,
    'label': '格式为：中英文字符'
  },
  'search': {
    'value': /^.{0,12}$/i,
    'label': '输入的搜索信息格式不正确，最多支持12个字符'
  },
  'url': {
    'value': /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/i,
    'label': '格式为：http://www.baidu.com或者https://www.baidu.com'
  },
  'threeDigit': {
    'value': /^[1-9]\d{0,2}$/i,
    'label': '位数不能超过三位数'
  },
  'loginName': {
    'value': /^[\w]{6,16}$/,
    'label': '格式为：6-16位英文大小写、数字、下划线_'
  },
  'bankCard': {
    'value': /^(\d{16}$)|(^\d{19}$)/i,
    'label': '银行卡号不能超过19位数字，不低于16位数字'
  },
  'axleBase': {
    'value': /^[1-9][0-9]{3}$/i,
    'label': '输入的格式不正确，4位数字'
  },
  'idCard': {
    'value': /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)/i,
    'label': '输入的身份证格式不正确,15或18位'
  },
  'supervisory': {
    'value': /^[A-Za-z0-9]{1,20}$/i,
    'label': '格式为：英文大小写，数字，最多支持20个字符'
  },
  'carType': {
    'value': /^([\u4e00-\u9fa5A-Za-z]+)$/i,
    'label': '输入格式错误'
  },
  'phoneNumber': {
    'value': /(^1[3|4|5|7|8][0-9]\d{8}$)|(^([0-9]{8}$))/i,
    'label': '正确的手机号码，香港（8位）、中国大陆（11位）'
  },
  'presellTime': {
    'value': /^[1-9][0-9]{0,1}$/,
    'label': '数字:1-99'
  },
  'stopSellTime': {
    'value': /^[1-9][0-9]{0,2}$/,
    'label': '数字:1-999'
  },
  'amount': {
    'value': /^[1-9][0-9]{0,7}$/,
    'label': '数字:1-99999999'
  },
  'one': {
    'value': /^(1000)|([1-9][0-9][0-9])$/,
    'label': '数字:100-1000'
  },
  'weight': {
    'value': /^[1-9][0-9]{0,5}$/,
    'label': '数字:1-999999'
  },
  'chargeRate': {
    'value': /^[0-9]{1,2}$/,
    'label': '数字:0-99'
  },
  'consumptionOfMoney': {
    'value': /^(?:\d{1,3})(\.[0-9]{2})$|1000.00/,
    'label': '消费金额:0.00-1000.00'
  }
};
