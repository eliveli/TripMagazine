import React from 'react';
import {history} from "../redux/configStore";
import { Grid } from '../elements';
import Post from '../components/Post';

import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = () => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);
  
  React.useEffect(() => {
      if(post_list.length < 2){
           dispatch(postActions.getPostFB());
      }
     
  }, []);
  const is_login = useSelector((state) => state.user.is_login);
  console.log(is_login);

    return (
      <React.Fragment>
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.getPostFB(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {post_list.map((p, idx) => {
            if (p.user_info.user_id === user_info?.uid) {
            return (
                <Grid
                bg="#ffffff"
                margin="30px 0px"
                key={p.id}
                >
                <Post key={p.id} {...p} is_me />
                </Grid>
            );
            } else {
                return (
                  <Grid
                    key={p.id}
                    bg="#ffffff"
                    margin="30px 0px"

                  >
                    <Post {...p} />
                  </Grid>
                );
              }
            })}
          </InfinityScroll>
        </React.Fragment>
    );
};

export default PostList;