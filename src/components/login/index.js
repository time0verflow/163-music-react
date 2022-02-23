import { LoginWrapper, LoginLeft, LoginRight, PhoneLoginModal } from "./style";
import Draggable from 'react-draggable';
import React, { memo, useRef, useState } from 'react';
import { Button, message, Modal } from 'antd'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PhoneOutlined } from '@ant-design/icons'
import { changeIsVisible } from "./store";
import LoginIcon from "../login-icon";
import LoginForm from "../login-form";

const Login = memo(() => {

    //hooks
    const [loginState, setLoginState] = useState('default'); //登录方式
    const [disabled, setDisabled] = useState(true);  //是否可以拖动
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });  //拖动范围
    const draggleRef = useRef();

    //redux hook
    const dispatch = useDispatch();
    const { isVisible } = useSelector((state) => ({
        isVisible: state.getIn(['login', 'isVisible'])
    }), shallowEqual)

    const defaultWrapperContent = (
        <LoginWrapper>
            <LoginLeft>
                <div className="login-content">
                    <div className="login-bg"></div>
                    <Button
                        type="ghost"
                        shape="round"
                        className="gap"
                        onClick={() => setLoginState('register')}
                        icon={<PhoneOutlined />}
                    >
                        注册
                    </Button>
                    <Button
                        type="primary"
                        shape="round"
                        onClick={() => setLoginState('phone')}
                        icon={<PhoneOutlined />}>
                        手机号登录
                    </Button>
                </div>
            </LoginLeft>
            <LoginRight>
                <div className="icons-wrapper">
                    <LoginIcon
                        onClick={() => message.warn('待添加')}
                        description="微信登陆"
                        position="-150px -670px"
                    >
                    </LoginIcon>
                    <LoginIcon
                        onClick={() => message.warn('待添加')}
                        description="QQ登陆"
                        position="-190px -670px"
                    >
                    </LoginIcon>
                    <LoginIcon
                        onClick={() => message.warn('待添加')}
                        description="微博登陆"
                        position="-231px -670px"
                    >
                    </LoginIcon>
                    <LoginIcon
                        onClick={() => setLoginState('email')}
                        description="网易邮箱登陆"
                        position="-271px -670px"
                    >
                    </LoginIcon>
                </div>
            </LoginRight>
        </LoginWrapper>
    )

    const phoneLogin = (loginState) => {
        return (
            <PhoneLoginModal>
                <LoginForm loginState={loginState} />
            </PhoneLoginModal>
        )
    }

    const handleCancel = () => {
        //关闭弹出框
        dispatch(changeIsVisible(false))
        //延迟返回初始状态
        setTimeout(() => {
            setLoginState('default')
        }, 100)
    }

    // 拖拽
    const onStart = (event, uiData) => {
        console.log('---->拖拽')
        const { clientWidth, clientHeight } = window?.document?.documentElement
        const targetRect = draggleRef?.current?.getBoundingClientRect()
        setBounds({
            left: -targetRect?.left + uiData?.x,
            right: clientWidth - (targetRect?.right - uiData?.x),
            top: -targetRect?.top + uiData?.y,
            bottom: clientHeight - (targetRect?.bottom - uiData?.y),
        })
    }

    return (
        <Draggable>
            <Modal
                centered
                footer={null}
                visible={isVisible}
                onCancel={handleCancel}
                title={
                    <div
                        style={{
                            width: '100%',
                            cursor: 'move'
                        }}
                        //鼠标在标题上面时始终保持可拖动
                        onMouseOver={() => {
                            if (disabled) {
                                setDisabled(false);
                            }
                        }}

                        onMouseOut={() => {
                            setDisabled(true);
                        }}
                    >
                        {loginState === 'register' ? '注册' : '登录'}
                    </div>
                }
                modalRender={(modal) => (
                    <Draggable
                        disabled={disabled}
                        bounds={bounds}
                        onStart={(event, uiData) => onStart(event, uiData)}
                    >
                        <div ref={draggleRef}>{modal}</div>
                    </Draggable>
                )}
            >
                {loginState === 'default' ? defaultWrapperContent : null}
                {loginState === 'phone' ? phoneLogin() : null}
                {loginState === 'email' ? phoneLogin('email') : null}
                {loginState === 'register' ? phoneLogin('register') : null}
            </Modal>
        </Draggable>
    );
});

export default Login;