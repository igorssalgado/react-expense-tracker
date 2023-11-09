import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { expenseSlice } from "./expense/expense-slice";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import { loggerMiddleware } from "middlewares/logger-middleware";


const rootReducer = combineReducers({
    EXPENSE: expenseSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['EXPENSE']
}

const persistReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).prepend(loggerMiddleware.middleware),
});

const persistor = persistStore(store);

export { store, persistor }