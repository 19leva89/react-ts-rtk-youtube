import { FC, useEffect, useState } from "react";
import axios from "axios";

import { Video } from "../types";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;

type Props = {
  tags: string;
};

const Recommendation: FC<Props> = ({ tags }) => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
