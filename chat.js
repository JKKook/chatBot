// input variable
const inputValue = document.getElementById("input");
let finalResult;
let reply;
const messagesContainer = document.getElementById("messages");

// input event : when Keydowned, Start Output func()
// DOMContentLoaded 사용 이유! load 사용 시, 이미지까지 다 불러오고 데이터를 전송 함으로 재기능이 이뤄지지 않음
document.addEventListener("DOMContentLoaded", () => {
  inputValue.addEventListener("keydown", (e) => {
    //   keyCode보다는 key, code를 사용한 것을 선호! (값이 다름!!!)
    if (e.code === "Enter") {
      let input = inputValue.value;
      inputValue.value = "";
      output(input);
    }
  });
});

function output(input) {
  // regex으로 공백, 오타 방지 지정
  let text = input
    .toLowerCase() // 소문자
    .replace(/[^\w\s]/gi, "") // 문자의 공백
    .replace(/[\d]/gi, "") // 숫자 제거
    .trim(); // 문자열 좌우 공백 제거

  text = text
    .replace(/ a /g, " ") // replace 'a' , 'null' : in order not to distingush a/an
    .replace(/whats/g, "what is")
    .replace(/r u/g, "are you");

  // 조건문
  if (compare(userTexts, botReplies, text)) {
    // search for exact match in `userTexts`
    finalResult = compare(userTexts, botReplies, text);
  } else {
    // if everything else fails, bot produces a random alternative reply
    // 나중에 변경할 부분, 실패했을 때, alert로 알려주는 것도 좋을 듯?
    finalResult = alternative[Math.floor(Math.random() * alternative.length)];
  }
  addToChat(input, finalResult);
}

// function to match the bot's reply to a user's text
function compare(userTexts, botReplies, text) {
  for (let i = 0; i < userTexts.length; i++) {
    for (let j = 0; j < botReplies.length; j++) {
      // userTexts, 배열에서 input으로 입력한 텍스트 값과 동일하다면, 봇에서 준비한 텍스트와 일치시키겠어!, 그리고 해당 배열을 찾아서 콘솔 출력!
      if (userTexts[i][j] === text) {
        let replies = botReplies[i];
        console.log(botReplies[i][j]);
        // else가 들어가야 하지 않나???
        reply = replies[Math.floor(Math.random() * replies.length)];
      }
    }
  }
  return reply;
}

// input, finalResult 추가 함수
function addToChat(input, finalResult) {
  // userDiv라는 변수를 만들어서 messageContainer에 반응하도록 첨가시켜줄거야!
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "response";
  userDiv.innerHTML = `<span>${input}</span><img src="/img/user-solid.svg" alt="Robot cartoon" height="20px" width="20px">`;
  messagesContainer.appendChild(userDiv);

  // bot에 관한 요소(div, img, span)을 만들고 추가!
  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "/img/logo.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botImg);
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);

  // Keep messages at most recent
  // scrollHeight와 clientHeight 차이를 이용해서 현재 scroll 위치를 최신으로 유지하기!
  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // 바로 응답하면 재미없으니까, 응답하는 효과를 주기 위해 가짜 지연 행위를 만들어보자!
  setTimeout(() => {
    botText.innerText = `${finalResult}`;
  }, 2000);
}
