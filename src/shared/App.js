import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import {history} from "../redux/configStore";
import { useDispatch } from "react-redux";
import { apiKey } from "./firebase";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";

import {PostList, Login, Signup, PostWrite, PostDetail} from "../pages";
import { Grid, Button } from "../elements";
import Header from "./Header";
import Permit from "./Permit";
import pencil_img from "../image/yellow_pencil2.png";


function App() {
  const dispatch = useDispatch();
  
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Header></Header>
      <Grid padding="0 0 0 0" bgcolor="#e3fdff">
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/write" exact component={PostWrite} />
          <Route path="/write/:id" exact component={PostWrite} />
          <Route path="/post/:id" exact component={PostDetail} />
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Add
            onClick={() => {
              history.push("/write");
            }}
          />
      </Permit>
    </React.Fragment>
  );
}

const Add = styled.div`
position: fixed;
z-index: 2;

bottom: 40px;
right: 40px;

background-image: url(${pencil_img});
background-repeat: no-repeat;
background-size: contain;

width: 80px;
height: 80px;

cursor: pointer;
`

export default App;
