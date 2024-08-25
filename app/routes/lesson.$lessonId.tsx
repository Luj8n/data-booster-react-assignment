import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { lessons } from "app/data/lessons.json";

export async function loader({ params }: LoaderFunctionArgs) {
  const lesson = lessons.find((l) => l.id === params.lessonId);

  if (!lesson) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  // TODO: find first by order

  if (lesson.exercises.length < 1 || !lesson.exercises[0].id) {
    throw new Response(null, {
      status: 500,
      statusText: "No exercise found",
    });
  }

  return redirect(`/exercise/${lesson.exercises[0].id}`);
}

export default function Lesson() {
  return <div></div>;
}
