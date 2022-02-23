import React, { memo } from 'react';
import { parseTime } from '../../../../utli/format-utlis';
import { DateWrapper } from './date-style';

const date = memo(() => {

    const day=parseTime(new Date(),'{d}')
    let week='星期'+'日一二三四五六'.charAt(new Date().getDay());
    
    return (
        <DateWrapper>
            <div className="head">{week}</div>
            <div className="day">{day}</div>
            <div className="mask date"></div>
        </DateWrapper>
    );
});

export default date;