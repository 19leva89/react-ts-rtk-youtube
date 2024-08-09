import { FC } from "react";
import ReactTimeAgo from "react-time-ago";

type Props = {
  date: string;
};

const CreationDate: FC<Props> = ({ date }) => {
  const timestamp = typeof date === "number" ? date : new Date(date).getTime();

  return <ReactTimeAgo date={timestamp} locale="en-US" />;
};

export default CreationDate;
