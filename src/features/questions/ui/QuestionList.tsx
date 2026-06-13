import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import { fetchQuestions } from '../model/questionsSlice';

export function QuestionList() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.questions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  if (status === 'loading') {
    return <p className="text-on-surface-variant">Loading questions...</p>;
  }

  return (
    <section className="space-y-4 rounded-3xl border border-outline-variant/30 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-on-surface">Top questions</h2>
      {items.length === 0 ? (
        <p className="text-on-surface-variant">No questions yet.</p>
      ) : (
        items.map((question) => (
          <article key={question.id} className="rounded-2xl border border-outline-variant/30 p-4">
            <h3 className="text-lg font-semibold text-on-surface">{question.title}</h3>
            <p className="mt-2 text-sm text-on-surface-variant">{question.body}</p>
          </article>
        ))
      )}
    </section>
  );
}
