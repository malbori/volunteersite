import axios, { AxiosResponse } from 'axios';
import { IOperation } from '../models/operation';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(undefined, error => {
    console.log(error);
})

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
};

const Operations = {
    list: (): Promise<IOperation[]> => requests.get('/operations'),
    details: (id: string) => requests.get(`/operations/${id}`),
    create: (operation: IOperation) => requests.post('/operations', operation),
    update: (operation: IOperation) => requests.put(`/operations/${operation.id}`, operation),
    delete: (id: string) => requests.del(`/operations/${id}`)
}

export default {
    Operations
}