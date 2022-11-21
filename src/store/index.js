import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import {taskReducer} from "./tasks/reducer";
import {taskFormReducer} from "./taskForm/reducer";


const rootReducer = combineReducers({
  tasks: taskReducer,
  taskForm: taskFormReducer
});

const persistConfig = {
  key: "todo-list",
  storage,
  // whitelist: ["profile", "chats"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);