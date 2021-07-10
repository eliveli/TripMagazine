import styled from 'styled-components';
import React from "react";
import cat_img from "../image/cool_cat.png";
import profile_Img from "../image/profile_Img.png";


const Image = (props) => {
    const {home_img, post_img, src, size, _onClick, padding} = props;

    const styles = {
        src: src,
        size: size,
        padding: padding,
    }

    if(post_img){
        return (
            // <AspectOutter>
                <PostImg {...styles} />
            // </AspectOutter>
        )
    }

    if(home_img){
        return (
            <HomeImg {...styles} onClick={_onClick}/>
        )
    }

    return (
        <ProfileImg {...styles} />
    )
}

Image.defaultProps = {
    home_img: false,
    post_img: false,
    src: "",
    size: 50,
    _onClick: () => {},
    padding: "",
};

// 굳이 필요한가?
// const AspectOutter = styled.div`
//     width: 100%;
//     min-width: 250px;
// `;

const PostImg = styled.div`
    /* position: relative;  이 설정이 필요한가?*/
    margin-right: 10px; 
    padding: 12px;
    box-sizing: border-box;
    width: 100%;
    height: 80%;
    padding-top: 75%;
    overflow: hidden;
    background-image: url(${(props) => props.src});
    background-size: cover;
    ${(props) => (props.padding ? `padding: ${props.padding};` : "")}

`;

const ProfileImg = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url(${(props) => props.src===""? profile_Img : props.src});
    background-size: cover;
    margin: 4px;
    ${(props) => (props.padding ? `padding: ${props.padding};` : "")}


`;
const HomeImg = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);

    background-image: url(${(props) => props.src===""? cat_img : props.src});
    background-size: cover;
    margin: 4px;
    ${(props) => (props.padding ? `padding: ${props.padding};` : "")}

    cursor: pointer;

`;

export default Image;