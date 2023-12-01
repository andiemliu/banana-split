import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './receiptBody.css';

const InitialInputTable = ({ id, peopleNamesArr, handleCheckboxChange, calculateOwedAmount, checkedItems, data }) => {
  // Render your component with the fetched data
  return (
    <div className='modalBody'>
      {/* {data.map((lineItem, index) => (
        <LineItemComponent key={index} lineItem={lineItem} />
      ))} */}
      <div className='receiptTable'>
        <Table hover>
          <thead>
            <tr>
              <th>Items</th>
              {peopleNamesArr?.map((person, personIndex) => (
                <th key={personIndex}>{person}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, itemIndex) => (
              <tr key={itemIndex}>
                <td>{item.description} (${item.total})</td>
                {peopleNamesArr?.map((person, personIndex) => ( //inputData.peopleNamesArr
                  <td key={personIndex}>
                    <Form.Check
                      type="checkbox"
                      checked={checkedItems[`${personIndex}-${itemIndex}`] || false}
                      onChange={() => handleCheckboxChange(personIndex, itemIndex)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total Owed</td>
              {peopleNamesArr?.map((person, personIndex) => (
                <td key={personIndex}>{calculateOwedAmount(personIndex)}</td>
              ))}
            </tr>
          </tfoot>
        </Table>
        {/* <Form onSubmit={handleFormSubmit}>
          <Table responsive>
            <thead>
              <tr>
                <th>Receipt</th>
                {Array.from({ length: 4 }).map((_, index) => (
                  <th key={index}>Person {index}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((content, index) => (
                <tr key={index}>
                  <td>{content.description} - ${content.total}</td>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <td key={index}>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="mb-3">
                            <Form.Check // prettier-ignore
                              type={type}
                              id={`default-${type}`}                        />
                          </div>
                        ))}
                      </Form>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Form> */}
      </div>
    </div>
  );
};

InitialInputTable.propTypes = {
  id: PropTypes.string,
  peopleNamesArr: PropTypes.array,
  data: PropTypes.array
};

export default InitialInputTable;
