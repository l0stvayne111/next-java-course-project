import {IStaff} from "../types/IStaff";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {deleteStaff, fetchStaff, patchStaff, postStaff} from "../actions/StaffAction";
import {toast} from "react-toastify";



type IStaffSlice = {
    staffs: Array<IStaff>,
    staff: IStaff,
    status: boolean
}

const sampleStaff: IStaff = {
    id: 0,
    name: '',
    phone: ''
}

const initialState: IStaffSlice = {
    staffs: [],
    staff: {
        id: 0,
        name: '',
        phone: ''
    },
    status: false
}

export const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        removeStaff(state, action: PayloadAction<number>) {
          let clone: Array<IStaff> = JSON.parse(JSON.stringify(state.staffs));
          state.staffs = clone.filter((item: IStaff) => item.id !== action.payload);
        },

        setStaffValue(state, action:PayloadAction<{ value: string, name: string }>){
            // @ts-ignore
            state.staff[action.payload.name] = action.payload.value;
        },
        getStaff (state, action: PayloadAction<IStaff>) {
            state.staffs.map((item: IStaff) => {
                if (item.id === action.payload.id) {
                    state.staff = item;
                }
            })
        },
        clearStaff (state) {
            state.staff = sampleStaff;
        }
    },
    extraReducers: {
        [fetchStaff.pending.type]: (state) => {
            state.status = true;
        },
        [fetchStaff.fulfilled.type] : (state, action: PayloadAction<Array<IStaff>>) => {
            state.staffs = action.payload;
            state.status = false;
        },
        [fetchStaff.rejected.type] : (state) => {
            toast.error('Ошибка загрузки сотрудников', {
                position: 'bottom-center'
            })
            state.status = false;
        },

        [postStaff.pending.type]: (state) => {
            state.status = true;
        },
        [postStaff.fulfilled.type]: (state, action: PayloadAction<IStaff>) => {
            state.staffs.push(action.payload);
            state.staff = sampleStaff;
            state.status = false;

            toast.success('Клиент успешно создан', {
                position: "bottom-center"
            })
        },
        [postStaff.rejected.type] : (state) => {
            state.status = false;
            toast.error('Ошибка создания клиента', {
                position: 'bottom-center'
            })
        },

        [deleteStaff.pending.type] : (state) => {
            state.status = true;
        },
        [deleteStaff.fulfilled.type] : (state) => {
            toast.success('Клиент успешно удален', {
                position: "bottom-center"
            })
            state.status = false;
        },
        [deleteStaff.rejected.type] : (state) => {
            state.status = false;
            toast.error('Ошибка, клиент не удален', {
                position: 'bottom-center'
            })
        },


        [patchStaff.pending.type] : (state) => {
            state.status = true;
        },
        [patchStaff.fulfilled.type] : (state, action: PayloadAction<IStaff>) => {
            state.status = false;
            state.staffs.map((item: IStaff) => {
                if (item.id === action.payload.id) {
                    item.name = action.payload.name;
                    item.phone = action.payload.phone;
                }
            })
            state.staff = sampleStaff;
            toast.info('Клиент успешно обновлен', {
                position: "bottom-center"
            })
        },
        [patchStaff.rejected.type] : (state) => {
            state.status = false;
            toast.error('Ошибка, клиент не обновлен', {
                position: 'bottom-center'
            })
        },

    }
})

export default staffSlice.reducer;
export const {removeStaff, setStaffValue, getStaff, clearStaff} = staffSlice.actions