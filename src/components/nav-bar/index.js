import React, { memo } from 'react';
import { dicoverMenu } from '../../common/local-data';
import { NavLink } from 'react-router-dom';
import { CategoryList, NavBarWrapper } from './style'

export default memo(function AppNavBar() {
    return (
        <NavBarWrapper>
            <CategoryList className="w1100">
                {dicoverMenu.map((item) => {
                    return (
                        <li key={item.title} className="item">
                            <NavLink to={item.link} activeClassName="menu-active">
                                {item.title}
                            </NavLink>
                        </li>
                    )
                })}
            </CategoryList>
        </NavBarWrapper>
    )
})