import { motion } from "framer-motion";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom, isLoginAtom } from "../atom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  height: 60px;
  font-size: 14px;
  /* padding: 20px 60px; */
  padding-left: 50px;
  color: white;
  background-color: #00000088;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 15px;
  color: white;
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

function Header() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => {
    setDarkAtom((current: boolean) => !current);
  };

  const isLogin = useRecoilValue(isLoginAtom);
  const setLogin = useSetRecoilState(isLoginAtom);

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
    <Nav>
      <Items>
        <Item>
          <Link to="/">Home</Link>
        </Item>
        <Item>
          {isLogin ? (
            <Item>
              <Link to="/mypage">My Page</Link>
            </Item>
          ) : (
            <Item>
              <Link to="/login">Log In</Link>
            </Item>
          )}
        </Item>
        <Item>
          {isDark ? (
            <Img
              src="https://cdn-icons-png.flaticon.com/512/6360/6360844.png"
              onClick={toggleDarkAtom}
            ></Img>
          ) : (
            <Img
              src="https://cdn-icons-png.flaticon.com/512/6714/6714978.png"
              onClick={toggleDarkAtom}
            ></Img>
          )}
        </Item>
      </Items>
    </Nav>
  );
}

export default Header;
