import {IClient} from "../types/IClient";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {deleteClient, fetchClients, patchClient, postClient} from "../actions/ClientAction";

type IClientState = {
    clients: Array<IClient>,
    client: IClient,
    //status: 'PENDING' | 'FULFILLED' | 'REJECTED',
    status: boolean,
}

const sampleClient: IClient = {
    id: 0,
    name: '',
    phone: ''
}

const initialState: IClientState = {
    clients: [],
    client: {
        id: 0,
        name: '',
        phone: ''
    },
    status: false,
}


export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        removeItem(state, action: PayloadAction<number>) {
            let clone: Array<IClient> = JSON.parse(JSON.stringify(state.clients));
            state.clients = clone.filter((item: IClient) => item.id !== action.payload);
        },
        setClientValue(state, action: PayloadAction<{ value: string, name: string }>) {
            // @ts-ignore
            state.client[action.payload.name] = action.payload.value;
        },

        getItem(state, action: PayloadAction<IClient>) {
            state.clients.map((item: IClient) => {
                if (item.id === action.payload.id) {
                    state.client = item;
                }
            })
        },
        clearClient (state) {
            state.client = sampleClient;
        }

    },
    extraReducers: {
        [fetchClients.pending.type]: (state) => {
            state.status = true;
        },
        [fetchClients.fulfilled.type]: (state, action: PayloadAction<Array<IClient>>) => {
            state.clients = action.payload;
            state.status = false;
        },
        [fetchClients.rejected.type]: (state) => {
            toast.error('Ошибка загрузки клиентов', {
                position: 'bottom-center'
            })
            state.status = false;
        },


        [postClient.pending.type]: (state) => {
            state.status = true;
        },
        [postClient.fulfilled.type]: (state, action: PayloadAction<IClient>) => {
            state.clients.push(action.payload);
            state.client = sampleClient;
            state.status = false;
            toast.success('Клиент успешно создан', {
                position: "bottom-center"
            })
        },
        [postClient.rejected.type] : (state) => {
            state.status = false;
            toast.error('Ошибка создания клиента', {
                position: 'bottom-center'
            })
        },

        [deleteClient.pending.type] : (state) => {
            state.status = true;
        },
        [deleteClient.fulfilled.type] : (state) => {
            toast.success('Клиент успешно удален', {
                position: "bottom-center"
            })
            state.status = false;
        },
        [deleteClient.rejected.type] : (state) => {
            toast.error('Ошибка, клиент не удален', {
                position: 'bottom-center'
            })
            state.status = false;
        },


        [patchClient.pending.type] : (state) => {
            state.status = true;
        },
        [patchClient.fulfilled.type] : (state, action: PayloadAction<IClient>) => {
            state.status = false;
            state.clients.map((item: IClient) => {
                if (item.id === action.payload.id) {
                    item.name = action.payload.name;
                    item.phone = action.payload.phone;
                }
            })
            state.client = sampleClient;
            toast.info('Клиент успешно обновлен', {
                position: "bottom-center"
            })
        },
        [patchClient.rejected.type] : (state) => {
            toast.error('Ошибка, клиент не обновлен', {
                position: 'bottom-center'
            })
            state.status = false;
        },



    }
})

export default clientSlice.reducer;
export const {removeItem, setClientValue, getItem, clearClient} = clientSlice.actions;