import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { AuthSlice, DashBoardSlice, QuotationSlice, UserSlice,CategorySlice,ServiceSlice, CommonSlice, NotificationSlice} from "./Slices/";

const persistConfig = {
    key: "root",
    storage,
};
const rootReducer = combineReducers({
    Authentication: persistReducer(persistConfig, AuthSlice),
    DashBoard : DashBoardSlice,
    User : UserSlice,
    Quotation  : QuotationSlice,
    Category: CategorySlice,
    Service : ServiceSlice,
    Common : CommonSlice,
    Notification : NotificationSlice

});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistedStore = persistStore(store);

export { store, persistedStore };