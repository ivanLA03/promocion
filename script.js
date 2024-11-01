import questions from "./preguntas.js";

const questionDOM = document.querySelector(".question"),
    resetButton = document.querySelector(".reset"),
    [option1,option2,option3,option4] = document.querySelectorAll(".options"),
    options = [option1, option2, option3, option4]

let numberQuestion = 0,
    answers = [],
    guessed = 0;

function main() {
    showQuestion()
    showAnswers()
}

function showQuestion() {
    questionDOM.innerHTML = questions[numberQuestion].question;
}

function showAnswers() {
    answers = [questions[numberQuestion].correctAnswer,
                questions[numberQuestion].wrongAnswer1,
                questions[numberQuestion].wrongAnswer2,
                questions[numberQuestion].wrongAnswer3];
    
    let randomNumbersList = [];
    
    while (randomNumbersList.length < 4) {
        let randomNumber = Math.floor(Math.random() * 4);
        if (!randomNumbersList.includes(randomNumber)) {
            randomNumbersList.push(randomNumber);
        }
    }
    options.forEach((option,index) => option.innerHTML = answers[randomNumbersList[index]])
}

function checkAnswers(selectedOption) {
    toggleOptions(false)
    if (questions[numberQuestion].correctAnswer === selectedOption.textContent) {
        selectedOption.style.backgroundColor = "green"
        guessed++
    } else {
        selectedOption.style.backgroundColor = "red"
    options.forEach(option => {
        if (option.textContent === questions[numberQuestion].correctAnswer) {
            option.style.backgroundColor = "green";
        }
    });
    }

    setTimeout(() => {
        changeColors()
        toggleOptions(true)
    }, 1200);

}

function changeColors(){
    options.forEach(option => option.style.backgroundColor = "");
    if (numberQuestion < questions.length - 1) {
        numberQuestion++
        showQuestion()
        showAnswers()
    }
    else{
        questionDOM.innerHTML = `Respondiste bien ${guessed} de ${questions.length} preguntas`
        options.forEach(option => option.style.display = "none")
    }
}

function reset(){
    guessed = 0
    numberQuestion = 0
    options.forEach(option => option.style.display = "block")
    main()
}

function toggleOptions(enable) {
    options.forEach(option => (option.style.pointerEvents = enable ? "auto" : "none"));
}

options.forEach(option => option.addEventListener("click", () => checkAnswers(option)))
resetButton.addEventListener("click", reset)

main()