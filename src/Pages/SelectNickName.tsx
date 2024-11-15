import styled from "styled-components";
import { getCheckDuplicate, ITeamImage, postUserInfo } from "../api";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
`;

const Container = styled.div`
  flex: 1 0 auto;
  display: grid;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  justify-items: center;
`;

const MainContainer = styled(Container)`
  min-height: 0;
  column-gap: 160px;
  padding-top: 60px;
  width: 100%;
`;

const Title = styled.span`
  font-size: 25px;
  grid-column: 1 / -1; // Title을 두 열을 사용하도록 설정
  text-align: center; /* 중앙 정렬 */
  margin-top: 20px;
  margin-bottom: 30px;
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

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 52px;
  width: 200px;
  background-color: #6e24ed;
  color: #fff;
  border-radius: 10px;
  margin-top: 10px;
  margin-left: 70px;
`;

const LogImg = styled.img`
  width: 100px;
  height: 100px;
`;

function SelectNickName() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [teamImg, setTeamImg] = useState<ITeamImage[]>([]);
  const [myTeam, setMyTeam] = useState<ITeamImage | null>(null);
  const [myteamId, setMyteamId] = useState<string>("");

  const onChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const {
      currentTarget: { value },
    } = event;
    setNickname(value);
  };

  const selectId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMyteamId(e.currentTarget.value);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8080/image/list`, {
        method: "GET",
        credentials: "include",
      }).then((data) => data);
      const json = await response.json();
      setTeamImg(json);
    })();

    (async () => {
      const response = await fetch(`http://localhost:8080/image/${myteamId}`, {
        method: "GET",
        credentials: "include",
      });
      const json = await response.json();
      setMyTeam(json);
    })();
  }, [myteamId]);

  const writeNickname = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const imageUrl = myTeam?.imageUrl;
    const response = await getCheckDuplicate(nickname);
    const status = response.status;
    if (status === 409) {
      alert(nickname + "은 중복입니다. 다른 닉네임으로 만들어주세요.");
    } else if (status === 200) {
      alert(nickname + "로 닉네임을 만들었습니다.");
      await fetch(`http://localhost:8080/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, imageUrl }),
        credentials: "include",
      });
      console.log(JSON.stringify({ nickname, imageUrl }));
      navigate("/mypage");
    }
  };

  return (
    <Wrapper>
      <MainContainer>
        <Title>Select Your Nickname</Title>
        <form onSubmit={writeNickname}>
          <InputWrapper>
            <UsernameInput
              placeholder="Please Write Your Nickname"
              onChange={onChangeInput}
            ></UsernameInput>
            <div>
              <select onChange={selectId}>
                <option value="">좋아하는 팀 선택</option>
                {[...teamImg].map((img) => (
                  <option key={img.id} value={img.id}>
                    {img.team}
                  </option>
                ))}
              </select>

              {myTeam && (
                <LogImg src={myTeam.imageUrl} alt="팀 로고 이미지 없음" />
              )}
            </div>
            <Btn>등록하기</Btn>
          </InputWrapper>
        </form>
      </MainContainer>
    </Wrapper>
  );
}

export default SelectNickName;
