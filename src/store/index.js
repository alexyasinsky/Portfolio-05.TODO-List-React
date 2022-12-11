import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import {taskReducer} from "./tasks/reducer";
import {interfaceVarsReducer} from "./interfaceVars/reducer";
import {currentTaskReducer} from "./currentTask/reducer";


//настройки redux store

const rootReducer = combineReducers({
  tasks: taskReducer,
  currentTask: currentTaskReducer,
  interfaceVars: interfaceVarsReducer
});

const persistConfig = {
  key: "todo-list",
  storage,
  whitelist: ["tasks"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);