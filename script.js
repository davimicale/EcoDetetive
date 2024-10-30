function login() {
    window.location.href = "home.html";
}

const questions = {
    aquecimento: [
        { text: "O aquecimento global aumentou a temperatura média em 2°C em apenas 10 anos.", isFake: true, hint: "Considere o tempo necessário para mudanças tão drásticas na temperatura média global.", image: "assets/images/aquecimento_global.png" },
        { text: "As emissões de CO₂ são a principal causa do aquecimento global.", isFake: false, hint: "Pense nos gases mais conhecidos que afetam o clima.", image: "assets/images/aquecimento1.png" },
        { text: "O aumento do nível do mar é uma consequência direta do aquecimento global.", isFake: false, hint: "Reflita sobre as consequências do aquecimento no gelo polar.", image: "assets/images/aquecimento2.png" }
    ],
    queimadas: [
        { text: "Queimadas ocorrem naturalmente em áreas de floresta tropical.", isFake: true, hint: "Pense se queimadas frequentes ocorrem naturalmente em florestas densas.", image: "assets/images/queimadas.png" },
        { text: "As queimadas contribuem para o aumento das emissões de CO₂ na atmosfera.", isFake: false, hint: "Reflita sobre o impacto de fogo e combustão no ar.", image: "assets/images/queimadas1.png" },
        { text: "Queimadas são sempre causadas por ação humana.", isFake: true, hint: "Considere se incêndios podem começar naturalmente em certas condições.", image: "assets/images/queimadas2.png" }
    ]
};

let score = 0;
let currentQuestion = 0;
let topic = null;
let reviewMode = false;

function loadTopic() {
    const params = new URLSearchParams(window.location.search);
    topic = params.get("topico");

    document.getElementById("topic-title").textContent = 
        topic === "aquecimento" ? "Aquecimento Global" : "Queimadas";

    showQuestion();
}

function showQuestion() {
    if (currentQuestion < questions[topic].length) {
        const questionData = questions[topic][currentQuestion];
        document.getElementById("question-section").style.display = "block";
        document.getElementById("question").textContent = questionData.text;
        document.getElementById("feedback").textContent = "";
        document.getElementById("hint").style.display = "none";
        document.getElementById("question-image").src = questionData.image;
        document.getElementById("question-image").style.display = "block";
    } else {
        endQuiz(); // Exibe a tela de pontuação sem dados da última pergunta
    }
}

function answerQuestion(isTrue) {
    if (!reviewMode) {
        const correct = questions[topic][currentQuestion].isFake === !isTrue;
        const feedback = correct ? "Resposta Correta!" : "Resposta Incorreta!";
        const feedbackColor = correct ? "correct" : "incorrect";

        if (correct) score++;

        document.getElementById("feedback").textContent = feedback;
        document.getElementById("feedback").className = feedbackColor;

        currentQuestion++;
        setTimeout(showQuestion, 1000);
    }
}

function showHint() {
    const hintElement = document.getElementById("hint");

    if (hintElement.style.display === "none" || hintElement.style.display === "") {
        const hint = questions[topic][currentQuestion].hint;
        hintElement.textContent = `Dica: ${hint}`;
        hintElement.style.display = "block"; // Exibe a dica
    } else {
        hintElement.style.display = "none"; // Oculta a dica se clicada novamente
    }
}

// Funções de compartilhamento
function shareOnFacebook() { /* conteúdo aqui */ }
function shareOnTwitter() { /* conteúdo aqui */ }
function openInstagram() { /* conteúdo aqui */ }

// Funções de revisão
function startReview() { /* conteúdo aqui */ }
function showCorrectAnswer() { /* conteúdo aqui */ }
function previousReviewQuestion() { /* conteúdo aqui */ }
function nextReviewQuestion() { /* conteúdo aqui */ }
function endReview() { /* conteúdo aqui */ }
function updateReviewNavigationButtons() { /* conteúdo aqui */ }

function showScore() {
    document.getElementById("score").style.display = "block";
    document.getElementById("final-score").textContent = score;
    document.getElementById("retry-buttons").style.display = "block";
    document.getElementById("social-footer").style.display = "flex"; // Mostra o footer com os ícones de compartilhamento apenas na tela final
}

function goHome() {
    reviewMode = false;
    currentQuestion = 0;
    score = 0;
    window.location.href = "home.html";
}
