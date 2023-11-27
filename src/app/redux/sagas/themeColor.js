import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { getThemeColorData } from "../services/themeColor";
import {
  GET_THEME_COLOR_REQUEST,
  GET_THEME_COLOR_RESPONSE,
} from "../actions/themeColor";

function* getThemeColor(data) {
  const result = yield call(getThemeColorData, data);
  if (result) {
    yield put({
      type: GET_THEME_COLOR_RESPONSE,
      data: result,
    });
  }
}

function* watchThemeColorSaga() {
  yield takeEvery(GET_THEME_COLOR_REQUEST, getThemeColor);
}

export default function* rootSaga() {
  yield all([fork(watchThemeColorSaga)]);
}
