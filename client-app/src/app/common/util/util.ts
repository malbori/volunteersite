import { IOperation, IAttendee } from "../../models/operation";
import { IUser } from "../../models/user";

export const combineDateAndTime = (date: Date, time: Date) => {
  //const timeString = time.getHours() + time.getMinutes() + ":00";

  // const year = date.getFullYear();
  // const month = date.getMonth() + 1;
  // const day = date.getDate();
  // const dateString = `${year}-${month}-${day}`;
  const dateString = date.toISOString().split('T')[0];
  const timeString = time.toISOString().split('T')[1];

  return new Date(dateString + 'T' + timeString);
};

export const setOperationProps = (operation: IOperation, user: IUser) => {
  operation.date = new Date(operation.date);
  operation.isGoing = operation.attendees.some(
    (a) => a.userName === user.username
  );
  operation.isHost = operation.attendees.some(
    (a) => a.userName === user.username && a.isHost
  );
  return operation;
};

export const createAttendee = (user: IUser): IAttendee => {
  return {
    displayName: user.displayName,
    isHost: false,
    userName: user.username,
    image: user.image!,
  };
};
