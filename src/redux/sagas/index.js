import { all, takeEvery } from "redux-saga/effects";
import { MapCasesActions } from "../actions/mapCases.actions";
import { getMapCasesSaga } from "./mapCases.saga";

export function* watchMapCases() {
  yield all([takeEvery(MapCasesActions.GET_MAP_CASES, getMapCasesSaga)]);
}
