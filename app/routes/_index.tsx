import { redirect, type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Data Booster React Assignment" }];
};

export async function loader() {
  return redirect("/lesson/465ad295-51be-4743-b879-96fc3ab3d388");
}

export default function Index() {
  return <div className="">Homepage</div>;
}
