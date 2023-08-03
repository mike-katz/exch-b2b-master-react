import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { LOGIN_START, loginEnd } from "../actions/persistAction";
import { getLogin } from "../services/persist";
import { showToastMessage } from "../../utils/helper";

function* loginSaga(data) {
  try {
    const result = yield call(getLogin, data?.payload);

    if (result?.accessToken) {
      if (!result?.roles?.includes("User")) {
        yield put(loginEnd(result));
        data?.successCallback();
      } else {
        showToastMessage("You not have an user access", 500);
      }
    }
  } catch (error) {
    data?.callback();
  } finally {
    data?.callback();
  }
}

function* watchThemeColorSaga() {
  yield takeEvery(LOGIN_START, loginSaga);
}

export default function* rootSaga() {
  yield all([fork(watchThemeColorSaga)]);
}
