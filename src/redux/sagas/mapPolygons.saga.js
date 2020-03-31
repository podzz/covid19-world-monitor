import { put } from "redux-saga/effects";
import {
  getMapPolygonsFailure,
  getMapPolygonsSuccess
} from "../actions/mapPolygons.actions";

export function* getMapPolygonsSaga() {
  try {
    const response = yield fetch("https://coronadatascraper.com/features.json");
    const data = yield response.json();

    yield put(getMapPolygonsSuccess(data));
  } catch (error) {
    yield put(getMapPolygonsFailure(error.message));
  }
}
