import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    StructuredListWrapper, StructuredListHead, StructuredListRow,
    StructuredListCell, StructuredListBody, StructuredListSkeleton,
    Tag, Tile
} from '@carbon/react';
import {
    CheckmarkFilled,
    ErrorFilled,
    Add,
    Edit,
    Delete,
    Calendar
} from '@carbon/react/icons';

function formatTimestamp(timestamp) {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

function getOperationIcon(operation) {
    switch (operation) {
        case 'ADD':
            return <Add size={16} />;
        case 'UPDATE':
            return <Edit size={16} />;
        case 'DELETE':
            return <Delete size={16} />;
        default:
            return null;
    }
}

function getStatusTag(status) {
    switch (status) {
        case 'SUCCESS':
            return (
                <Tag type="success" size="sm">
                    <CheckmarkFilled />
                    Success
                </Tag>
            );
        case 'FAILURE':
            return (
                <Tag type="error" size="sm">
                    <ErrorFilled />
                    Failure
                </Tag>
            );
        default:
            return <Tag size="sm">{status}</Tag>;
    }
}

function getOperationTypeTag(operation) {
    const typeMap = {
        'ADD': 'green',
        'UPDATE': 'blue',
        'DELETE': 'red'
    };
    
    return (
        <Tag type={typeMap[operation] || 'gray'} size="sm">
            {getOperationIcon(operation)}
            <span style={{ marginLeft: '4px' }}>{operation}</span>
        </Tag>
    );
}

export default function AuditPage(props) {
    const { isLoading, error, data } = useQuery({
        queryKey: ['audit-events'],
        queryFn: () => props.auditService.getAuditEvents(),
        refetchInterval: 5000
    });

    const sortedData = data ? [...data].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    ) : [];

    return (
        <div className='audit-page'>
            <h2>Audit Log</h2>
            <p style={{ marginBottom: '1rem', color: '#6f6f6f' }}>
                Real-time audit trail of all inventory operations
            </p>
            
            {isLoading ? (
                <StructuredListSkeleton />
            ) : error ? (
                <Tile kind="error">
                    <h4>Failed to load audit events</h4>
                    <p>Please try again later</p>
                </Tile>
            ) : sortedData.length === 0 ? (
                <Tile kind="info">
                    <h4>No audit events</h4>
                    <p>Audit events will appear here when operations are performed</p>
                </Tile>
            ) : (
                <StructuredListWrapper>
                    <StructuredListHead>
                        <StructuredListRow head>
                            <StructuredListCell head>Timestamp</StructuredListCell>
                            <StructuredListCell head>Operation</StructuredListCell>
                            <StructuredListCell head>Item ID</StructuredListCell>
                            <StructuredListCell head>Status</StructuredListCell>
                            <StructuredListCell head>Error Message</StructuredListCell>
                        </StructuredListRow>
                    </StructuredListHead>
                    <StructuredListBody>
                        {sortedData.map((event, index) => (
                            <StructuredListRow key={`${event.timestamp}-${index}`}>
                                <StructuredListCell noWrap>
                                    <Calendar size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                    {formatTimestamp(event.timestamp)}
                                </StructuredListCell>
                                <StructuredListCell noWrap>
                                    {getOperationTypeTag(event.operation)}
                                </StructuredListCell>
                                <StructuredListCell noWrap>
                                    {event.itemId || 'N/A'}
                                </StructuredListCell>
                                <StructuredListCell noWrap>
                                    {getStatusTag(event.status)}
                                </StructuredListCell>
                                <StructuredListCell>
                                    {event.status === 'FAILURE' && event.errorMessage ? (
                                        <span style={{ color: '#da1e28' }}>
                                            {event.errorMessage}
                                        </span>
                                    ) : (
                                        <span style={{ color: '#6f6f6f' }}>—</span>
                                    )}
                                </StructuredListCell>
                            </StructuredListRow>
                        ))}
                    </StructuredListBody>
                </StructuredListWrapper>
            )}
        </div>
    );
}
