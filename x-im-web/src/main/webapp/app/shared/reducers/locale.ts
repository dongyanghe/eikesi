import axios from 'axios';

import { TranslatorContext, Storage } from 'react-jhipster';

export const ACTION_TYPES = {
  SET_LOCALE: 'locale/SET_LOCALE',
  SET_IS_SHOW_IM_WINDOWS: 'locale/SET_IS_SHOW_IM_WINDOWS'
};

const initialState = {
  currentLocale: undefined,
  isShowImWindows: Storage.session.get('isShowImWindows') === 'true' //  是否显示im窗口
};

export type LocaleState = Readonly<typeof initialState>;

export default (state: LocaleState = initialState, action): LocaleState => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOCALE:
      const currentLocale = action.locale;
      if (state.currentLocale !== currentLocale) {
        Storage.session.set('locale', currentLocale);
        TranslatorContext.setLocale(currentLocale);
      }
      return {
        currentLocale,
        isShowImWindows: state.isShowImWindows
      };
    case ACTION_TYPES.SET_IS_SHOW_IM_WINDOWS:
      const isShowImWindows = action.isShowImWindows;
      if (state.currentLocale !== currentLocale) {
        Storage.session.set('isShowImWindows', isShowImWindows);
      }
      return {
        currentLocale: state.currentLocale,
        isShowImWindows
      };
    default:
      return state;
  }
};

export const setLocale = locale => async dispatch => {
  if (Object.keys(TranslatorContext.context.translations).indexOf(locale) === -1) {
    const response = await axios.get(`i18n/${locale}.json?buildTimestamp=${process.env.BUILD_TIMESTAMP}`);
    TranslatorContext.registerTranslations(locale, response.data);
  }
  dispatch({
    type: ACTION_TYPES.SET_LOCALE,
    locale
  });
};
export const setIsShowImWindows = isShowImWindows => async dispatch => {
  dispatch({
    type: ACTION_TYPES.SET_IS_SHOW_IM_WINDOWS,
    isShowImWindows
  });
};
