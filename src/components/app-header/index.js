import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { HeaderLeft, HeaderRight, HeaderWrapper } from './style';
import { headerLinks } from '@/common/local-data'
import { NavLink, Redirect } from 'react-router-dom';
import { Dropdown, Input, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons'
import { debounce } from '@/utli/format-utlis';
import { getSearchSongListAction, changeFocusStateAction } from './store/actionCreator';
import { changeIsVisible } from '../login/store';
import Login from '@/components/login'
import { clearLoginState } from '../../utli/secret-key';

const AppHeader = memo(() => {
    // 导航栏展示，最后一项为外部链接
    const showSelectItem = (item, index) => {
        if (index < 3) {
            return (
                <NavLink
                    key={item.title}
                    to={item.link}
                    className="header-item"
                    activeClassName="link-active"
                >
                    <em>{item.title}</em>
                    <i className="icon"></i>
                </NavLink>
            );
        } else {
            return (
                <a href={item.link} key={item.title} className='header-item'>
                    {item.title}
                </a>
            )
        }
    }

    //props/state
    //是否改变路由,按下搜索键后进行重定向
    const [isRedirect, setIsRedirect] = useState(false);
    //搜索框内容
    const [value, setValue] = useState('');
    //高亮搜索结果
    const [recordActive, setRecordActive] = useState(-1);


    // redux hook
    const dispatch = useDispatch();

    /**
     * 
     * useSelector() 这个 hook，它的参数就是 selector 并返回 selector 的计算结果。
     * 最重要的是，这个 hook 会订阅 redux store
     * 所以每次 redux state有更新，useSelector() 里的 selector 就会重新计算一次，
     * 返回新的结果，并重新渲染当前组件
     */
    const { searchSongList, focusState, isLogin, profile } = useSelector(
        (state) => ({
            searchSongList: state.getIn(['header', 'searchSongList']),
            focusState: state.getIn(['header', 'focusState']),
            isLogin: state.getIn(['login', 'isLogin']),
            profile: state.getIn(['login', 'profile'])
        }),
        shallowEqual
    );

    // other hook
    const inputRef = useRef();
    useEffect(() => {
        // 获取焦点
        if (focusState) inputRef.current.focus();
        // 失去焦点
        else inputRef.current.blur();
    }, [focusState])


    //改变搜索框内容时防抖优化
    const changeInput = debounce((target) => {
        let value = target.value.trim();
        if (value.length < 1) return;
        // 显示下拉框
        dispatch(changeFocusStateAction(true));
        //发送网络请求
        dispatch(getSearchSongListAction(value));
    }, 400)

    //获取焦点
    const handleFocus = useCallback(() => {
        //当文本获取焦点时，处于被选中状态
        inputRef.current.select();
        //更改为获取焦点状态
        dispatch(changeFocusStateAction(true));
        //修改重定向状态
        setIsRedirect(false);
    }, [dispatch]);

    //失去焦点
    const handleBlur = useCallback(() => {
        inputRef.current.blur();
        dispatch(changeFocusStateAction(false))
        setIsRedirect(false);
    }, [dispatch])

    //表单回车：跳转到搜索详情
    const handleEnter = useCallback(
        (e) => {
            //说明当前光标有"高亮当前行"
            if (recordActive >= 0) {
                setValue(searchSongList[recordActive].name +
                    '-' +
                    searchSongList[recordActive].artists[0].name)
            }
            //取消聚焦状态
            dispatch(changeFocusStateAction(false));
            //只要在搜索框回车都进行跳转
            setIsRedirect(true);
        },
        [dispatch, recordActive, searchSongList]
    )

    // 监控用户是否按: "上"或"下"键
    const watchKeyboard = useCallback(
        (even) => {
            let activeNumber = recordActive;
            //按下↑时
            if (even.keyCode === 38) {
                activeNumber--;
                activeNumber =
                    activeNumber < 0 ? searchSongList?.length - 1 : activeNumber;
                setRecordActive(activeNumber);
                // 按下↓时
            } else if (even.keyCode === 40) {
                activeNumber++;
                activeNumber =
                    activeNumber >= searchSongList?.length ? 0 : activeNumber;
                setRecordActive(activeNumber);
            }
        },
        [recordActive, setRecordActive, searchSongList]
    );


    //登陆后的个人信息
    const showProfileContent = () => {
        return (
            <img src={profile.avatarUrl} alt='' className='profile-img' />
        )
    }

    //下拉菜单个人信息
    const profileDownMenu = () => {
        return (
            isLogin ? (
                <Menu>
                    <Menu.Item key="nickname">
                        <a
                            target="_blank"
                            href='#/'
                            onClick={(e) => e.preventDefault()}
                            rel='noopener noreferrer'
                        >
                            {profile.nickname}
                        </a>
                    </Menu.Item>
                    <Menu.Item key="user">
                        <a
                            rel='noopener noreferrer'
                            href='#/user'
                        >
                            我的主页
                        </a>
                    </Menu.Item>
                    <Menu.Item key="logout" onClick={()=>clearLoginState()} danger> 
                        退出登录
                    </Menu.Item>
                </Menu>
            ) : ''
        )
    }

    return (
        <HeaderWrapper>
            <div className='content w1100'>
                <HeaderLeft>
                    <h1>
                        <a href='#/' className='logo sprite_01'>
                            网易云音乐
                        </a>
                    </h1>
                    <div className='header-group'>
                        {headerLinks.map((item, index) => {
                            return showSelectItem(item, index)
                        })}
                    </div>
                </HeaderLeft>
                <HeaderRight>
                    <div className='search-wrapper'>
                        <Input ref={inputRef}
                            className='search '
                            placeholder='音乐/歌手'
                            size='large'
                            prefix={<SearchOutlined />}
                            onInput={({ target }) => changeInput(target)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onPressEnter={(e) => handleEnter(e)}
                            value={value}
                            onKeyDown={watchKeyboard}
                            onChange={(e) => setIsRedirect(false) || setValue(e.target.value)}
                        />
                        {
                            isRedirect && (
                                <Redirect to={{
                                    pathname: '/search/single',
                                    search: `?song=${value}&type=1`
                                }}
                                />
                            )
                        }
                        <div
                            className='down-slider'
                            style={{ display: focusState ? 'block' : 'none' }}
                        >
                            <div className='search-header'>
                                <span className='discover'>搜"{value}"相关用户&gt;</span>
                            </div>

                            <div className='content'>
                                <div className='zuo'>
                                    <span className='song'>单曲</span>
                                </div>

                                <span className='main'>
                                    {
                                        searchSongList && searchSongList.map((item, index) => {
                                            return (
                                                <div
                                                    className={'item ' + (recordActive === index ? 'active' : '')}
                                                    key={item.id}
                                                    onClick={() => { }}
                                                >
                                                    <span>{item.name}</span>-{item.artists[0].name}
                                                </div>
                                            )
                                        })
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='center'>创作者中心</div>
                    <Dropdown overlay={profileDownMenu}>
                        <div
                            className='login'
                            onClick={() => !isLogin && dispatch(changeIsVisible(true))}
                        >
                            <a
                                className='ant-dropdowm-link'
                                href='https://www.baidu.com/'
                                onClick={(e) => e.preventDefault()}
                            >
                                {isLogin ? showProfileContent() : '登录'}<DownOutlined />
                            </a>
                        </div>
                    </Dropdown>
                </HeaderRight>
            </div>
            <div className='red-line'></div>
            <Login />
        </HeaderWrapper>
    );
});

export default AppHeader;