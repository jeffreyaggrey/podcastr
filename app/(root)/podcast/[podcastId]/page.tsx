import React from "react";

const PodcastDetails = ({
  params: { podcastId },
}: {
  params: { podcastId: string };
}) => {
  return <p className="text-white-1">PodcastDetails for {podcastId}</p>;
};

export default PodcastDetails;
