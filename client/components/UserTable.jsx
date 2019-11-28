import React, { useState } from 'react';
import { filterTable } from '../services/System';
import SearchForm from './SerachForm';
import PropTypes from 'prop-types';
import Paginator from './Paginator';

import Table from 'react-bootstrap/Table';

function UserTable({ users }) {
  const [searchVal, setSearchVal] = useState('');

  const handleSearchChange = e => setSearchVal(e.target.value);

  if (!users && !users.length) return <h1>No users</h1>;

  return (
    <>
      <SearchForm setSearchVal={handleSearchChange} searchVal={searchVal} />
      <Paginator step={15} data={filterTable(users, searchVal)}>
        {paginatedData => (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Cars</th>
                <th>Mobile</th>
                <th>Skype</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map(({ id, name, cars, mobile, skype }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>
                    {cars.map((car, index) => (
                      <div key={index}>{`${car.number} ${car.brand}`}</div>
                    ))}
                  </td>
                  <td>
                    {mobile.map((mob, index) => (
                      <div key={index}>{mob}</div>
                    ))}
                  </td>
                  <td>{skype}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Paginator>
    </>
  );
}

UserTable.propTypes = {
  users: PropTypes.array
};

export default UserTable;
