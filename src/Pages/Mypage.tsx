import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getTeamImage,
  getUserInfo,
  ITeamImage,
  loadUser,
  User,
  UserInfo,
} from "../api";
import { useSetRecoilState } from "recoil";
import { isLoginAtom } from "../atom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
`;

const Container = styled.div`
  flex: 1 0 auto;
  /* display: grid; */
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  justify-items: center;
  margin-bottom: 20px;
`;

const MainContainer = styled(Container)`
  min-height: 0;
  column-gap: 160px;
  padding-top: 60px;
  width: 100%;
`;

const MyName = styled.span`
  font-size: 30px;
  margin-right: 30px;
`;

const MyInfo = styled.span`
  font-size: 20px;
  margin-top: 10px;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 52px;
  width: 320px;
  background-color: #10a37f;
  color: #fff;
  margin: 24px 0 0;
  border-radius: 6px;
  padding: 4px 16px;
  font: inherit;
  border-width: 0;
  cursor: pointer;
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 20px;
`;

const LogImg = styled.img`
  width: 100px;
  height: 100px;
`;

function MyPage() {
  const navigate = useNavigate();
  const { isLoading: LoadingUser, data: User } = useQuery<User>(
    "user",
    loadUser
  );

  const { isLoading: LoadingUserInfo, data: UserInfo } = useQuery<UserInfo>(
    "userinfo",
    getUserInfo
  );

  const setLogin = useSetRecoilState(isLoginAtom);
  const toggleLoginAtom = () => {
    setLogin((current: boolean) => !current);
  };

  const handleLogout = async () => {
    await fetch(`http://localhost:8080/logout`, {
      method: "POST",
      credentials: "include",
    });
    toggleLoginAtom();
    navigate("/");
  };

  const gotoUserInfo = () => {
    navigate("/login/nickname");
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8080/mypage`, {
        method: "GET",
        credentials: "include",
      });
      const json = await response.json();
      console.log(json);

      if (json) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    })();
  }, []);

  return (
    <Wrapper>
      <MainContainer>
        {LoadingUser && LoadingUserInfo ? (
          <Container>Loading...</Container>
        ) : (
          <MainContainer>
            {Array.isArray(User) ? (
              User.map((user) => (
                <Container key={user.id}>
                  <MyName>{user.name}'s Mypage</MyName>
                  <MyInfo>Email: {user.email}</MyInfo>
                </Container>
              ))
            ) : (
              <Container>
                <MyName>{User?.name}'s Mypage</MyName>
                <MyInfo>Email: {User?.email}</MyInfo>
              </Container>
            )}
            {Array.isArray(UserInfo) ? (
              UserInfo.map((userinfo) => (
                <Container key={userinfo.id}>
                  <MyName>{userinfo.nickname}</MyName>
                  <MyInfo>{userinfo.point}</MyInfo>
                  <MyInfo>{userinfo.exp}</MyInfo>
                  <MyInfo>{userinfo.level}</MyInfo>
                  <LogImg src={userinfo.imageUrl} />
                </Container>
              ))
            ) : (
              <Container>
                <MyName>{UserInfo?.nickname}</MyName>
                <Img src="https://cdn-icons-png.flaticon.com/512/4291/4291393.png" />
                <MyInfo>{UserInfo?.point}</MyInfo>
                <Img src="https://cdn-icons-png.flaticon.com/256/8078/8078485.png" />
                <MyInfo>{UserInfo?.exp}</MyInfo>
                <Img src="https://cdn-icons-png.flaticon.com/512/7965/7965741.png" />
                <MyInfo>{UserInfo?.level}</MyInfo>
                <LogImg src={UserInfo?.imageUrl} alt="프로필 없음" />
              </Container>
            )}
            <LogoutButton onClick={gotoUserInfo}>Goto Nickname</LogoutButton>
            <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
          </MainContainer>
        )}
      </MainContainer>
    </Wrapper>
  );
}

export default MyPage;
