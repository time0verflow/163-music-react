import styled from "styled-components";
import download from './download.png';
import banner from './banner_sprite.png'

export const BannerWrapper = styled.div`
  background: url('${props => props.bgImage}') center center/6000px;
  width: 100%;
  height: 270px;

  .banner {
    position: relative;
    display: flex;
    height: 100%;
    justify-content: space-between;
  }
`

export const BannerLeft = styled.div`
  width: 730px;

  img {
    width: 100%;
  }
`

export const BannerRight = styled.a.attrs({
  // href: 'https://music.163.com/#/download',
  href: 'https://d1.music.126.net/dmusic/cloudmusicsetup2.8.0.198822.exe',
  target: '_blank',
})`
  width: 250px;
  background: url(${download});
`

export const BannerControl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  .btn {
    position: absolute;
    width: 37px;
    height: 63px;
    background-image: url(${banner});
    background-color: transparent;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:nth-child(1) {
      left: -68px;
      background-position: 0 -360px;
    }
    &:nth-child(2) {
      right: -68px;
      background-position: 0 -508px;
    }
  }
`
