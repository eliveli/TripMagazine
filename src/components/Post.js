import React, { useState } from 'react';
import {Button, Grid, Image, Input, Text} from "../elements";
import {history} from "../redux/configStore";

import {useDispatch, useSelector} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";
// import {actionCreators as likeActions} from "../redux/modules/like";

import styled from 'styled-components';
import heart_gray from "../image/heart_gray.png";
import heart_red from "../image/heart_red.png";



const Post = (props) => {
  const is_login = useSelector((state) => state.user.is_login);

  const { id, user_info, image_url, contents, insert_dt, is_me, layout, like_cnt, is_like } = props;
  
  const dispatch = useDispatch();

  const goEdit = (e) => {
    console.log(id,"id_postLIst");
    history.push(`/write/${id}`);
    console.log(props,"afterGoEdit");
  }
  const deletePost = () => {
    const confirm_del = window.confirm("정말 삭제하시나요?😉");
    if (confirm_del) {
      dispatch(postActions.deletePostFB(id));
    }
  }
  const goDetail = () => {
    history.push(`/post/${id}`);
  }

  const click_like = () => {
      console.log(like_cnt,":beforeCNT",is_like,":isLike");
      dispatch(postActions.toggleLikeFB(id));
      console.log(like_cnt,":afterCNT",is_like,":isLike");
    }

    return (
          <Grid padding="10px 0 10px 0" bgcolor="white">
            <Grid display="flex" padding="16px" justify="space-between">
              <Grid display="flex" width="auto">
                <Image src={user_info.user_profile} />
                <Text fontweight="bold" margin="auto 10px">{user_info.user_name}</Text>
              </Grid>
              <Grid display="flex" width="auto">
                <Text>{insert_dt}</Text>
                {is_me && (
                  <React.Fragment>
                    <Button width="auto" margin="4px 4px 4px 15px" padding="10px" 
                    _onClick={goEdit} >수정
                    </Button>

                    <Button width="auto" margin="4px 0 4px 8px" padding="10px"
                     _onClick={deletePost} > 삭제
                    </Button>
                  </React.Fragment>
                )}
              </Grid>
            </Grid>

            <Grid layout={layout} _onClick={goDetail} padding="16px">
              <Grid>
                <Text>{contents}</Text>
              </Grid>              
              <Grid>
                <Image post_img src={image_url} />
              </Grid>
            </Grid>

            {is_login?(
            <Grid display="flex" alignit="center" justify="space-between" padding="5px 20px 0">
              <Text>좋아요 {like_cnt}개</Text>
              <LikeBtn onClick={click_like} is_like={is_like} />
            </Grid>
            ):(
            <Grid display="flex" alignit="center" justify="space-between" padding="5px 20px 0">
              <Text>좋아요 {like_cnt}개</Text>
              <LikeBtn onClick={()=>{alert("좋아요는 로그인하고 나서🥰")}} is_like={is_like} />
            </Grid>
            )}

          </Grid>
      );
    };


const LikeBtn = styled.div`
background-image: url(${(props)=>props.is_like? heart_red : heart_gray });
background-repeat: no-repeat;
background-size: contain;

width: 80px;
height: 80px;

cursor: pointer;
&:hover{

}

`
Post.defaultProps = {
      user_info: {
        user_name: "mean0",
        user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
      },
      image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
      contents: "고양이네요!",
      insert_dt: "2021-02-27 10:00:00",
      is_me: false,
      layout: {display:"flex", flexdir:"column"},
      like_cnt: 0,
      is_like: false,
    };

export default Post;