class AppContent extends HTMLElement {
    set questions(questions) {
        this._questions = questions;
        this.render();
    }

    render() {
        const randAnswer = (question) => {
            for (let i = question.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [question[i], question[j]] = [question[j], question[i]];
            }
            return question;
        };

        const createAnswer = (question) => {
            let answerQuestion = "";
            const pointAns = ['A', 'B', 'C', 'D', 'E'];
            const shuffle = randAnswer(question.answer);
            shuffle.forEach((ans, keys) => {
                answerQuestion += `
                <li class="list-group-item">${pointAns[keys]}. <a  class="answer text-info" href="#" id-question="${question.id_question}" id-pocket="${ans.pocket}">${ans.theAnswer}</a>
                </li>
            `
            });
            return answerQuestion;
        }

        this.innerHTML = `
        <div class="card" style="width:50%;">
            <div class="card-body">
                <h5 class="card-title">${this._questions[0].question}</h5>
                <ul class="list-group list-group-flush">
                    ${createAnswer(this._questions[0])}
                </ul>
            </div>
        </div>
        `;
    }
}
customElements.define("app-content", AppContent);
