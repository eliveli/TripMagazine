import React from 'react';
import { history } from "../redux/configStore";
import { Grid, Button, Image, Text } from '../elements';
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from '../redux/modules/user';

const Header = () => {

    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);

    const signup = () => {
        history.push("/signup");
    }
    const login = () => {
        history.push("/login");
    }
    const home = () => {
        history.push("/");
        console.log("home_click")
    }
    const logout = () => {
        const logout_confirm = window.confirm("정말 로그아웃 하시나요?😉")
        if (logout_confirm) {
            dispatch(actionCreators.logoutFB());
        }
        return;
    }

    if (!is_login)
        return (
        <Grid padding="0 15px" display="flex" alignit="center" justify="space-between">
            <Grid display="flex" alignit="center">
                <Image padding="25px" home_img  _onClick={home} />
                <Text color="black" fontsize="30px" _onClick={home}>ENJOY<br />YOUR LIFE🏄‍♂️</Text>
            </Grid>
            <Grid display="flex" width="50%">
                <Button margin="0 13px 0 0" _onClick={signup} >회원가입</Button>
                <Button _onClick={login}>로그인</Button>
            </Grid>
        </Grid>
    )

    return (
        <Grid padding="0 15px" display="flex" alignit="center" justify="space-between">
            <Grid display="flex" alignit="center">
                <Image padding="25px" home_img  _onClick={home} />
                <Text color="black" fontsize="30px" _onClick={home}>ENJOY<br />YOUR LIFE🏄‍♂️</Text>
            </Grid>
            <Grid display="flex" width="50%">
                <Button margin="0 13px 0 0" _onClick={()=>alert("언젠가는..할지도😉")} >마이페이지</Button>
                <Button _onClick={logout}>로그아웃</Button>
            </Grid>
        </Grid>
    )
};

export default Header;