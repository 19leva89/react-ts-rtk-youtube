import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import { BASE_URL } from "../utils/constants";

import { RootState } from "../redux/store";
import { UserComment } from "../types";

import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

type Props = {
  videoId: string;
};

const Comments: FC<Props> = ({ videoId }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [comments, setComments] = useState<UserComment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  //TODO: ADD NEW COMMENT FUNCTIONALITY

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} alt="User Avatar" />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
