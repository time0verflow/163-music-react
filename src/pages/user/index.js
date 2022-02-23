import React, { memo, useEffect, useState } from 'react';

import { UserWrapper } from './style';
import { useSelector } from 'react-redux';
import { getCity, getSizeImage } from '../../utli/format-utlis'
import { ManOutlined, PlayCircleOutlined, WomanOutlined } from '@ant-design/icons';
import { getUserSongList, setCreateUserSongList } from '../../service/user'
import ThemeHeaderRmc from '../../components/theme-header-rcm'
import SongCover from '../../components/song-cover';
import { Input, message, Modal } from 'antd';

const User = memo((props) => {
    //state
    const [playlist, setPlaylist] = useState([])
    const [playlistName, setPlaylistName] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)

    //redux hook
    const { userinfo, cookie } = useSelector((state) => ({
        userinfo: state.getIn(['login', 'profile']),
        cookie: state.getIn(['login', 'cookie'])
    }))



    // 从store中获取用户信息
    const userPic =
        userinfo && userinfo.avatarUrl && getSizeImage(userinfo.avatarUrl, 180)
    const vip = userinfo && userinfo.vipType
    const nickname = userinfo && userinfo.nickname
    const gender = userinfo && userinfo.gender === 1 ? 'man' : 'woman'
    const dynamic = [
        {
            name: '动态',
            value: userinfo && userinfo.authStatus,
        },
        {
            name: '关注',
            value: userinfo && userinfo.follows,
        },
        {
            name: '粉丝',
            value: userinfo && userinfo.followeds,
        },
    ]
    const signature = userinfo && userinfo.signature
    const city = userinfo && userinfo.city && getCity(userinfo.city)
    const songlistCount = userinfo && userinfo.playlistCount
    const userId = userinfo && userinfo.userId


    /* const toRedirect = useCallback(() => {
        props.history.push('/')
    }, [props.history])

    const showModal = useCallback(() => {
        dispatch(changeIsVisible(true))
    }, [dispatch]) */

    // 获取用户歌单
    useEffect(() => {
        getUserSongList(userId).then((res) => {
            setPlaylist(res.playlist)
        })
    }, [userId])

    const showModalDom = () => {
        setIsModalVisible(true)
    }

    const renderCreatePlaylist = () => {
        return (
            <span className="creator" onClick={showModalDom}>
                创建歌单
            </span>
        )
    }

    // 确认创建歌单
    const handleOK = () => {
        setIsModalVisible(false)
        setCreateUserSongList(playlistName, cookie).then((res) => {
            if (res.code === 200) {
                message.success('创建成功').then(() => {
                    window.location.reload()
                })
            }
        })
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }


    return (
        <UserWrapper className='content'>
            {/* 登录鉴权组件 */}
            {/*  <Auth flag={isLogin} to={toRedirect} showModal={showModal} /> */}
            <div className='user-info flex'>
                <div className='user-pic'>
                    <img src={userPic} alt=''></img>
                </div>
                <div className='user-detail'>
                    <div className='nickname-wrap'>
                        <h3 className='nickname gap'>{nickname}</h3>
                        <span className='icon-small lev'>
                            {vip}
                            <i className='icon-small'></i>
                        </span>
                        <div className='gender-icon'>
                            {gender === 'man' ? (
                                <ManOutlined className="gender-icon man" />
                            ) : (
                                <WomanOutlined className="gender-icon" color="#e60026" />
                            )}
                        </div>
                    </div>
                    <div className='dynamic-wrap flex'>
                        {dynamic.map((item) => {
                            return (
                                <div className='dynamic-item' key={item.name}>
                                    <strong className='count'>{item.value}</strong>
                                    <span>{item.name}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className='recommend'>个人介绍：{signature}</div>
                    <div className='address'>所在地区：{city}</div>
                </div>
            </div>
            <div className='song-list'>
                <ThemeHeaderRmc
                    title={`我的歌单(${songlistCount})`}
                    showIcon={true}
                    right={renderCreatePlaylist()}
                />
                <div className='playlist flex'>
                    {
                        playlist && playlist.map((item) => {
                            return <SongCover info={item} key={item.id} />
                        })
                    }
                </div>
            </div>
            <Modal
                title="创建歌单"
                onText="确认"
                cancelText="取消"
                visible={isModalVisible}
                onOk={handleOK}
                onCancel={handleCancel}
            >
                <Input
                    size='large'
                    placeholder='请输入歌单'
                    prefix={<PlayCircleOutlined />}
                    value={playlistName}
                    onInput={(e) => setPlaylistName(e.target.value)}
                />
            </Modal>
        </UserWrapper >
    );
});

export default User;