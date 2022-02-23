import React, { memo, useEffect, useState, useCallback, createElement } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { SoNewWrapper, SongCommentWrapper, WonderfulWrapper } from './style';
import { getHotCommentAction, changeCurrentCommentTotal } from '../store/actionCreator';
import { getSongComment } from '@/service/player'
import { Avatar, Comment, Tooltip, message } from 'antd';
import ThemeHeader from '@/components/theme-header';
import MyPagination from '@/components/pagination';
import ThemeComment from '@/components/theme-comment'
import { changeIsVisible } from '@/components/login/store'
import { sendSongComment } from '@/service/player'
import { sendLikeComment } from '@/service/songs';
import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import {getCount} from '@/utli/format-utlis'

const SongComment = memo(() => {
    // props/state
    const [songComment, setSongComment] = useState([])  //热门评论
    const [currentPage, setCurrentPage] = useState(1)   //最新评论的当前页码
    const [total, setTotal] = useState(0)  //评论数目
    const [flag, setFlag] = useState(false)  //是否已经点赞
    const [liked, setLiked] = useState([]) // 歌曲的点赞状态
    // const [total, setTotal] = useState(0)

    
    // redux hook
    const dispatch = useDispatch()
    const {
        hotComments,
        currentSongId,
        isLogin,
        cookie,
        avatarUrl,
    } = useSelector(
        (state) => ({
            hotComments: state.getIn(['player', 'hotComments']),
            currentSongId: state.getIn(['player', 'currentSong', 'id']),
            isLogin: state.getIn(['login', 'isLogin']),
            cookie: state.getIn(['login', 'cookie']),
            avatarUrl: state.getIn(['login', 'profile', 'avatarUrl']),
        }),
        shallowEqual
    )

    // other handle
    function formatDate(time = +new Date()) {
        var date = new Date(time + 8 * 3600 * 1000) // 增加8小时
        return date.toJSON().substr(0, 19).replace('T', ' ')
    }

    //加载组件获得评论数据和评论总数
    useEffect(() => {
        dispatch(getHotCommentAction(currentSongId))
        getSongComment(currentSongId).then((res) => {
            setSongComment(res.comments)
            setTotal(res.total)
            dispatch(changeCurrentCommentTotal(res.total))
        })
    }, [dispatch, currentSongId])

    // 聚焦评论框看是否登录
    const commentSongcheckout = () => {
        // 没登录
        console.log(isLogin)
        if (!isLogin) dispatch(changeIsVisible(true))
    }


    // 评论成功
    const commentCallbackOk = (value) => {
        sendSongComment(currentSongId, value, cookie).then((res) => {
            if (res.code === 200) message.success('评论成功').then(() => {
                getSongComment(currentSongId).then((res) => {
                    setSongComment(res.comments)
                    setTotal(res.total)
                })
            })
        })
    }

    // 分页
    const changePage = useCallback(
        (currentPage) => {
            setCurrentPage(currentPage)
            // offset=(当前页数-1)*limit
            const targePageCount = (currentPage - 1) * 20
            getSongComment(currentSongId, 20, targePageCount).then((res) => {
                setSongComment(res.comments)
                setTotal(res.total)
            })
        },
        [currentSongId]
    )

    // 点赞评论
    const likComment = (data,index) => {
        // 登录鉴权
        if (!isLogin) {
            dispatch(changeIsVisible(true))
        }

        if (!flag) {
            liked[index].liked = true
            liked[index].count += 1
            setLiked(liked)

            //调用点赞接口
            sendLikeComment(currentSongId, data.commentId, 1, cookie).then((res) => {
                if (res.code === 200) {
                    message.success('点赞成功')
                } else {
                    message.error('请稍后再试')
                }
            })
        } else {
            liked[index].liked = false
            liked[index].count -= 1
            setLiked(liked)
            setFlag(true)

            // 取消点赞接口
            sendLikeComment(currentSongId, data.commentId, 0, cookie).then((res) => {
                if (res.code === 200) {
                    message.success('取消点赞成功')
                } else {
                    message.error('请稍后重试')
                }
            })
        }
        setFlag(!flag)
    }

    // 点赞HTML
    const getLikeTemplateAction = (item, index) => {
        liked.push({
            liked: item.liked,
            count: item.likedCount
        })

        return [
            <Tooltip key='comment-basic-like' title="Like" className='comment-like'>
                <span onClick={()=>likComment(item,index)}>
                    {
                        createElement(
                            liked[index].liked === true ? LikeFilled : LikeOutlined
                        )
                    }
                    <span className='comment-action'>{getCount(liked[index].count)}</span>
                </span>
            </Tooltip>
        ]
    }

    return (
        <SongCommentWrapper>
            <ThemeHeader title="评论" />
            {/*评论内容*/}
            <ThemeComment
                isLogin={isLogin}
                photo={avatarUrl}
                onFocus={() => commentSongcheckout()}
                callbackOk={(value) => commentCallbackOk(value)}
            />
            {/*精彩评论*/}
            <WonderfulWrapper>
                <div className='header-comment'>精彩评论</div>
                {
                    hotComments && hotComments.map((item, index) => {
                        return (
                            <Comment
                                key={item.commentId}
                                author={item.user.nickname}
                                avatar={<Avatar src={item.user.avatarUrl} alt='Han Solo' />}
                                content={<p>{item.content}</p>}
                                datetime={
                                    <Tooltip title={formatDate(item.time)}>
                                        {
                                            formatDate(item.time).slice(0, formatDate(item.time).indexOf(' '))
                                        }
                                    </Tooltip>
                                }
                            />
                        )
                    })
                }
            </WonderfulWrapper>
            {/*最新评论*/}
            <SoNewWrapper>
                <div className='header-comment'>最新评论</div>
                {
                    songComment && songComment.map((item, index) => {
                        return (
                            <Comment
                                actions={getLikeTemplateAction(item,index)}
                                key={item.commentId}
                                author={item.user.nickname}
                                avatar={<Avatar src={item.user.avatarUrl} alt="Han Solo" />}
                                content={<p>{item.content}</p>}
                                datetime={
                                    <Tooltip title={formatDate(item.time)}>
                                        {
                                            formatDate(item.time).slice(0, formatDate(item.time).indexOf(' '))
                                        }
                                    </Tooltip>
                                }
                            />
                        )
                    })
                }
            </SoNewWrapper>
            {/*分页*/}
            <MyPagination
                currentPage={currentPage}
                pageSize={20}
                total={total}
                onPageChange={(currentPage) => changePage(currentPage)}
            />
        </SongCommentWrapper>
    );
});

export default SongComment;