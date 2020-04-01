import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {

  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        id: 1,
        question: 'Какого цвета небо?',
        rightAnswer: 2,
        answers: [
          {text: 'Чёрный', id: 1},
          {text: 'Синий', id: 2},
          {text: 'Красный', id: 3},
          {text: 'Зелёный', id: 4},
        ]
      },
      {
        id: 2,
        question: 'В каком году основали Брест?',
        rightAnswer: 3,
        answers: [
          {text: '1500', id: 1},
          {text: '1034', id: 2},
          {text: '1019', id: 3},
          {text: '1655', id: 4},
        ]
      }
    ]
  }

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswer === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        window.clearTimeout(timeout);
      }, 1000)

    } else {
      results[question.id] = 'error';
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
    }
  }

  isQuizFinished = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  onRetry = () => {
    this.setState({
      results: {},
      answerState: null,
      isFinished: false,
      activeQuestion: 0
    })
  }

  componentDidMount() {
    console.log('Quiz ID', this.props.match.params.id)
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {
            this.state.isFinished
            ? <FinishedQuiz 
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.onRetry}
              />
            : <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
          }
        </div>
      </div>
    )
  }
}

export default Quiz;