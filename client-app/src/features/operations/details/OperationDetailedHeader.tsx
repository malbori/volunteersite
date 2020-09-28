import React from 'react';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { IOperation } from '../../../app/models/operation';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';

const operationImageStyle = {
  filter: 'brightness(30%)'
};

const operationImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const OperationDetailedHeader: React.FC<{operation: IOperation}> = ({operation}) => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${operation.category}.jpg`}
          fluid
          style={operationImageStyle}
        />
        <Segment style={operationImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={operation.title}
                  style={{ color: 'white' }}
                />
                <p>{format(operation.date, 'eeee do MMMM')}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        <Button color='teal'>Join Operation</Button>
        <Button>Cancel attendance</Button>
        <Button as={Link} to={`/manage/${operation.id}`} color='orange' floated='right'>
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(OperationDetailedHeader);
