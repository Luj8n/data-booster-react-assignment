import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { lessons } from "app/data/lessons.json";

export async function loader({ params }: LoaderFunctionArgs) {
  // TODO: maybe there's a better way?
  const lesson = lessons.find((l) => l.exercises.some((e) => e.id === params.exerciseId));
  const exercise = lesson?.exercises.find((e) => e.id === params.exerciseId);

  // TODO: don't return everything to the client
  return { lesson, exercise };
}

export default function Exercise() {
  const { lesson, exercise } = useLoaderData<typeof loader>();

  return <div></div>;
}

function VideoExercise() {
  return <div></div>;
}

function MultipleChoiceExercise() {
  return <div></div>;
}
