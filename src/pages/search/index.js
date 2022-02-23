import React, { memo, useEffect, useState } from 'react';

import qs from 'querystring';

import { SearchWrapper } from './style';

import { Input } from 'antd';

import { useChangeDropBoxState } from '@/hooks/change-state'
import { searchCategories } from '../../common/local-data';
import { NavLink, Redirect } from 'react-router-dom';

import { renderRoutes } from 'react-router-config'

const Search = memo((props) => {

    const { route } = props

    const [searchSongName, setSearchSongName] = useState(null) //搜索歌曲名字
    const [activeIndex, setActiveIndex] = useState(null)  //控制导航item
    const [inputValue,setInputValue]=useState(null)

    const { Search } = Input

    const { song } = qs.parse(props.location.search.substring(1))

    useEffect(() => {
        setSearchSongName(song)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // 判断本地存储是否包含key:activeIndex
        !localStorage.hasOwnProperty('activeIndex') &&
            localStorage.setItem('activeIndex', 0)
        const activeIndex=JSON.parse(localStorage.getItem('activeIndex'))
        setActiveIndex(activeIndex) 
    },[])

    useEffect(()=>{
        localStorage.setItem('activeIndex',JSON.stringify(activeIndex))
    },[activeIndex])

    return (
        <SearchWrapper onClick={useChangeDropBoxState()}>
            <div className='w980 content'>

                <Search
                    value={inputValue}
                    style={{ width: 490 }}
                    onChange={(e) => setInputValue(e.target.value)}
                    onSearch={(value)=>setSearchSongName(value)}
                />
                <div className='search-content'>
                    <div className='search-info'>
                        搜索"{song}"，找到
                        <span className='music-amount'>20</span>单曲
                    </div>
                    <div className='m-tab search-category'>
                        {searchCategories.map((item, index) => {
                            return (
                                <NavLink
                                    key={item.key}
                                    to={{ pathname: item.link + `&song=${song}` }}
                                    className={`route-item m-tab ${activeIndex === index ? 'active' : ''
                                        }`}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    {activeIndex === index ? <Redirect to={item.link + `&song=${searchSongName}`} /> : null}
                                    <em>{item.title}</em>
                                </NavLink>
                            )
                        })}
                    </div>
                    {renderRoutes(route.routes)}
                </div>
            </div>

        </SearchWrapper>
    );
});

export default Search;