import { Table, Pagination, Tooltip } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const StyledTable = styled(Table)`
  & > div > div > div > div > div > table > tbody {
    tr:nth-child(even) {
      background: #eaeaea;
    }

    tr:nth-child(odd) {
      background: #fafafa;
    }
  }

  .ant-table-thead > tr:first-child > th:first-child {
    border-radius: 0;
    border-top-left-radius: 0;
  }
`;

const StyledPagination = styled(Pagination)`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const TableWrapper = styled.div`
  width: 100%;
`;

const WupaiCell = styled.div`
  text-align: center;
  word-break: keep-all;
`;

const onPageChange = refetch => (page, size) => {
  const variables = { sortByWupai: -1, page, limit: size };
  refetch(variables);
};

const onPageSizeChange = refetch => (current, size) => {
  const variables = { sortByWupai: -1, page: current, limit: size };
  refetch(variables);
};

const getKey = mongoObject => mongoObject._id;

const getColor = (faculties, facultyColors) => {
  if (faculties && faculties.length > 0 && facultyColors && facultyColors[faculties[0]]) {
    return { cursor: 'pointer', color: facultyColors[faculties[0]].color };
  }
  return { cursor: 'pointer', color: '#000000a6' };
};

const rankingTable = facultyColors => (schema) => {
  const {
    data, loading, error, refetch,
  } = schema;
  const handlePageChange = onPageChange(refetch);
  const handlePageSizeChange = onPageSizeChange(refetch);

  if (error) {
    return <div>Error</div>;
  }

  const columns = [
    {
      title: <WupaiCell> #</WupaiCell>,
      dataIndex: 'position',
      key: 'position',
      width: 50,
      render: (text, { faculties }) => (
        <WupaiCell style={getColor(faculties, facultyColors)}>
          {text}
        </WupaiCell>
      ),
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: (text, { faculties, _id }) => {
        const style = getColor(faculties, facultyColors);
        return (
          faculties
            ? (
              <Link href={`/profile?userId=${_id}`}>
                <Tooltip style={style} placement="right" title={facultyColors[faculties[0]] ? facultyColors[faculties[0]].name : 'Нет факультета'}>
                  <div style={style}>
                    {text || 'Нет имени'}
                  </div>
                </Tooltip>
              </Link>
            )
            : <div>{text}</div>);
      },
    },
    {
      title: <WupaiCell> W </WupaiCell>,
      dataIndex: 'wupai',
      key: 'wupai',
      width: 75,
      render: (text, { faculties }) => (
        <WupaiCell style={getColor(faculties, facultyColors)}>
          {text}
        </WupaiCell>
      ),
    },
  ];

  const {
    docs: dataSource, page, limit, total: totalDocs,
  } = loading
    ? {
      total: 0, docs: [], page: 1, pages: 1, limit: 10,
    }
    : data;

  const total = Number(totalDocs);
  const current = Number(page);
  const pageSize = Number(limit);
  return (
    <TableWrapper>
      <StyledTable
        loading={loading}
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        rowKey={getKey}
      />
      <StyledPagination
        showSizeChanger
        key={total}
        pageSize={pageSize}
        onChange={handlePageChange}
        onShowSizeChange={handlePageSizeChange}
        current={current}
        total={total}
      />
    </TableWrapper>
  );
};

rankingTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({
    docs: PropTypes.arrayOf(PropTypes.shape({})),
    page: PropTypes.number,
    pages: PropTypes.number,
    limit: PropTypes.number,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};


export default rankingTable;
