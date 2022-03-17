import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import modalsReducer from './reducers/ModalSlice';
import clientReducer from './reducers/ClientSlice';
import staffReducer from './reducers/StaffSlice';
import bicyclesReducer from './reducers/BicyclesSlice';

const rootReducer = combineReducers({
    modalsReducer,
    clientReducer,
    staffReducer,
    bicyclesReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: false,
        }),
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];