import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLoginAtom } from "../atom";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
`;

const MainContainer = styled.div`
  flex: 1 0 auto;
  display: grid;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  justify-items: center;
  min-height: 0;
  column-gap: 160px;
  padding: 80px;
  width: 100%;
  grid-template-rows: [left-start center-start right-start] 1fr [left-end center-end right-end];
  grid-template-columns: [left-start center-start] 1fr [left-end right-start] 1fr [center-end right-end];
`;

const LoginContainer = styled.div`
  padding: 0 40px 40px;
  border-radius: 3px;
  box-shadow: none;
  width: 320px;
  box-sizing: content-box;
  flex-shrink: 0;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  white-space: normal;
  border-radius: 5px;
  position: relative;
  grid-area: center;
  box-shadow: none;
  vertical-align: baseline;
  box-sizing: content-box;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 25px;
  width: 320px;
  box-sizing: content-box;
`;

const UsernameInput = styled.input`
  background-color: #fff;
  border: 1px solid #c2c8d0;
  border-radius: 6px;
  box-sizing: border-box;
  color: #2d333a;
  font-family: inherit;
  font-size: 16px;
  height: 52px;
  line-height: 1.1;
  outline: none;
  padding-block: 1px;
  padding-inline: 2px;
  padding: 0 16px;
  transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
  width: 100%;
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  margin: 0;
  margin-bottom: 5px;
`;

const PasswordInput = styled.input`
  background-color: #fff;
  border: 1px solid #c2c8d0;
  border-radius: 6px;
  box-sizing: border-box;
  color: #2d333a;
  font-family: inherit;
  font-size: 16px;
  height: 52px;
  line-height: 1.1;
  outline: none;
  padding-block: 1px;
  padding-inline: 2px;
  padding: 0 16px;
  transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
  width: 100%;
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  margin: 0;
`;

const LoginButton = styled.button`
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

const DividerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  text-transform: uppercase;
  border: none;
  font-size: 12px;
  font-weight: 400;
  margin: 0;
  padding: 24px 0 0;
  align-items: center;
  justify-content: center;
  width: 320px;
  vertical-align: baseline;
`;

const Divider = styled.span`
  text-align: center;
  flex: 0.2 0 auto;
  margin: 0;
  height: 12px;
`;

const SocialSection = styled.div`
  margin-top: 24px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
`;

const SocialButton = styled.button`
  position: relative;
  width: 320px;
  border: 1px solid #c2c8d0;
  border-radius: 6px;
  font-size: 16px;
  align-items: center;
  background-color: #fff;
  height: 52px;
  transition: box-shadow 0.15 ease-in-out, background-color 0.15s ease-in-out;
  cursor: pointer;
  color: #2d333a;
  margin-bottom: 8px;
  display: flex;
  outline: 0;
`;

const SocialLog = styled.span`
  transform: translate(-50%) translateY(-50%);
`;

const SocialText = styled.span`
  text-align: left;
  position: relative;
  margin-left: 15px;
`;

const SocialImage = styled.img`
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-left: 10px;
`;

function Login() {
  const setLogin = useSetRecoilState(isLoginAtom);
  const toggleLoginAtom = () => {
    setLogin((current: boolean) => !current);
  };
  const googleOnclick = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
    toggleLoginAtom();
  };
  const naverOnclick = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
    toggleLoginAtom();
  };

  return (
    <Wrapper>
      <MainContainer>
        <SectionWrapper>
          <LoginContainer>
            {/* <InputWrapper>
              <UsernameInput type="text" placeholder="User Name" />
              <PasswordInput type="password" placeholder="Password" />
              <LoginButton>Log In</LoginButton>
            </InputWrapper> */}

            {/* <DividerWrapper>
              <Divider>
                --------------------------또는------------------------------
              </Divider>
            </DividerWrapper> */}

            <SocialSection>
              <SocialButton onClick={googleOnclick}>
                <SocialImage src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" />
                <SocialText>Google로 계속하기</SocialText>
              </SocialButton>
              <SocialButton onClick={naverOnclick}>
                <SocialImage src="https://play-lh.googleusercontent.com/jYtnK__ibJh9emODIgTyjZdbKym1iAj4RfoVhQZcfbG-DuTSHR5moHVx9CQnqg1yoco9" />
                <SocialText>Naver로 계속하기</SocialText>
              </SocialButton>
            </SocialSection>
          </LoginContainer>
        </SectionWrapper>
      </MainContainer>
    </Wrapper>
  );
}

export default Login;
