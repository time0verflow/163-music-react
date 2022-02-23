import React, { memo } from 'react';
import { PaginationWrapper } from './style';
import { Pagination } from 'antd';


const MyPagination = memo((props) => {
    const { currentPage, total, onPageChange,pageSize } = props

    // render function
    function itemRender(current, type, originalElement) {
        if (type === 'prev') {
            return <button className="control prev"> &lt; 上一页</button>;
        }
        if (type === 'next') {
            return <button className="control next">下一页 &gt;</button>;
        }
        return originalElement;
    }

    return (
        <PaginationWrapper>
            <Pagination className="pagination"
                size="small"
                current={currentPage}
                defaultCurrent={1}
                total={total}
                pageSize={pageSize}
                showSizeChanger={false}
                itemRender={itemRender}
                onChange={onPageChange}
            />
        </PaginationWrapper>
    );
});

export default MyPagination;