$("#input button").on("click", function (event) {
  event.preventDefault();
  let word = $("#word").val();
  return check_word(word);
});

async function check_word(word) {
  const response = await axios.get("/check-word", { params: { text: word } });
  return response;
}
