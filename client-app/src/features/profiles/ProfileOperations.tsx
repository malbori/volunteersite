import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IUserOperation } from '../../app/models/profile';
import { format } from 'date-fns';
import { RootStoreContext } from '../../app/stores/rootStore';

const panes = [
  { menuItem: 'Future Events', pane: { key: 'futureEvents' } },
  { menuItem: 'Past Events', pane: { key: 'pastEvents' } },
  { menuItem: 'Hosting', pane: { key: 'hosted' } }
];

const ProfileEvents = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadUserOperations,
    profile,
    loadingOperations,
    userOperations
  } = rootStore.profileStore!;

  useEffect(() => {
    loadUserOperations(profile!.username);
  }, [loadUserOperations, profile]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    let predicate;
    switch (data.activeIndex) {
      case 1:
        predicate = 'past';
        break;
      case 2:
        predicate = 'hosting';
        break;
      default:
        predicate = 'future';
        break;
    }
    loadUserOperations(profile!.username, predicate);
  };

  return (
    <Tab.Pane loading={loadingOperations}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content={'Operations'} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userOperations.map((Event: IUserOperation) => (
              <Card
                as={Link}
                to={`/operations/${Event.id}`}
                key={Event.id}
              >
                <Image
                  src={`/assets/categoryImages/${Event.category}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Header textAlign='center'>{Event.title}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>{format(new Date(Event.date), 'do LLL')}</div>
                    <div>{format(new Date(Event.date), 'h:mm a')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileEvents);
