
import { observable, action } from 'mobx';
export const ACTION_TYPES = {
    IMAGE_PASTE_CONFIRM_TOOGLE: 'settings/IMAGE_PASTE_CONFIRM_TOOGLE'
};
const initialState = {
    alwaysOnTop: false,
    showOnTray: false,
    showNotification: true,
    confirmImagePaste: true,
    startup: false,
    blockRecall: false,
    remeberConversation: false,
    showRedIcon: true,
    downloads: ''
};
class ConfirmImagePaste {
    @observable show = false;
    @observable image;

    ok;
    cancel;

    @action toggle(show = self.show, image = self.image) {
        var promise = new Promise((resolve, reject) => {
            self.ok = () => resolve(true);
            self.cancel = () => resolve(false);
        });

        self.show = show;
        self.image = image;

        return promise;
    }
}

const self = new ConfirmImagePaste();
export default self;
