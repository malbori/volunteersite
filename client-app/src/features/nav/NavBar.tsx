import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import OperationStore from '../../app/stores/operationStore';
import { observer } from 'mobx-react-lite';

const NavBar = () => {
  const operationStore = useContext(OperationStore);
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
            Reoperations
        </Menu.Item>
        <Menu.Item name='Operations' />
        <Menu.Item>
          <Button onClick={operationStore.openCreateForm} positive content='Create Operation' />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
