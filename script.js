// Quiz questions
const quizData = {
          easy: [
              {
                  question: "What is the capital of France?",
                  answers: ["London", "Berlin", "Paris", "Madrid"],
                  correct: 2
              },
              {
                  question: "Which planet is known as the Red Planet?",
                  answers: ["Mars", "Venus", "Jupiter", "Saturn"],
                  correct: 0
              },
              {
                  question: "What is the largest mammal in the world?",
                  answers: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
                  correct: 1
              },
              {
                  question: "In which year did the Titanic sink?",
                  answers: ["1910", "1912", "1915", "1920"],
                  correct: 1
              },
              {
                  question: "What is the main ingredient in guacamole?",
                  answers: ["Tomato", "Avocado", "Onion", "Lemon"],
                  correct: 1
              }
          ],
          medium: [
              {
                  question: "Who painted the Mona Lisa?",
                  answers: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
                  correct: 1
              },
              {
                  question: "What is the largest ocean on Earth?",
                  answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                  correct: 3
              },
              {
                  question: "Which element has the chemical symbol 'Fe'?",
                  answers: ["Iron", "Gold", "Silver", "Copper"],
                  correct: 0
              },
              {
                  question: "In which year did World War II end?",
                  answers: ["1943", "1944", "1945", "1946"],
                  correct: 2
              },
              {
                  question: "What is the capital of Australia?",
                  answers: ["Sydney", "Melbourne", "Canberra", "Perth"],
                  correct: 2
              }
          ],
          hard: [
              {
                  question: "What is the chemical symbol for gold?",
                  answers: ["Go", "Gd", "Au", "Ag"],
                  correct: 2
              },
              {
                  question: "In which year did World War I begin?",
                  answers: ["1914", "1916", "1918", "1920"],
                  correct: 0
              },
              {
                  question: "Who wrote the play 'Hamlet'?",
                  answers: ["Christopher Marlowe", "William Shakespeare", "Oscar Wilde", "George Bernard Shaw"],
                  correct: 1
              },
              {
                  question: "What is the speed of light in vacuum?",
                  answers: ["299,792 km/s", "300,000 km/s", "310,000 km/s", "320,000 km/s"],
                  correct: 0
              },
              {
                  question: "Which of these is not a fundamental force of nature?",
                  answers: ["Gravity", "Electromagnetic", "Strong Nuclear", "Centrifugal"],
                  correct: 3
              }
          ]
      };
      
      // The rest of the JavaScript code remains the same
      let currentQuestion = 0;
      let score = 0;
      let timer;
      let timeLeft;
      let currentQuiz;
      
      const startScreen = document.getElementById('start-screen');
      const quizScreen = document.getElementById('quiz-screen');
      const resultScreen = document.getElementById('result-screen');
      const startBtn = document.getElementById('start-btn');
      const submitBtn = document.getElementById('submit-btn');
      const restartBtn = document.getElementById('restart-btn');
      const questionEl = document.getElementById('question');
      const answersEl = document.getElementById('answers');
      const timeEl = document.getElementById('time');
      const scoreEl = document.getElementById('score');
      const difficultySelect = document.getElementById('difficulty');
      const scoreList = document.getElementById('score-list');
      
      startBtn.addEventListener('click', startQuiz);
      submitBtn.addEventListener('click', submitAnswer);
      restartBtn.addEventListener('click', restartQuiz);
      
      function startQuiz() {
          const difficulty = difficultySelect.value;
          currentQuiz = quizData[difficulty];
          startScreen.classList.add('hide');
          quizScreen.classList.remove('hide');
          currentQuestion = 0;
          score = 0;
          loadQuestion();
      }
      
      function loadQuestion() {
          const question = currentQuiz[currentQuestion];
          questionEl.textContent = question.question;
          answersEl.innerHTML = '';
          
          question.answers.forEach((answer, index) => {
              const button = document.createElement('button');
              button.textContent = answer;
              button.classList.add('answer');
              button.addEventListener('click', () => selectAnswer(index));
              answersEl.appendChild(button);
          });
          
          timeLeft = 30;
          startTimer();
      }
      
      function selectAnswer(index) {
          const answers = answersEl.children;
          for (let answer of answers) {
              answer.classList.remove('selected');
          }
          answers[index].classList.add('selected');
      }
      
      function submitAnswer() {
          const selectedAnswer = document.querySelector('.answer.selected');
          if (!selectedAnswer) return;
          
          const answerIndex = Array.from(answersEl.children).indexOf(selectedAnswer);
          if (answerIndex === currentQuiz[currentQuestion].correct) {
              score++;
          }
          
          currentQuestion++;
          if (currentQuestion < currentQuiz.length) {
              loadQuestion();
          } else {
              showResult();
          }
      }
      
      function startTimer() {
          clearInterval(timer);
          timeEl.textContent = timeLeft;
          
          timer = setInterval(() => {
              timeLeft--;
              timeEl.textContent = timeLeft;
              
              if (timeLeft <= 0) {
                  clearInterval(timer);
                  submitAnswer();
              }
          }, 1000);
      }
      
      function showResult() {
          clearInterval(timer);
          quizScreen.classList.add('hide');
          resultScreen.classList.remove('hide');
          scoreEl.textContent = `${score} out of ${currentQuiz.length}`;
          updateHighScores();
      }
      
      function restartQuiz() {
          resultScreen.classList.add('hide');
          startScreen.classList.remove('hide');
      }
      
      function updateHighScores() {
          let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
          highScores.push({
              score: score,
              difficulty: difficultySelect.value,
              date: new Date().toLocaleDateString()
          });
          highScores.sort((a, b) => b.score - a.score);
          highScores = highScores.slice(0, 5); // Keep only top 5 scores
          localStorage.setItem('highScores', JSON.stringify(highScores));
          displayHighScores();
      }
      
      function displayHighScores() {
          const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
          scoreList.innerHTML = highScores.map(score => 
              `<li>${score.score} points (${score.difficulty}) - ${score.date}</li>`
          ).join('');
      }
      
      // Display high scores on page load
      displayHighScores();