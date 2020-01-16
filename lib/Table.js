/* eslint-disable */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListTableHeader = styled('div')`
    display: flex;
    margin-bottom: 10px;
    @media screen and (max-width: 992px}){
        display: none;
    }
`;

const ListTableHeaderItem = styled('div')`
    ${({ columnWidth, buttonAction, removeCursorPointer }) => `
    width: ${columnWidth}%;
    padding: 0 10px;
    color: #304E5C;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: none;
    cursor: pointer;
    box-sizing: border-box;
    color: #0087C8;
    & > span {
        width: initial;
    }
    ${
        buttonAction
            ? `
        text-align: center;
        justify-content: center;
        `
            : ``
    }
    ${
        removeCursorPointer
            ? `
        cursor: initial;
        `
            : ``
    }
`}
`;

const ContainerPadding = styled('div')`
    margin-bottom: 14px;
`;

const TableRow = styled('div')`
    ${({ theme, firstItem, color, lastItem }) => `
    background-color: white;
    border-bottom: 1px solid #cecece;
    box-shadow: 2px 17px 18px -24px rgba(0,0,0,.3);
    display: flex;
    border-left: 4px solid ${color};
    position: relative;
    transition: all .1s;
    @media screen and (max-width: 992px){
        flex-direction: column;
        align-items: center;
        box-shadow: 0 0 20px rgba(0,0,0,.2);
        border-radius: 10px !important;
        margin: 30px 0;
        border-left: 0;
    }
    ${
        firstItem
            ? `
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-top: none;
    `
            : ``
    }

    ${
        lastItem
            ? `
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-bottom: none;
    `
            : ``
    }

    :hover {
        background-color: #F2F2F2;
    }

`}
`;
const TableRowItem = styled('div')`
    ${({ theme, columnWidth, firstItem, buttonAction, noDivider }) => `
    padding: 15px 10px;
    width: ${columnWidth}%;
    text-align: left;
    justify-content: center;
    flex-direction: column;
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    border-left: 1px solid #b4b4b4;
    
    font-size: 14px;
    color: #304E5C;
    
    @media screen and (max-width: 992px){
        width: 100%;
        align-items: center;
        border-top: 1px solid #cecece;
        padding: 0 20px 0 0;
        flex-direction: row;
        justify-content: space-between;
        border-left: 0;
        :first-child  {
            border-top: 0;
        }
        ${buttonAction ? `max-width: none;` : ``}
    }
    ${
        firstItem || noDivider
            ? `
        border-left: 0;
    `
            : ``
    }

    ${
        buttonAction
            ? `
        text-align: center;
        cursor: pointer;
        overflow: visible;
    `
            : ``
    }
`}
`;

const IconStyled = styled('div')`
    color: #304E5C;
    font-size: 18px;
    width: 22px;
    height: 22px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    transition: background 0.3s;
    &:hover{
        background: #f2f2f2 radial-gradient(circle, transparent 1%, #f2f2f2 1%) center/15000%;
    }
    &:active {
        background-color: #cecece;
        background-size: 100%;
        transition: background 0s;
    }
`;

const ActionButton = styled('div')`
    @media screen and (max-width: 992px){
        display: flex;
        flex-direction: column;
    }
`;

const ActionStyled = styled('span')`
    text-transform: capitalize
    color: #577584;
    font-size: 10px;
    @media screen and (max-width: 992px){
        font-size: 12px;
        padding: 5px 0;
    }
`;

const IconOrderBy = styled('span')`
    padding-left: 8px;
    color: #0087C8;
    font-size: 12px;
`;

const ColumnTitleMobile = styled('div')`
    display: none;
    width: 15%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    min-width: 100px;
    padding: 20px;
    margin-right: 20px;
    text-align: left;
    border-right: 1px solid #cecece;
    color: #0087C8;
    font-size: 16px;
    
    @media screen and (max-width: 992px){
        display: block;
    }
`;

const ColumnContent = styled('div')`
    @media screen and (max-width: 992px){
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
`;

