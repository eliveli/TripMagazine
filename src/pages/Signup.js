import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {Button, Grid, Input, Text} from "../elements";
import { actionCreators } from '../redux/modules/user';
import { emailCheck } from '../shared/emailCheck';

const { signupFB } = actionCreators;
 
const Signup = (props) => {
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [userName, setUserName] = useState("");
    const [pw, setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");

    const signup = () => {
        if (id === "" || userName === "" || pw === "" || pwCheck === "" ) {
            alert("빠트린 항목이 있어요.");
            return;
        }
        if (!emailCheck(id)) {
            alert("이메일 형식을 확인해 주세요.")
            return;
        }
        if (pw !== pwCheck) {
            alert("입력한 비밀번호가 서로 달라요.")
            return;
        }
        dispatch(signupFB(id,pw,userName));
    }
 
    return (
        <React.Fragment>
            <Grid display="flex" flexdir="column">
                <Grid padding="0 15px">
                    <Text fontsize="30px" fontweight="bold">회원가입</Text>
                </Grid>
                <Grid padding="0 10px 10px 10px">
                    <Input placeholder="아이디를 입력해 주세요."
                    _onChange={(e)=>{
                        setId(e.target.value);
                    }}
                    value={id}>아이디(email)
                    </Input>
                </Grid>
                <Grid padding="10px">
                    <Input placeholder="닉네임을 입력해 주세요."
                    _onChange={(e)=>{
                        setUserName(e.target.value);
                    }}
                    value={userName}>닉네임
                    </Input>
                </Grid>
                <Grid padding="10px">
                    <Input placeholder="비밀번호를 입력해 주세요."
                    _onChange={(e)=>{
                        setPw(e.target.value);
                    }}
                    value={pw}>비밀번호
                    </Input>
                </Grid>
                <Grid padding="10px">
                    <Input placeholder="비밀번호를 다시 입력해 주세요."
                    _onChange={(e)=>{
                        setPwCheck(e.target.value);
                    }}
                    value={pwCheck}>비밀번호 확인
                    </Input>
                </Grid>
                <Grid padding="10px" display="flex" flexdir="column">
                    <Button _onClick={signup}>가입하기</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Signup;