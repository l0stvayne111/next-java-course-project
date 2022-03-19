import { IModal } from "../types/IModal"
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type IModalState = {
    modals: Array<IModal>
}

const initialState:IModalState = {
    modals: [
        {id: 'modalClient', isOpen: false},
        {id: 'modalStaff', isOpen: false},
        {id: 'modalBicycles', isOpen: false},
        {id: 'modalType', isOpen: false},
        {id: 'modalRent', isOpen: false}
    ]
}

export const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openModal(state, action:PayloadAction<string>){
            state.modals.map((modal:IModal) => {
                if(modal.id === action.payload){
                    modal.isOpen = true;
                }
            })
        },
        closeModal(state, action:PayloadAction<string>){
            state.modals.map((modal:IModal) => {
                if(modal.id === action.payload){
                    modal.isOpen = false;
                }
            })
        },
    }
})

export default modalSlice.reducer;
export const {openModal, closeModal} = modalSlice.actions;