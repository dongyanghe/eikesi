import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from 'app/shared/reducers/locale';
import authentication, { AuthenticationState } from 'app/shared/reducers/authentication';
import snackbarState, { SnackbarState } from 'app/shared/reducers/snackbar';
import applicationProfile, { ApplicationProfileState } from 'app/shared/reducers/application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import historyMessage, {
  HistoryMessageState
} from 'app/entities/history-message/history-message.reducer';
// prettier-ignore
import currentMessage, {
  CurrentMessageState
} from 'app/entities/current-message/current-message.reducer';
// prettier-ignore
import dialogue, {
  DialogueState
} from 'app/entities/dialogue/dialogue.reducer';
// prettier-ignore
import customerRelation, {
  CustomerRelationState
} from 'app/entities/customer-relation/customer-relation.reducer';
// prettier-ignore
import flockRelation, {
  FlockRelationState
} from 'app/entities/flock-relation/flock-relation.reducer';
// prettier-ignore
import customerFlock, {
  CustomerFlockState
} from 'app/entities/customer-flock/customer-flock.reducer';
// prettier-ignore
import customer, {
  CustomerState
} from 'app/entities/customer/customer.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly historyMessage: HistoryMessageState;
  readonly currentMessage: CurrentMessageState;
  readonly dialogue: DialogueState;
  readonly customerRelation: CustomerRelationState;
  readonly flockRelation: FlockRelationState;
  readonly customerFlock: CustomerFlockState;
  readonly customer: CustomerState;
  readonly snackbarState: SnackbarState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}
/**
 * 公共state的reducer
 * @description: 使用combineReducers合并Reducer生成一个公共函数，
 * 这个函数来调用你的一系列 reducer，最后会返回一个合并的state。
 * 在store中用于创建公共store用以改变公共state。
 * 形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * Redux 应用只有一个单一的 store
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 一般使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 * 也可以自定义一个 createReducer 函数来接收一个事件处理函数列表
 */
const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  historyMessage,
  currentMessage,
  dialogue,
  customerRelation,
  flockRelation,
  customerFlock,
  customer,
  snackbarState,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
