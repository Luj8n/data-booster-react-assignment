import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, MetaFunction, useFetcher, useLoaderData } from "@remix-run/react";

import { lessons } from "~/data/lessons.json";
import LeftIcon from "~/icons/Left";
import RightIcon from "~/icons/Right";
import HintIcon from "~/icons/Hint";

export async function loader({ params }: LoaderFunctionArgs) {
  const lesson = lessons.find((l) => l.exercises.some((e) => e.id === params.exerciseId));
  const exercise = lesson?.exercises.find((e) => e.id === params.exerciseId);

  if (!exercise) {
    throw new Response(null, {
      status: 404,
      statusText: "No exercise found",
    });
  }

  return {
    lessonTitle: lesson?.title,
    exercise: {
      id: exercise.id,
      title: exercise.title,
      description: exercise.description,
      answers: exercise.answers,
      previous_exercise_id: exercise.previous_exercise_id,
      next_exercise_id: exercise.next_exercise_id,
      resourcetype: exercise.resourcetype,
      url: exercise.url,
      hint: exercise.hint,
    },
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  // TODO: possibly handle the selected answer
  console.log(formData);

  return null;
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.lessonTitle }];
};

export default function Exercise() {
  const { exercise } = useLoaderData<typeof loader>();

  return (
    <div className="bg-[#7000df] min-h-screen h-max">
      {exercise.previous_exercise_id && (
        <Link to={`/exercise/${exercise.previous_exercise_id}`} className="fixed bottom-10 left-10">
          <LeftIcon />
        </Link>
      )}
      {exercise.next_exercise_id && (
        <Link to={`/exercise/${exercise.next_exercise_id}`} className="fixed bottom-10 right-10">
          <RightIcon />
        </Link>
      )}
      {exercise.hint && (
        <button
          type="button"
          className="fixed top-10 right-10 cursor-pointer"
          onClick={() => alert(`Hint: ${exercise.hint}`)}
        >
          <HintIcon />
        </button>
      )}
      <div className="pt-20 pb-10 lg:px-80 md:px-40 px-2 text-white">
        {exercise.resourcetype === "VideoExercise" ? (
          <VideoExercise exercise={exercise} />
        ) : exercise.resourcetype === "MultipleChoiceExercise" ? (
          <MultipleChoiceExercise exercise={exercise} />
        ) : (
          <div>Unknown exercise type</div>
        )}
      </div>
    </div>
  );
}

function VideoExercise({ exercise }: { exercise: { title: string; url?: string } }) {
  return (
    <>
      <div className="text-5xl font-bold mb-10">{exercise.title}</div>
      <iframe
        title={exercise.title}
        src={exercise.url}
        className="w-full aspect-video bg-violet-600"
        allowFullScreen
      ></iframe>
    </>
  );
}

function MultipleChoiceExercise({
  exercise,
}: {
  exercise: {
    title: string;
    description?: string;
    answers?: {
      id: string;
      answer: string;
      exercise: string;
      resourcetype: string;
    }[];
  };
}) {
  const fetcher = useFetcher();

  return (
    <>
      <div className="text-5xl font-bold mb-10">{exercise.title}</div>
      <div
        className="text-2xl"
        dangerouslySetInnerHTML={{ __html: exercise.description ?? "Missing description" }}
      ></div>
      <div className="text-lg text-[#c699f2] mt-10">Pick one option</div>

      <fetcher.Form method="post" onChange={(e) => fetcher.submit(e.currentTarget)}>
        {exercise.answers?.map((answer) =>
          answer.resourcetype !== "MultipleChoiceExerciseAnswerText" ? (
            <div key={answer.id}>Unknown answer type</div>
          ) : (
            <label
              key={answer.id}
              htmlFor={answer.id}
              className="min-w-full bg-[#9548f5] p-7 my-3 gap-6 rounded-lg flex items-center justify-between cursor-pointer"
            >
              <input
                className="h-4 w-4 shrink-0 appearance-none ring-2 ring-[#af76f7] rounded-full ring-offset-2 ring-offset-[#9548f5] checked:bg-neutral-100"
                id={answer.id}
                type="radio"
                name={answer.exercise}
                value={answer.id}
                required
              ></input>
              <div className="text-xl w-full">{answer.answer}</div>
            </label>
          )
        )}
      </fetcher.Form>
    </>
  );
}
