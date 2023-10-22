"use client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import useFetch from "../../../utils/useFetch";

export default function Workspace() {
  const { workspace } = useParams();
  const user = useSelector((store) => store.user);
  let { userId, currentWorkspace } = user.value;

  const { data, error, fetching } = useFetch({
    url: `/workspace/${userId}/${currentWorkspace.id || workspace}/`,
  });
  if (error) {
    return <div>ERROR</div>;
  }

  return <div>{workspace}</div>;
}
