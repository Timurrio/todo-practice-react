// store/todoSagas.ts
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as api from '../../api/todoApi';
import {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  createTodoRequest,
  createTodoSuccess,
  createTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
  clearCompletedTodosSuccess,
  clearCompletedTodosFailure,
  toggleAllTodosSuccess,
  toggleAllTodosFailure,
  clearCompletedTodosRequest,
  toggleAllTodosRequest,
} from './todoSlice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '../../types/todo';

function* fetchTodosSaga(action: PayloadAction<string>) {
  try {
    const todos: Todo[] = yield call(api.getTodos, action.payload);
    yield put(fetchTodosSuccess(todos));
  } catch (err: any) {
    yield put(fetchTodosFailure(err.message));
  }
}

function* createTodoSaga(action: PayloadAction<Omit<Todo, 'id'>>) {
  try {
    const newTodo: Todo = yield call(api.createTodo, action.payload);

    yield put(createTodoSuccess(newTodo));
  } catch (err: any) {
    yield put(createTodoFailure(err.message));
  }
}

function* updateTodoSaga(action: PayloadAction<Todo>) {
  try {
    const updated: Todo = yield call(api.updateTodo, action.payload);
    yield put(updateTodoSuccess(updated));
  } catch (err: any) {
    yield put(updateTodoFailure(err.message));
  }
}

function* deleteTodoSaga(action: PayloadAction<string>) {
  try {
    yield call(api.deleteTodo, action.payload);
    yield put(deleteTodoSuccess(action.payload));
  } catch (err: any) {
    yield put(deleteTodoFailure(err.message));
  }
}

function* clearCompletedTodosSaga(action: PayloadAction<Todo[]>) {
  try {
    const ids: string[] = yield call(api.clearCompletedTodos, action.payload);
    yield put(clearCompletedTodosSuccess(ids));
  } catch (error: any) {
    yield put(clearCompletedTodosFailure(error.message));
  }
}

function* toggleAllTodosSaga(action: PayloadAction<Todo[]>) {
  try {
    const updatedTodos: Todo[] = yield call(api.toggleAllTodos, action.payload);
    yield put(toggleAllTodosSuccess(updatedTodos));
  } catch (error: any) {
    yield put(toggleAllTodosFailure(error.message));
  }
}

export default function* todoSagas() {
  yield takeLatest(fetchTodosRequest.type, fetchTodosSaga);
  yield takeEvery(createTodoRequest.type, createTodoSaga);
  yield takeLatest(updateTodoRequest.type, updateTodoSaga);
  yield takeLatest(deleteTodoRequest.type, deleteTodoSaga);
  yield takeEvery(clearCompletedTodosRequest.type, clearCompletedTodosSaga);
  yield takeLatest(toggleAllTodosRequest.type, toggleAllTodosSaga);
}
