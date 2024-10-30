// script.js

function login() {
    window.location.href = "home.html";
  }
  
  const questions = {
    aquecimento: [
      { text: "O aquecimento global aumentou a temperatura média em 2°C em apenas 10 anos.", isFake: true, hint: "Considere o tempo necessário para mudanças tão drásticas na temperatura média global." },
      { text: "As emissões de CO₂ são a principal causa do aquecimento global.", isFake: false, hint: "Pense nos gases mais conhecidos que afetam o clima." },
      { text: "O aumento do nível do mar é uma consequência direta do aquecimento global.", isFake: false, hint: "Reflita sobre as consequências do aquecimento no gelo polar." }
    ],
    queimadas: [
      { text: "Queimadas ocorrem naturalmente em áreas de floresta tropical.", isFake: true, hint: "Pense se queimadas frequentes ocorrem naturalmente em florestas densas." },
      { text: "As queimadas contribuem para o aumento das emissões de CO₂ na atmosfera.", isFake: false, hint: "Reflita sobre o impacto de fogo e combustão no ar." },
      { text: "Queimadas são sempre causadas por ação humana.", isFake: true, hint: "Considere se incêndios podem começar naturalmente em certas condições." }
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
    
    if (topic === "queimadas") {
      document.getElementById("queimadas-image").style.display = "block";
    } else if (topic === "aquecimento") {
      document.getElementById("aquecimento-image").style.display = "block";
    }
  
    showQuestion();
  }
  
  function showQuestion() {
    if (currentQuestion < questions[topic].length) {
      document.getElementById("question-section").style.display = "block";
      document.getElementById("question").textContent = questions[topic][currentQuestion].text;
      document.getElementById("feedback").textContent = "";
      document.getElementById("hint").style.display = "none";
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
      hintElement.textContent = Dica: ${hint};
      hintElement.style.display = "block"; // Exibe a dica
    } else {
      hintElement.style.display = "none"; // Oculta a dica se clicada novamente
    }
  }

  
  function shareOnFacebook() {
    const url = "https://www.facebook.com/sharer/sharer.php?u=https://example.com";
    const text = Eu consegui uma pontuação de ${score} no EcoDetetive!;
    window.open(${url}&quote=${encodeURIComponent(text)}, "_blank");
  }
  
  function shareOnTwitter() {
    const url = "https://twitter.com/intent/tweet";
    const text = Eu consegui uma pontuação de ${score} no EcoDetetive! Tente você também! #EcoDetetive;
    window.open(${url}?text=${encodeURIComponent(text)}, "_blank");
  }
  
  function openInstagram() {
    window.open("https://www.instagram.com", "_blank");
  }
  function startReview() {
    reviewMode = true;
    currentQuestion = 0;
    
    document.getElementById("score").style.display = "none";
    document.getElementById("retry-buttons").style.display = "none";
    document.getElementById("social-footer").style.display = "none"; // Oculta o footer durante a revisão
    document.getElementById("question-section").style.display = "block";
    document.getElementById("review-navigation").style.display = "block"; // Mostra os botões "Próxima" e "Voltar" na revisão

    // Oculta os botões "Verdadeira", "Falsa" e "Dica" durante a revisão
    document.querySelector("button[onclick='answerQuestion(true)']").style.display = "none";
    document.querySelector("button[onclick='answerQuestion(false)']").style.display = "none";
    document.querySelector("button[onclick='showHint()']").style.display = "none";

    showCorrectAnswer();
}

  function endQuiz() {
    // Oculta a seção de perguntas e feedback
    document.getElementById("question-section").style.display = "none";
    document.getElementById("feedback").style.display = "none";
    
    // Exibe a tela de pontuação final
    document.getElementById("score").style.display = "block";
    document.getElementById("final-score").textContent = score;
    document.getElementById("retry-buttons").style.display = "block";
    document.getElementById("social-footer").style.display = "flex"; // Mostra o footer com os ícones de compartilhamento apenas na tela final
  }
  function showCorrectAnswer() {
    if (currentQuestion >= 0 && currentQuestion < questions[topic].length) {
      const question = questions[topic][currentQuestion];
      document.getElementById("question").textContent = question.text;
      document.getElementById("feedback").textContent = question.isFake ? "Resposta Correta: Falsa" : "Resposta Correta: Verdadeira";
      document.getElementById("feedback").style.display = "block";
      document.getElementById("feedback").className = "correct";
    }
  }
  
  function previousReviewQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      showCorrectAnswer();
    }
  }
  
  function nextReviewQuestion() {
    if (currentQuestion < questions[topic].length - 1) {
      currentQuestion++;
      showCorrectAnswer();
    } else {
      endReview();
    }
  }
  
  function endReview() {
    reviewMode = false;
    
    // Restaura os botões "Verdadeira", "Falsa" e "Dica" para uso futuro
    document.querySelector("button[onclick='answerQuestion(true)']").style.display = "inline-block";
    document.querySelector("button[onclick='answerQuestion(false)']").style.display = "inline-block";
    document.querySelector("button[onclick='showHint()']").style.display = "inline-block";

    document.getElementById("question-section").style.display = "none";
    document.getElementById("review-navigation").style.display = "none";
    showScore();
}
  
  function updateReviewNavigationButtons() {
    document.querySelector("#review-navigation button:first-child").disabled = currentQuestion === 0;
    document.querySelector("#review-navigation button:last-child").disabled = currentQuestion === questions[topic].length - 1;
  }
  
  function showScore() {
    document.getElementById("score").style.display = "block";
    document.getElementById("final-score").textContent = score;
    document.getElementById("retry-buttons").style.display = "block";
    document.getElementById("social-footer").style.display = "flex"; // Mostra o footer com os ícones
  }
  
  function goHome() {
    reviewMode = false;
    currentQuestion = 0;
    score = 0;
    window.location.href = "home.html";
  }
