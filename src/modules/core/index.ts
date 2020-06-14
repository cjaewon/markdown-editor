
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
// import { CurrentUser } from '../../lib/graphql/user';

export {
  CHANGE_AUTH_MODAL_MODE,
  CLOSE_AUTH_MODAL,
  CLOSE_POPUP,
  OPEN_POPUP,
  SET_LAYER,
  SET_USER,
  SHOW_AUTH_MODAL,
  changeAuthModalMode,
  closeAuthModal,
  closePopup,
  openPopup,
  setLayer,
  showAuthModal,
} from './actions';


export type AuthMode = 'REGISTER' | 'LOGIN';
export type CoreAction = ActionType<typeof actions>;

export type CoreState = {
  layer: boolean;
  auth: {
    visible: boolean;
    mode: AuthMode;
  };
  // user: CurrentUser | null;
  popup: {
    title: string | undefined;
    message: string;
    visible: boolean;
  };
};


export { default } from './reducer';
