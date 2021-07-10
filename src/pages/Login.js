import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {Button, Grid, Input, Text} from "../elements";
import { actionCreators } from '../redux/modules/user';
import { emailCheck } from '../shared/emailCheck';

const { loginFB } = actionCreators;

const Login = () => {
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const login = () => {
        if (id === "" || pw === "" ) {
            alert("빠트린 항목이 있어요.");
            return;
        }
        if (!emailCheck(id)) {
            alert("이메일 형식을 확인해 주세요.")
            return;
        }

        dispatch(loginFB(id,pw));
    }
 
    return (
        <React.Fragment>
            <Grid display="flex" flexdir="column">
                <Grid padding="0 15px">
                    <Text fontsize="30px" fontweight="bold">로그인</Text>
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
                    <Input placeholder="비밀번호를 입력해 주세요."
                    _onChange={(e)=>{
                        setPw(e.target.value);
                    }}
                    value={pw}>비밀번호
                    </Input>
                </Grid>
                <Grid padding="10px" display="flex" flexdir="column">
                    <Button _onClick={login}>로그인</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Login;