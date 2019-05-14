
import './index.scss';
import CONFIG from './common/CONFIG';
import UtilityService from './service/UtilityService';

export default class index {
  public utilityService: UtilityService = new UtilityService();
  constructor() {
    console.log($);
    console.log(this.utilityService);
    $('body').append(UtilityService.isEmpty({}));
    $('body').append(CONFIG.projectName);
  }
}

