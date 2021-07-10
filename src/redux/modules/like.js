import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, realtime } from "../../shared/firebase";
import "moment";
import moment from "moment";

import firebase from "firebase/app";

import { actionCreators as postActions } from "./post";



//얘들은 안 씀.

const SELECT_LIKE = "SELECT_LIKE";
const CANCLE_LIKE = "CANCLE_LIKE";

const LOADING = "LOADING";

const selectLike = createAction(SELECT_LIKE, (post_id) => ({
  post_id,
}));
const cancleLike = createAction(CANCLE_LIKE, (post_id) => ({
  post_id,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  is_loading: false,
};

const selectLikeFB = (post_id) => {
  return function (dispatch, getState, { history }) {
      console.log("selectLikeFB");
      dispatch(loading(true));

      const postDB = firestore.collection("post");
      const post = getState().post.list.find((l) => l.id === post_id);
      const increment = firebase.firestore.FieldValue.increment(1);
      postDB
        .doc(post_id)
        .update({ like: increment })
        .then((_post) => {
            dispatch(
              postActions.editPost(post_id, {
                like: parseInt(post.like) + 1,
              })
        ); 
            }
        )
        .catch((err) => {
            console.log(err,"error_selectLikeFB");
          });
    }};

    const cancleLikeFB = (post_id) => {
        return function (dispatch, getState, { history }) {
          console.log("cancleLikeFB");
          dispatch(loading(true));

            const postDB = firestore.collection("post");
            const post = getState().post.list.find((l) => l.id === post_id);
            const decrement = firebase.firestore.FieldValue.increment(-1);
            postDB
              .doc(post_id)
              .update({ like: decrement })
              .then(() => 
                  dispatch(
                    postActions.editPost(post_id, {
                      like: parseInt(post.like) - 1,
                    })
              ))
              .catch((err) => {
                  console.log(err,"error_cancleLikeFB");
                });
          }};    

export default handleActions(
  {
    [SELECT_LIKE]: (state, action) =>  produce(state, (draft) => {}),
    [CANCLE_LIKE]: (state, action) => produce(state, (draft) => {}),
    [LOADING]: (state, action) =>
        produce(state, (draft) => {
         draft.is_loading = action.payload.is_loading;
    }),
  },
  initialState
);

const actionCreators = {
    selectLikeFB,
    cancleLikeFB,
};

export { actionCreators };
