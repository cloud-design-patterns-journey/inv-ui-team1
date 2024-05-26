import React from "react";
import {
    StructuredListWrapper, StructuredListHead, StructuredListRow,
    StructuredListCell, StructuredListBody
} from '@carbon/react';

const DEFAULT_ITEMS = [
    {
        name: 'Item 1',
        stock: 10,
        unitPrice: 51.2,
        manufacturer: 'Sony'
    },
    {
        name: 'Item 2',
        stock: 50,
        unitPrice: 10,
        manufacturer: 'LG'
    },
]

export default function StockItemList() {
    const items = DEFAULT_ITEMS;

    return (
        <div className="stock-items-list">
            <h2>Stock Items</h2>
            <StructuredListWrapper>
                <StructuredListHead>
                    <StructuredListRow head>
                        <StructuredListCell head>Name</StructuredListCell>
                        <StructuredListCell head>Stock</StructuredListCell>
                        <StructuredListCell head>Unit Price</StructuredListCell>
                        <StructuredListCell head>Manufacturer</StructuredListCell>
                    </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                    {items.map(item => (
                        <StructuredListRow>
                            <StructuredListCell noWrap>{item.name}</StructuredListCell>
                            <StructuredListCell noWrap>{item.stock}</StructuredListCell>
                            <StructuredListCell noWrap>{item.unitPrice}</StructuredListCell>
                            <StructuredListCell noWrap>{item.manufacturer}</StructuredListCell>
                        </StructuredListRow>
                    ))}
                </StructuredListBody>
            </StructuredListWrapper>
        </div>
    );
}