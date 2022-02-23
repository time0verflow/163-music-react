// 1. 第三方开库
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

// 2. 功能性东西
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getTopBannersAction } from '../../store/actionCreator'

// 3. 导入的组件
import { Carousel } from 'antd'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'

export default memo(function TopBanners() {

    //组件内的state,用于切换相关背景
    const [currentIndex, setCurrentIndex] = useState(0);

    // redux Hook 组件和redux关联: 获取数据和进行操作
    const dispatch = useDispatch()
    const { topBanners } = useSelector(
        state => ({
            topBanners: state.getIn(['recommend', 'topBanners'])
        }),
        shallowEqual
    )

    // 其他Hook

    //对轮播图的应用
    const bannerRef = useRef()


    //组件加载完成的副效应，useEffect()的第二个参数是一个数组，
    /*指定了第一个参数（副效应函数）的依赖项（dispatch）。只有该变量发生变化时，副效应函数才会执行*/
    useEffect(() => {
        // 在组件渲染之后发送网络请求
        dispatch(getTopBannersAction())
    }, [dispatch])

    const bannerChange = useCallback((from, to) => {
        setCurrentIndex(to)
    }, [])



    const bgImage =
        topBanners &&
        topBanners[currentIndex] &&
        topBanners[currentIndex].imageUrl + '?imageView&blur=40x20'

    /* console.log("top", bgImage); */
    /* console.log(bannerRef,"ref"); */
    return (<BannerWrapper bgImage={bgImage}>
        <div className="banner w980">
            <BannerLeft>
                <Carousel
                    effect="fade"
                    autoplay={true}
                    ref={bannerRef}
                    beforeChange={bannerChange}
                >
                    {topBanners && topBanners.map(item => {
                        return (
                            <div key={item.imageUrl}>
                                <img src={item.imageUrl} alt={item.typeTitle} />
                            </div>
                        )
                    })}
                </Carousel>
            </BannerLeft>
            <BannerRight />
            <BannerControl>
                <button
                    className="btn"
                    onClick={() => bannerRef.current.prev()}
                ></button>
                <button
                    className="btn"
                    onClick={() => bannerRef.current.next()}
                ></button>
            </BannerControl>
        </div>
    </BannerWrapper>)
})