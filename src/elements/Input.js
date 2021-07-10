import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
    const {children, placeholder, type, _onChange, value, textarea } = props;
    if (textarea) {
        return (
        <React.Fragment>
            <Label>
                {children} 
            </Label>
            <Textarea rows="10" cols="50"
             value={value}
             onChange={_onChange}
             placeholder={placeholder}
             />
        </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Label>
                {children} 
            </Label>
            <RealInput
             type={type}
             placeholder={placeholder}
             onChange={_onChange}
             value={value}
             />
        </React.Fragment>
    );
};


Input.defaultProps = {
    placeholder: "내용을 입력하세요",
    type: "text",
    _onChange: () => {},
    value: "",
    textarea: false,
    // is_submit: false,
    // _onSubmit: () => {},
}

const Label = styled.label`
    font-size: 15px;
`;

const RealInput = styled.input`
    display: block;
    border: 2px solid darkgray;
    padding: 12px 4px;
    box-sizing: border-box;
    width: 100%;
`;

const Textarea = styled.textarea`
    margin-right: 10px; 
    border: 2px solid darkgray;
    padding: 12px;
    box-sizing: border-box;
    width: 100%;
    height: 80%;

`;

export default Input;