function Table(props) {
    const { headers, actionPositions, data } = props;

    const [fieldOrder, setFieldOrder] = useState('');
    const [order, setOrder] = useState('desc');
    const [iconOrder, setIconOrder] = useState('sort-amount-down');
    const [globalData, setGlobalData] = useState([]);
    const [columnWidth, setColumnWidth] = useState(0);

    useEffect(() => {
        setFieldOrder(headers[0]);
    }, [headers]);

    useEffect(() => {
        if (data.length) {
            setGlobalData(data);
        }
    }, [data]);

    useEffect(() => {
        if (globalData.length) {
            if (fieldOrder) {
                orderBy(fieldOrder, order === 'desc' ? 'asc' : 'desc');
            } else {
                orderBy(headers[0], order);
            }
            updateColumnWidth();
        }
    }, [fieldOrder, globalData, headers, order, orderBy, updateColumnWidth]);

    const updateColumnWidth = () => {
        let totalWidthSetted = 0;
        let totalItemsWithWidthSetted = 0;
        if (globalData.length) {
            Object.entries(globalData[0]).forEach(item => {
                if (item[1]['width']) {
                    totalWidthSetted += item[1]['width'];
                    totalItemsWithWidthSetted++;
                }
            });
        }

        let newColumnWidth = (100 - totalWidthSetted) / (headers.length - totalItemsWithWidthSetted);

        newColumnWidth = newColumnWidth < 10 ? 10 : newColumnWidth;

        setColumnWidth(newColumnWidth);
    };

    const orderBy = useCallback((field, newOrder) => {
        const data = globalData.sort((a, b) => {
            const curr = a[field].originalValue !== undefined ? a[field].originalValue : a[field].value;
            const next = b[field].originalValue !== undefined ? b[field].originalValue : b[field].value;

            if (newOrder === 'asc') {
                return curr < next ? -1 : curr > next ? 1 : 0;
            }
            return curr > next ? -1 : curr < next ? 1 : 0;
        });

        setOrder(newOrder === 'desc' ? 'asc' : 'desc');
        setGlobalData(data);
        setFieldOrder(field);
        setIconOrder(newOrder === 'desc' ? 'sort-amount-up' : 'sort-amount-down');
    });

    return globalData.length ? (
        <>
            <ListTableHeader>
                {headers.map((item, index) => {
                    const isAction = actionPositions.some(item => item === index);
                    const width =
                        (globalData.length && globalData[0][item] && globalData[0][item].width) || columnWidth;
                    const removeTitle = globalData.length && globalData[0][item] && globalData[0][item].noTitle;
                    const noSort = globalData.length && globalData[0][item] && globalData[0][item].noSort;

                    return (
                        <ListTableHeaderItem
                            key={index}
                            buttonAction={isAction}
                            columnWidth={width}
                            removeCursorPointer={removeTitle || isAction || noSort}
                            onClick={removeTitle || noSort ? () => {} : () => orderBy(item, order)}
                        >
                            {!removeTitle && (
                                <>
                                    {item}
                                    {item === fieldOrder && !isAction && !noSort && (
                                        <IconOrderBy>
                                            <FontAwesomeIcon icon={['fal', iconOrder]} />
                                        </IconOrderBy>
                                    )}
                                </>
                            )}
                        </ListTableHeaderItem>
                    );
                })}
            </ListTableHeader>

            <ContainerPadding>
                {globalData.map((row, index, array) => {
                    return (
                        <TableRow firstItem={index === 0} lastItem={array.length - 1 === index} key={index}>
                            {headers.map((column, indexColumn, arrayColumn) => {
                                const isAction = actionPositions.some(item => item === indexColumn);
                                const columnInfo = row[column] || {};
                                const width = columnInfo.width || columnWidth;
                                return (
                                    <TableRowItem
                                        key={-indexColumn}
                                        firstItem={indexColumn === 0}
                                        lastItem={arrayColumn.length - 1 === indexColumn}
                                        buttonAction={isAction}
                                        columnWidth={width}
                                        noDivider={columnInfo.noDivider}
                                    >
                                        <ColumnTitleMobile>{column}</ColumnTitleMobile>
                                        {isAction ? (
                                            <ColumnContent>
                                                <ActionButton
                                                    onClick={columnInfo.action ? columnInfo.action : () => {}}
                                                >
                                                    {columnInfo.icon ? (
                                                        <IconStyled>
                                                            <FontAwesomeIcon icon={columnInfo.icon} />
                                                        </IconStyled>
                                                    ) : (
                                                        ``
                                                    )}
                                                    <ActionStyled>{columnInfo.value}</ActionStyled>
                                                </ActionButton>
                                            </ColumnContent>
                                        ) : (
                                            <div>{columnInfo.value} </div>
                                        )}
                                    </TableRowItem>
                                );
                            })}
                        </TableRow>
                    );
                })}
            </ContainerPadding>
        </>
    ) : null;
}

export default Table;