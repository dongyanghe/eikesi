import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

export interface ILoginModalProps {
  loginError: boolean;
  handleLogin: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password, rememberMe);
  };

  render() {
    const { loginError } = this.props;

    return (
      <div id="login-page">
        <AvForm onSubmit={this.handleSubmit}>
          <div>
            <Row>
              <Col md="12">
                {loginError ? (
                  <Alert color="danger">
                    <Translate contentKey="login.messages.error.authentication">
                      <strong>登录失败！</strong> 请检查您的凭据并再试一次。
                    </Translate>
                  </Alert>
                ) : null}
              </Col>
              <Col md="12">
                <AvField
                  name="username"
                  label={translate('global.form.username')}
                  placeholder={translate('global.form.username.placeholder')}
                  required
                  errorMessage="用户名不能为空"
                  autoFocus={false}
                />
                <AvField
                  name="password"
                  type="password"
                  label={translate('login.form.password')}
                  placeholder={translate('login.form.password.placeholder')}
                  required
                  errorMessage="密码不能为空"
                />
                <AvGroup check inline>
                  <Label className="form-check-label">
                    <AvInput type="checkbox" name="rememberMe" /> <Translate contentKey="login.form.rememberme">记住我</Translate>
                  </Label>
                </AvGroup>
              </Col>
            </Row>
            <div className="mt-1">&nbsp;</div>
            <Alert color="warning">
              <Link to="/reset/request">
                <Translate contentKey="login.password.forgot">忘记密码？</Translate>
              </Link>
            </Alert>
            <Alert color="warning">
              <span>
                <Translate contentKey="global.messages.info.register.noaccount">您没有账号？</Translate>
              </span>{' '}
              <Link to="/register">
                <Translate contentKey="global.messages.info.register.link">注册一个账号</Translate>
              </Link>
            </Alert>
          </div>
          <div>
            <Button color="primary" type="submit">
              <Translate contentKey="login.form.button">登录</Translate>
            </Button>
          </div>
        </AvForm>
      </div>
    );
  }
}

export default LoginModal;
