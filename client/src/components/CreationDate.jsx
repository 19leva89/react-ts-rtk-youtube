import React from 'react'
import ReactTimeAgo from 'react-time-ago'

const CreationDate = ({ date }) => {
	const timestamp = typeof date === "number" ? date : new Date(date).getTime();

	return <ReactTimeAgo date={timestamp} locale="en-US" />;
}

export default CreationDate;