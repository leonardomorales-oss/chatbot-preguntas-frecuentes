const responses = {
  hola: "¡Hola! ¿Cómo estás?",
  "buenos días": "¡Buenos días! ¿En qué puedo ayudarte?",
  "buenas tardes": "¡Buenas tardes! ¿Qué te gustaría saber?",
  "cómo estás": "Estoy bien, gracias por preguntar. ¿Y tú?",
  "qué puedes hacer": "Puedo responder preguntas básicas que fueron definidas previamente.",
  ayuda: "Puedes saludarme, preguntarme cómo estoy o preguntarme qué puedo hacer.",
  "muchas gracias": "¡Con gusto! Me alegra poder ayudarte.",
  adiós: "¡Adiós! Que tengas un buen día.",
};

const fallbackResponse =
  "Todavía no conozco esa respuesta. Prueba con “hola”, “¿cómo estás?” o “¿qué puedes hacer?”.";

const form = document.querySelector("#chat-form");
const input = document.querySelector("#user-input");
const messages = document.querySelector("#messages");
const exampleButtons = document.querySelectorAll("[data-question]");

function normalizeText(text) {
  return text
    .trim()
    .toLocaleLowerCase("es-MX")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,;:]/g, "")
    .replace(/\s+/g, " ");
}

const normalizedResponses = Object.fromEntries(
  Object.entries(responses).map(([question, answer]) => [normalizeText(question), answer]),
);

function getBotResponse(userMessage) {
  return normalizedResponses[normalizeText(userMessage)] ?? fallbackResponse;
}

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", `message--${sender}`);

  const author = document.createElement("span");
  author.classList.add("message-author");
  author.textContent = sender === "user" ? "Tú" : "Chatbot";

  const content = document.createElement("p");
  content.textContent = text;

  message.append(author, content);
  messages.append(message);
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage(text = input.value) {
  const userMessage = text.trim();
  if (!userMessage) return;

  addMessage(userMessage, "user");
  addMessage(getBotResponse(userMessage), "bot");
  input.value = "";
  input.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage();
});

exampleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sendMessage(button.dataset.question);
  });
});
