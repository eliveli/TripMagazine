import React from 'react';
import styled from "styled-components";

const Grid = (props) => {
    const { curser, layout, children, padding, margin, border, width, height, display, alignit, justify, flexdir, textalign, bgcolor, _onClick } = props;
    const styles = {
        padding: padding,
        margin: margin,
        border: border,
        width: width,
        height: height,
        display: display,
        alignit: alignit,
        justify: justify,
        flexdir: flexdir,
        textalign: textalign,
        bgcolor: bgcolor,
        ...layout,
        curser: curser,
    }
    return (
        <React.Fragment>
            <GridBox {...styles} onClick={_onClick}>
                {children}
            </GridBox>
        </React.Fragment>
    );
};

Grid.defaultProps = {
    children: null,
    padding: false,
    margin: false,
    border: false,
    width: "100%",
    height: "",
    display: "block",
    alignit: false,
    justify: false,
    flexdir: false,
    textalign: false,
    bgcolor: false,
    _onClick: () => {},
    layout: null,
    curser: false,
}
const GridBox = styled.div`
    width: ${(props)=>props.width};
    box-sizing: border-box;
    ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) => (props.border ? `border: ${props.border};` : "")}
    ${(props) => (props.height? `height: ${props.height};` : "")}
    ${(props) => (props.display ? `display: ${props.display};` : "")}
    ${(props) => (props.alignit ? `align-items: ${props.alignit};` : "")}
    ${(props) => (props.justify ? `justify-content: ${props.justify};` : "")}
    ${(props) => (props.flexdir ? `flex-direction: ${props.flexdir};` : "")}
    ${(props) => (props.textalign ? `text-align: ${props.textalign};` : "")}
    ${(props) => (props.bgcolor ? `background-color: ${props.bgcolor};` : "")}
    ${(props) => (props.curser ? `cursor: pointer;` : "")}
`;

export default Grid;