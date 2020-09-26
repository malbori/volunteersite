import React, { useState, useEffect, Fragment } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import axios from 'axios';
import { IOperation } from '../models/operation'
import { IndexedAccessType } from 'typescript';
import NavBar from '../../features/nav/NavBar';

const App = () => {

  const [operations, setOperations] = useState<IOperation[]>([]);

  useEffect(() => {
    axios
      .get<IOperation[]>('http://localhost:5000/api/operations')
      .then(res => {
        setOperations(res.data);
      });
  }, []);

  return (
    <Fragment>
      <NavBar />

      <List>
        {operations.map(operation => (
          <List.Item key={operation.id}>{operation.title}</List.Item>
        ))}
      </List>

    </Fragment>
  );
};

export default App;