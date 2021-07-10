import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
    const { children, _onClick, is_header, margin, padding, width,  } = props;

    const styles = {
        margin: margin,
        padding: padding,
        width: width,
    }

    if (is_header){
        return (
            <HeaderBtn onClick={_onClick} {...styles}>
                {children}
            </HeaderBtn>
        );
    }

    return (
        <SmallBtn onClick={_onClick} {...styles}>
            {children}
        </SmallBtn>
    );
};

Button.defaultProps = {
    children : null,
    _onClick : () => {},
    is_header: false,
    margin: false,
    padding: "12px 0px",
    width: "100%",
    like_true: false
}


const HeaderBtn = styled.button`
  width: ${(props)=> (props.width)};
  padding: ${(props)=> (props.padding)};
  margin: ${(props)=> (props.margin)};
  height: 40px;
  background-color: "black";
  border: "1px solid darkgray";
  color: "black";
  font-weight: bold;
  text-align: center;
  cursor: pointer;

`

const SmallBtn = styled.button`
  width: ${(props)=> (props.width)};
  padding: ${(props)=> (props.padding)};
  margin: ${(props)=> (props.margin)};
  height: 40px;
  background-color: "black";
  border: 0;
  color: "white";
  font-weight: bold;
  text-align: center;
  cursor: pointer;

`

export default Button;