"use client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import useFetch from "../../../utils/useFetch";

// const Section = () => {
// const { workspace } = useParams();
// const user = useSelector((store) => store.user);
// let { userId, currentWorkspace } = user.value;

// const { data, error, fetching } = useFetch({
//   url: `/workspace/${userId}/${currentWorkspace.id || workspace}/`,
// });
// if (error) {
//   return <div>ERROR</div>;
// }
// console.log(data);

// return <div>{workspace}</div>;
// };
// export default Section;

export default function Section() {
  const { workspace } = useParams();
  const user = useSelector((store) => store.user);
  let { userId, currentWorkspace } = user.value;

  const { data, error, fetching } = useFetch({
    url: `/workspace/${userId}/${currentWorkspace.id || workspace}/`,
  });
  if (error) {
    return <div>ERROR</div>;
  }
  console.log(data);

  return <div>{workspace}</div>;
}
