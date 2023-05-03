import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware, { Task } from "@redux-saga/core";
import rootSaga from "../sagas";
import { Store } from "redux";
import rootReducer from "../reducers";
interface SagaStore extends Store {
  sagaTask?: Task;
}
const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const store: SagaStore = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: process.env.NODE_ENV === "development",
  });
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(createStore, {
  debug: process.env.NODE_ENV === "development",
});
const store = createStore();
export type RootState = ReturnType<typeof store.getState>;

export default wrapper;
