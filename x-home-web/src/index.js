
import './index.scss';

export default class index {
  constructor() {
    console.log($);
    console.log(this.utilityService);
    $('body').append(UtilityService.isEmpty({}));
    $('body').append(CONFIG.projectName);
  }
}

