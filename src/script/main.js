import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import "../component/app-content";
import "../component/progress-bar";
import "../component/app-form";
import DataSource from "./data-source";
import Helpers from './helpers'

const main = () => {
  const surveyQuestionContainer = document.querySelector("app-content");
  const progressBarContainer = document.querySelector("progress-bar");
  const appFormContainer = document.querySelector("app-form");
  let allAnswer = []

  const questionData = (params) => {
    DataSource.fetchData(params.id_question)
      .then(questionRender)
      .catch(fallbackResult);
  };

  const fallbackResult = (message) => {
    console.log(message);
  };

  const getAlready = (param) => {
    return allAnswer.filter(function (e) { return e.id_qtn === param; }).length > 0
  }

  const checkQuestion = (question) => {
    let newQuestion = [];
    for (let i = question.length - 1; i >= 0; i--) {
      if (!getAlready(question[i].id_question)) {
        newQuestion.push(question[i]);
      }
    }
    const nextQuestion = newQuestion[Math.floor(Math.random() * newQuestion.length)];
    return nextQuestion;
  };

  const randQuestion = (question) => {
    for (let i = question.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [question[i], question[j]] = [question[j], question[i]];
    }
    return question;
  };

  const surveyQuestion = randQuestion(DataSource.getData());

  const questionRender = (results) => {
    surveyQuestionContainer.questions = results;
    const buttons = document.querySelectorAll(".answer");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        let answer = {};
        answer.id_qtn = parseInt(event.target.getAttribute("id-question"));
        answer.id_ans = parseInt(event.target.getAttribute("id-pocket"));
        allAnswer.push(answer);
        document.cookie = `survey_answer=${JSON.stringify(allAnswer)}`;
        const nextQuestion = checkQuestion(surveyQuestion);
        if (allAnswer.length != surveyQuestion.length) {
          questionData(nextQuestion);
          renderProgressBar();
        } else {
          renderAppForm(allAnswer);
        }
      });
    });
  };

  const renderProgressBar = () => {
    let total = [];
    total["total"] = DataSource.getLenghtData();
    total['current'] = allAnswer.length;
    progressBarContainer.total = total;
  }

  const renderAppForm = (answer) => {
    surveyQuestionContainer.remove()
    progressBarContainer.remove();
    appFormContainer.answer = answer;
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (Helpers.getCookie('survey_answer') != null) {
      renderProgressBar();
      const lastAnswer = JSON.parse(Helpers.getCookie('survey_answer'));
      lastAnswer.forEach(ans => allAnswer.push(ans))
      const nextQuestion = checkQuestion(surveyQuestion);
      if (allAnswer.length != surveyQuestion.length) {
        questionData(nextQuestion);
        renderProgressBar();
      } else {
        renderAppForm(allAnswer);
      }
    } else {
      questionData(checkQuestion(surveyQuestion));
      renderProgressBar();
    }
  });

}

export default main;