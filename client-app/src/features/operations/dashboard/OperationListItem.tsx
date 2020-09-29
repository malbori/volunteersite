import React from 'react';
import { Item, Button, Segment, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IOperation } from '../../../app/models/operation';
import { format } from 'date-fns';
import OperationListItemAttendees from './OperationListItemAttendees';

const OperationListItem: React.FC<{ operation: IOperation }> = ({ operation }) => {
  const host = operation.attendees.filter(x => x.isHost)[0];
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={host.image || '/assets/user.png'} />
            <Item.Content>
              <Item.Header as={Link} to={`/operations/${operation.id}`}>
                {operation.title}
              </Item.Header>
              <Item.Description>Hosted by {host.displayName}</Item.Description>
              {operation.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color='orange'
                    content='You are hosting this operation'
                  />
                </Item.Description>
              )}
              {operation.isGoing && !operation.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color='green'
                    content='You are going to this operation'
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='clock' /> {format(operation.date, 'h:mm a')}
        <Icon name='marker' /> {operation.venue}, {operation.city}
      </Segment>
      <Segment secondary>
        <OperationListItemAttendees attendees={operation.attendees} />
      </Segment>
      <Segment clearing>
        <span>{operation.description}</span>
        <Button
          as={Link}
          to={`/operations/${operation.id}`}
          floated='right'
          content='View'
          color='blue'
        />
      </Segment>
    </Segment.Group>
  );
};

export default OperationListItem;
