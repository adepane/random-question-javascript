import { question } from "../conf/config";


class DataSource {
  static fetchData(id) {
    return new Promise((resolve, reject) => {
      const filteredQuestion = question.filter((question) => {
        return question.id_question === id;
      });
      if (filteredQuestion.length) {
        resolve(filteredQuestion);
      } else {
        reject(`${id} is not found`);
      }
    });
  }

  static getLenghtData() {
    if (question.length > 0) {
      return question.length;
    } else {
      return `Question empty`;
    }
  }

  static getData() {
    if (question.length > 0) {
      return question;
    } else {
      return `Question empty`;
    }
  }
}
export default DataSource;