import React, { useState } from 'react';
import './quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const question = data[index];

  const checkAnswer = (e, answerNumber) => {
    if (selected !== null) return; // Prevent multiple selections

    setSelected(answerNumber);

    const options = document.querySelectorAll('li');
    options.forEach((li, idx) => {
      if (idx + 1 === question.answer) {
        li.classList.add('correct');
      } else if (idx + 1 === answerNumber) {
        li.classList.add('wrong');
      }
    });
  };

  const nextQuestion = () => {
    const options = document.querySelectorAll('li');
    options.forEach((li) => (li.className = '')); // Reset classes

    // Update score if correct
    if (selected === question.answer) {
      setScore((prev) => prev + 1);
    }

    if (index + 1 < data.length) {
      setIndex((prev) => prev + 1);
      setSelected(null);
    } else {
      alert(`Quiz finished! Your score: ${score + (selected === question.answer ? 1 : 0)} / ${data.length}`);
    }
  };

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      <h2>{index + 1}. {question.question}</h2>
      <ul>
        <li onClick={(e) => checkAnswer(e, 1)}>{question.option1}</li>
        <li onClick={(e) => checkAnswer(e, 2)}>{question.option2}</li>
        <li onClick={(e) => checkAnswer(e, 3)}>{question.option3}</li>
        <li onClick={(e) => checkAnswer(e, 4)}>{question.option4}</li>
      </ul>
      <button onClick={nextQuestion} disabled={selected===null}>Next</button>
      <div className='index'>{index + 1} out of {data.length} questions</div>
    </div>
  );
};

export default Quiz;
// This code defines a Quiz component that displays a series of questions from a predefined dataset.