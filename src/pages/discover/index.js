import React, { memo } from 'react'
import { HeaderCategory } from './style'

import AppNavBar from '@/components/nav-bar'

import {renderRoutes} from 'react-router-config';


export default memo(function Discover(props){

    const {route}=props;
    
    return(
        <HeaderCategory>
            <AppNavBar />
            {renderRoutes(route.routes)}
        </HeaderCategory>
    )
})