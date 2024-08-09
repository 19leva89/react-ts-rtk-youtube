import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Card from "../components/Card";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
	const [videos, setVideos] = useState([]);
	const query = useLocation().search;

	useEffect(() => {
		const fetchVideos = async () => {
			const res = await axios.get(`/videos/search${query}`);
			setVideos(res.data);
		};
		fetchVideos();
	}, [query]);

	return <Container>
		{videos.map(video => (
			<Card key={video._id} video={video} />
		))}
	</Container>;
};

export default Search;