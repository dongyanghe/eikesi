import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody } from 'app/shared/Modal';
import { IRootState } from 'app/shared/reducers';
import { toggle, ok, cancel } from 'app/shared/reducers/ImagePasteConfirm';
import './style.scss';

export interface IProps extends StateProps, DispatchProps { }
class ImagePasteConfirm extends React.Component<IProps> {
    ok = () => {
        this.props.ok();
        this.props.toggle(false);
    }
    cancel = () => {
        this.props.cancel();
        this.props.toggle(false);
    }
    render() {
        const { isImagePasteConfirmShow, image } = this.props;

        return (
            <Modal
                fullscreen={true}
                show={isImagePasteConfirmShow}>
                <ModalBody className={'container'}>
                    发送图片?
                    <img src={image} />
                    <div>
                        <button onClick={e => this.ok()}>发送</button>

                        <button onClick={e => this.cancel()}>取消</button>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}
const mapStateToProps = ({ imagePasteConfirm }: IRootState) => ({
    isImagePasteConfirmShow: imagePasteConfirm.isImagePasteConfirmShow,
    image: imagePasteConfirm.image
});

const mapDispatchToProps = { toggle, ok, cancel };

//  用于把当前 Redux store state 映射到展示组件的 props 中
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
/**
 * 主页面
 * index.tsx激活render
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImagePasteConfirm);