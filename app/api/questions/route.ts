import { NextResponse } from 'next/server';
import { QUESTIONS, shuffle } from '@/lib/questions';

export async function GET(){
  const exam = shuffle(QUESTIONS).map(q => {
    const opts = shuffle(q.options.map((text,index)=>({text,correct:index===q.answer})));
    return { id:q.id, question:q.question, options:opts.map(o=>o.text) };
  });
  return NextResponse.json({ questions: exam, passingScore: 21, total: 30 });
}
