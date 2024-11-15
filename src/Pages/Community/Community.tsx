import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IContent } from "../../api";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
`;

const MainContainer = styled.div`
  flex: 0 0 auto;
  display: grid;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  justify-items: center;
  min-height: 0;
  padding-top: 80px;
  width: 100%;
`;

const Title = styled.span`
  font-size: 25px;
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 20px;
`;

function Community() {
  const { communityid } = useParams();
  // console.log(communityid);
  const location = useLocation();
  const [content, setContent] = useState<IContent>();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:8080/community/${communityid}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json = await response.json();
      // console.log(json);
      setContent(json);
    })();
  }, []);

  const deleteCommunity = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:8080/community/${communityid}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    // console.log(response.status);
    if (response.status === 200) {
      alert("게시글 삭제가 완료되었습니다.");
      navigate("/community");
    } else {
      alert("게시글 삭제가 불가합니다. 다시 이용해 주세요!");
      window.location.reload();
    }
  };

  return (
    <Wrapper>
      <MainContainer>
        {content && content.id && (
          <div>
            <Title>{content.title}</Title>
            <div>{content.nickname}</div>
            <div>{content.createdAt}</div>
            <div dangerouslySetInnerHTML={{ __html: content.content }} />
            <Link to="edit">
              <button>Edit</button>
            </Link>

            <button onClick={deleteCommunity}>Delete</button>
          </div>
        )}
      </MainContainer>
    </Wrapper>
  );
}

export default Community;
