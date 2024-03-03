export default class Score {
  constructor() {
    this.highScore = 0;
  }

  loadScore() {
    const score = parseInt(localStorage.getItem('boink-score'));
    if (score && score !== NaN) {
      this.highScore = score;
    } else {
      this.highScore = 0;
    }

    localStorage.setItem('boink-score', this.highScore);
  }

  getScore() {
    return this.highScore;
  }

  setScore(newScore) {
    if (newScore > this.highScore) {
      this.highScore = newScore;
      localStorage.setItem('boink-score', this.highScore);
    } 
  }
}
