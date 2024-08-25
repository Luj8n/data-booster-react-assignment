import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { lessons } from "app/data/lessons.json";

export async function loader({ params }: LoaderFunctionArgs) {
  const lesson = lessons.find((l) => l.id === params.lessonId);

  if (!lesson) {
    throw new Response(null, {
      status: 404,
      statusText: "No lesson found",
    });
  }

  // TODO: probably should find the first exercise by the order property

  if (lesson.exercises.length < 1 || !lesson.exercises[0].id) {
    throw new Response(null, {
      status: 404,
      statusText: "No exercise found",
    });
  }

  return redirect(`/exercise/${lesson.exercises[0].id}`);
}

export default function Lesson() {
  return <div></div>;
}
