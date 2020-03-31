import { all, takeEvery } from "redux-saga/effects";
import { MapCasesActions } from "../actions/mapCases.actions";
import { getMapCasesSaga } from "./mapCases.saga";
import { MapPolygonsActions } from "../actions/mapPolygons.actions";
import { getMapPolygonsSaga } from "./mapPolygons.saga";

export function* watchMapCases() {
  yield all([takeEvery(MapCasesActions.GET_MAP_CASES, getMapCasesSaga)]);
}

export function* watchMapPolygons() {
  yield all([
    takeEvery(MapPolygonsActions.GET_MAP_POLYGONS, getMapPolygonsSaga)
  ]);
}
