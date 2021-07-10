import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import { auth } from "../../shared/firebase";
import firebase from "firebase/app";

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
// const GET_USER = "GET_USER";


const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
// const getUser = createAction(GET_USER, (user) => ({ user }));

const initialState = {
    user: null,
    is_login: false,
  };


const signupFB = (id, pw, user_name) => {
    return function (dispatch, getState, { history }) {
        auth
        .createUserWithEmailAndPassword(id, pw)
        .then((user) => {
            console.log(user);

            auth.currentUser
            .updateProfile({
                displayName: user_name,
            })
            .then(() => {
                dispatch(
                setUser({
                    user_name: user_name,
                    id: id,
                    user_profile: "",
                    uid: user.user.uid,
                })
                );
                alert("환영합니다😀")
                history.push("/");
            })
            .catch((error) => {
                console.log(error);
            });

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode, errorMessage);
        });
    };
};

const loginFB = (id, pw) => {
    return function (dispatch, getState, { history }) {
      auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
        auth
          .signInWithEmailAndPassword(id, pw)
          .then((user) => {
            console.log(user);
  
            dispatch(
              setUser({
                user_name: user.user.displayName,
                id: id,
                user_profile: "",
                uid: user.user.uid,
              })
            );
            alert("어서오세요😄")
            history.push("/");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
  
            console.log(errorCode, errorMessage);
          });
      });

      console.log(getState,"user정보loginFB");

    };
};
 

const loginCheckFB = () => {
  return function (dispatch, getState, {history}){
    auth.onAuthStateChanged((user) => {
      if(user){
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: "",
            id: user.email,
            uid: user.uid,
          })
        );
      }else{
        dispatch(logOut());
      }
    })
  }
}

const logoutFB = () => {
  return function (dispatch, getState, {history}) {
    auth.signOut().then(() => {
      dispatch(logOut());
      alert("로그아웃 완료😙");
      history.replace('/');
    })
  }
}


export default handleActions(
    {
      [SET_USER]: (state, action) =>
        produce(state, (draft) => {
         setCookie("is_login", "success");
          draft.user = action.payload.user;
          draft.is_login = true;

          console.log(draft,"setUserReducer");
        }),
      [LOG_OUT]: (state, action) =>
        produce(state, (draft) => {
          deleteCookie("is_login");
          draft.user = null;
          draft.is_login = false;
        }),
    //   [GET_USER]: (state, action) => produce(state, (draft) => {}),
    },
    initialState
  );
  

  const actionCreators = {
    logOut,
    // getUser,
    signupFB,
    loginFB,
    loginCheckFB,
    logoutFB,
  };
  
  export { actionCreators };
  
