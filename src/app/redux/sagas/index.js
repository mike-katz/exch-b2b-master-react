import { all } from "redux-saga/effects";
import persistSaga from "./persistSaga";
import themeColor from "./themeColor";

export default function* rootSaga() {
  yield all([themeColor(), persistSaga()]);
}
