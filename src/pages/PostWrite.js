import React, {useState} from 'react';
import {Button, Grid, Image, Input, Text} from "../elements";

import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
    console.log(props, "props_postwrite")

    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview);
    const post_list = useSelector((state) => state.post.list);

    const post_id = props.match.params.id;
    console.log(post_id,"matchParamsId");

    const is_edit = post_id ? true : false;
  
    const { history } = props;
  
    let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;
  
    const [contents, setContents] = useState(_post ? _post.contents : "");
  
    //버튼 클릭으로 레이아웃 설정하기
    const [layout, setLayout] = useState({display:"flex", flexdir:"row"});

    React.useEffect(() => {
      if (is_edit && !_post) {
        console.log("포스트 정보가 없어요!");
        history.goBack();
   
        return;
      }
  
      if (is_edit) {
        dispatch(imageActions.setPreview(_post.image_url));
      }
    }, []);
  
    const changeContents = (e) => {
      setContents(e.target.value);
    };
  
    const addPost = () => {
      console.log(preview,"preview");
      if (preview===null || contents===""){
        alert("이미지와 내용 모두 넣어주세요😀")
        return;
      }
      dispatch(postActions.addPostFB({contents: contents, layout: layout}));
    };
  
    const editPost = () => {
      if (preview===null || contents===""){
        alert("이미지와 내용 모두 넣어주세요😀")
        return;
    }
      dispatch(postActions.editPostFB(post_id, {contents: contents, layout: layout}));
    }


    if (!is_login) {
      return (
        <Grid margin="100px 0px" padding="16px" textalign="center">
          <Text fontsize="32px" fontweight="bold">
            앗! 잠깐!
          </Text>
          <Text fontsize="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
          <Button
            _onClick={() => {
              history.replace("/login");
            }}
          >
            로그인 하러가기
          </Button>
        </Grid>
      );
    }
  
    return (
      <React.Fragment>
        <Grid padding="2px 16px 0">
          <Text margin="10px 0" textalign="left" fontsize="30px" fontweight="bold">
            {is_edit ? "수정하기" : "작성하기"}
          </Text>
        </Grid>
        <Grid display="flex" padding="0 16px">
          <Grid width="70%">
            <Upload />
          </Grid>
          <Grid width="50%" display="flex" flexdir="row" justify="space-between" alignit="center">
            <Text margin="0 5px" textalign="center">IMG LAYOUT</Text>
            <Button margin="0 5px" _onClick={()=>setLayout({display:"flex", flexdir:"row"})}>오른쪽</Button>
            <Button margin="0 5px" _onClick={()=>setLayout({display:"flex", flexdir:"row-reverse"})}>왼쪽</Button>
            <Button margin="0 5px" _onClick={()=>setLayout({display:"flex", flexdir:"column"})}>아래</Button>
          </Grid>
        </Grid>
        <Grid layout={layout}>
          <Grid padding="16px">
            <Input
              value={contents}
              _onChange={changeContents}
              placeholder="내용을 입력하세요."
              textarea height="200px">
              <Text fontsize="25px" fontweight="bold">
                  내용
              </Text>
            </Input>
          </Grid>

          <Grid>
            <Grid padding="16px">
              <Text fontsize="25px" fontweight="bold">
                미리보기
              </Text>
    
              <Image
                post_img
                src={preview ? preview : "http://via.placeholder.com/400x300"}
              />
            </Grid>
          </Grid>
        </Grid>

  
        <Grid padding="16px">
          {is_edit ? (
            <Button _onClick={editPost}>수정 완료</Button>
          ) : (
            <Button _onClick={addPost}>작성 완료</Button>
          )}
        </Grid>

      </React.Fragment>
    );
  };
  
  export default PostWrite;  