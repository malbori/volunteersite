import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { OperationFormValues } from '../../../app/models/operation';
import { v4 as uuid } from 'uuid';
import OperationStore from '../../../app/stores/operationStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import { category } from '../../../app/common/options/categoryOptions';
import { combineDateAndTime } from '../../../app/common/util';
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from 'revalidate';

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')
});

interface DetailParams {
  id: string;
}

const OperationForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const operationStore = useContext(OperationStore);
  const {
    createOperation,
    editOperation,
    submitting,
    loadOperation
  } = operationStore;

  const [operation, setOperation] = useState(new OperationFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadOperation(match.params.id)
        .then(operation => {
          setOperation(new OperationFormValues(operation));
        })
        .finally(() => setLoading(false));
    }
  }, [loadOperation, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...operation } = values;
    operation.date = dateAndTime;
    if (!operation.id) {
      let newOperation = {
        ...operation,
        id: uuid()
      };
      createOperation(newOperation);
    } else {
      editOperation(operation);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={operation}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name='title'
                  placeholder='Title'
                  value={operation.title}
                  component={TextInput}
                />
                <Field
                  name='description'
                  placeholder='Description'
                  rows={3}
                  value={operation.description}
                  component={TextAreaInput}
                />
                <Field
                  component={SelectInput}
                  options={category}
                  name='category'
                  placeholder='Category'
                  value={operation.category}
                />
                <Form.Group widths='equal'>
                  <Field
                    component={DateInput}
                    name='date'
                    date={true}
                    placeholder='Date'
                    value={operation.date}
                  />
                  <Field
                    component={DateInput}
                    name='time'
                    time={true}
                    placeholder='Time'
                    value={operation.time}
                  />
                </Form.Group>

                <Field
                  component={TextInput}
                  name='city'
                  placeholder='City'
                  value={operation.city}
                />
                <Field
                  component={TextInput}
                  name='venue'
                  placeholder='Venue'
                  value={operation.venue}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                />
                <Button
                  onClick={
                    operation.id
                      ? () => history.push(`/operation/${operation.id}`)
                      : () => history.push('/operation')
                  }
                  disabled={loading}
                  floated='right'
                  type='button'
                  content='Cancel'
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(OperationForm);
