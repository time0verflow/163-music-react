import request from './request';
/*
*接口返回：
*code:200
*banners:轮播图数组的相关信息，[{},{}]
*/
export function getTopBanners() {
    return request({
        url: '/banner'
    })
}

// 热门推荐
export function getHotRecommends(limit) {
    return request({
      url: "/personalized",
      params: {
        limit
      }
    })
  }
  
  // 首页下的新碟上架
  export function getNewAlbums() {
    return request({
      url: '/album/newest'
    })
  }
  
  // 入驻歌手
  export function getSettleSinger(limit) {
    return request({
      url: '/artist/list',
      params: {
        limit
      }
    })
  }