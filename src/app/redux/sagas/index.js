import { all } from "redux-saga/effects";
import persistSaga from "./persistSaga";

export default function* rootSaga() {
  yield all([persistSaga()]);
}
