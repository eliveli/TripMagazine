import React from "react";

import {Button} from "../elements";
import {storage} from "./firebase";

import {useDispatch, useSelector} from "react-redux";
import {actionCreators as imageActions} from "../redux/modules/image";
import styled from "styled-components";

const Upload = (props) => {
    const dispatch = useDispatch();
    const is_uploading = useSelector(state => state.image.uploading);
    const fileInput = React.useRef();

    const selectFile = (e) => {
        console.log(e);
        console.log(e.target);
        console.log(e.target.files[0]);

        console.log(fileInput.current.files[0]);

        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            console.log(reader.result);
            dispatch(imageActions.setPreview(reader.result));
        }
 
    }

    // const uploadFB = () => {
    //     let image = fileInput.current.files[0];
    //     if(!image){
    //         alert("이미지를 선택해 주세요😀");
    //         return;
    //     }
    //     dispatch(imageActions.uploadImageFB(image));
    // }

    return (
        <React.Fragment>
            <Input id="file" type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading}/>
            {/* <Button _onClick={uploadFB}>이미지 올리기</Button> */}
        </React.Fragment>
    )
}

// const Label = styled.label`
// display: inline;
// padding: .5em .75em;
// color: black;
// font-size: inherit; 
// line-height: normal; 
// vertical-align: middle; 
// background-color: #fdfdfd;
// cursor: pointer;
// border: 1px solid darkgray; 
// border-radius: .25em;

// `

const Input = styled.input`

padding: 10px;
 `


export default Upload;