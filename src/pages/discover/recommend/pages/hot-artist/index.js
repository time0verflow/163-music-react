import React, { memo } from 'react';

import {hotRadios} from '@/common/local-data';

import { HotArtistWrapper } from './style';
import {ArtistHeaderLine,HotCoverInfo} from '@/components/artist-hot-composition';

const HotArtist = memo(() => {
    return (
        <HotArtistWrapper>
            <ArtistHeaderLine titleSlot="热门主播" />
            <div className='artist-container'>
                {
                    hotRadios.map(item=>{
                        return <HotCoverInfo key={item.picUrl} info={item}/>
                    })
                }
            </div>
        </HotArtistWrapper>
    );
});

export default HotArtist;