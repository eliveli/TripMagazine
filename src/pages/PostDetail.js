import React from "react";
import Post from "../components/Post";
import { Grid } from "../elements";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((store) => store.post.list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];

  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getOnePostFB(id));
  }, []);

  return (
    <React.Fragment>
      <Grid padding="30px 0 0 0">
      {post && (
        <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
      )}

      {/* <CommentList post_id={id} /> */}
      </Grid>
    </React.Fragment>
  );
};

export default PostDetail;
