'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import QuestionRenderer from './QuizRender';
import { Questions, AnswerValue } from '@/app/types';

interface User {
  id: string;
  email: string;
}


export default function Test() {
  const { user } = useAuth() as { user: User };
  const router = useRouter();

  const [questions, setQuestions] = useState<Questions[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Record<string, AnswerValue>>({});
  const [savedTime, setSavedTime] = useState<number[]>([]);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    setSeconds(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  useEffect(() => {
    const getData = localStorage.getItem('lms-test');
    if (!getData) return;

    const parsed = JSON.parse(getData);
    const datum = parsed.state;

    const getDataFromApi = async () => {
      try {
       

        const res = await fetch(`/api/test/get-quiz`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datum),
        });

        if (!res.ok) {
          alert("Something went wrong");
          return;
        }
        const result = await res.json();
        console.log(result)
        console.log(currentQuestion)
        setQuestions(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    getDataFromApi();
  }, []);

  const handleAnswer = (questionId: string, option: string | any, selected: string | string[], format: string) => {

    let value: any = selected;
    if (format == "Highlight") {
      value = { text: value }
    }
    if (format == "Multi Rating") {
      const prevRatings = selectedAnswer[questionId] || {};

      value = {
        ...prevRatings,
        [option]: selected,
      };
    }
    if (format !== 'Dropdown' && format != 'Highlight' && format != 'Multi Rating') {
      Array.isArray(selected)
      value = [...selected].sort().join('');
    }

    setSelectedAnswer((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const nextButton = () => {
    const updatedTime = [...savedTime, seconds];
    setSavedTime(updatedTime);
    setSeconds(0);
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (currentIndex === questions.length - 1) {
      submitQuiz(updatedTime);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const backButton = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      const previousTime = savedTime[prevIndex] || 0;
      setSeconds(previousTime);
      setCurrentIndex(prevIndex);
    }
  };

  const getScenarioQuestionCount = () => {
    if (!currentQuestion) return 0;
    return questions.filter(q => q.scenario_id === currentQuestion.scenario_id).length;
  };

  const getCurrentItemIndex = () => {
    if (!currentQuestion) return 0;
    const scenarioQuestions = questions.filter(q => q.scenario_id === currentQuestion.scenario_id);
    return scenarioQuestions.findIndex(q => q.question_id === currentQuestion.question_id) + 1;
  };

  const submitQuiz = async (timeList: number[]) => {
    let correct = 0;

    const used_questions = questions.map((q, i) => {
      // Normalize correct answer to always be an array
      const correctAnsArray = Array.isArray(q.ans)
        ? q.ans
        : typeof q.ans === 'string'
          ? q.ans.split('')
          : [];

      const userAnsString = selectedAnswer[q.question_id] || '';

      //  let userAnsArray;
      let userAnsArray;
      let userHighlight: string[] = [];
      // Normalize user answer depending on question format
      if (q.format === "Dropdown") {
        userAnsArray = Array.isArray(userAnsString) ? userAnsString : [];
      }
      else if (q.format === "Highlight") {
        let text = "";

        if (!Array.isArray(userAnsString) && typeof userAnsString === "object" && userAnsString !== null) {
          const t = userAnsString.text;
          text = Array.isArray(t) ? t.join("") : t;
        } else if (Array.isArray(userAnsString)) {
          text = userAnsString.join("");
        } else if (typeof userAnsString === "string") {
          text = userAnsString;
        }

        userHighlight = (text == '') ? [] : [text]
      }
      //  else if (q.format == "Multi Rating") userAnsArray = userAnsString
      else {
        userAnsArray = typeof userAnsString === "string" ? userAnsString.split("") : [];
      }



      let isCorrect = false;
      let total = 0;
      let obtain = 0;

      if (q.format === "Multi Rating") {

        const correctAns = q.ans[0];
        userAnsArray = [userAnsString];
        total = Object.keys(correctAns).length;

        function evaluateAnswers(correct: any, userAns: any) {

          for (let key in userAns) {
            if (String(correct[key]) === String(userAns[key])) obtain++

          }
          isCorrect = obtain === total;
        }

        evaluateAnswers(correctAns, userAnsString);

      }

      else if (q.format == "Highlight") {
        const selectedText = userHighlight.length == 0 ? userHighlight : userHighlight[0].trim();
        const correctText = q.ans[0].trim();
        obtain = selectedText === correctText ? 1 : 0;
        // total = q?.score ?? 0;
        total = 1;
        isCorrect = obtain === total;
        if (isCorrect) correct++;
      }
      else {
        const correctSet = new Set(correctAnsArray);
        const selectedSet = new Set(userAnsArray);

        selectedSet.forEach((item) => {
          if (correctSet.has(item)) obtain++;
        });

        total = correctSet.size;
        isCorrect = obtain === total && selectedSet.size === correctSet.size;

        if (isCorrect) correct++;

      }

      return {
        user_id: user.id,
        question_id: q.question_id,
        subject: q.subject,
        system: q.system,
        attempt_number: 1,
        selected_option: q.format === "Highlight" ? userHighlight : userAnsArray,
        correct_option: correctAnsArray,
        is_correct: isCorrect,
        time_taken_secs: timeList[i] || 0,
        total,
        obtain,
      };
    })
    const percentage = ((correct / used_questions.length) * 100).toFixed(1);

    const practice_session = {
      total_questions: used_questions.length,
      user_id: user.id,
      correct_answers: correct,
      score: percentage,
      subject: questions[0]?.subject,
      ques_type: questions[0]?.type,
    };
    console.log(practice_session, used_questions)
    try {
      const res = await fetch(`/api/test/submit-answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ practice_session, used_questions }),
      });

      if (!res.ok) {
        alert('Submission failed');
        return;
      }

      router.push('/dashboard/result');
    } catch (err) {
      console.error('Error submitting quiz:', err);
    }
  };


  return (
    <section>
      <nav className="navbar custom-navbar">
        <div className="container-fluid">
          <p className="navbar-brand mx-5 my-0">NCLEX</p>
          <div className="d-flex mx-5">
            <p className=" mb-0">{seconds} sec</p>
          </div>
        </div>
      </nav>

      <div className="test-container">
        {currentQuestion && (
          <div className="test-question-block">
            <div className="test-left-panel">
              <h3>Scenario</h3>
              <p>{currentQuestion.scenario}</p>
            </div>

            <div className="test-right-panel">
              <h4>Item {getCurrentItemIndex()} of {getScenarioQuestionCount()}</h4>
              {!['Dropdown', 'Highlight'].includes(currentQuestion.format) && (
                <p>{currentQuestion.ques}</p>
              )}

              <QuestionRenderer
                question={currentQuestion}
                savedAnswer={selectedAnswer[currentQuestion.question_id] || ''}
                onAnswer={(selected, option) => handleAnswer(currentQuestion.question_id, option, selected, currentQuestion.format)}
              />

              <div className="m-5 d-flex justify-content-between">
                <button className="button-primary" onClick={backButton} disabled={currentIndex === 0}>
                  Back
                </button>
                <button onClick={nextButton} className="button-success">
                  {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}