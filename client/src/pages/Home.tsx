import { useEffect, useState } from "react";

import axios from "axios";
import { BASE_URL } from "../utils/constants";

import { Video } from "../types";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }: { type: string }) => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${BASE_URL}/api/videos/${type}`);
      setVideos(res.data);
    };

    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} type={type} />
      ))}
    </Container>
  );
};

export default Home;
