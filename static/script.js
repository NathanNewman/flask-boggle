$("#input button").on("click", function (event) {
  event.preventDefault();
  let word = $("#word").val();
  return check_word(word);
});

async function check_word(word) {
  word = word.toLowerCase();
  const response = await axios.get("/check-word", { params: { text: word } });
  if (response.data == "not-word") {
    window.alert("Word not valid!");
  }
  if (response.data == "not-on-board") {
    window.alert("Word is not playable!");
  }
  console.log(response);
  return response;
}

function table_data() {
  const tableData = [];
  for (let y = 0; y < 5; y++) {
    let letters = [];
    for (let x = 0; x < 5; x++) {
      let letter = $(`#${y}-${x}`).text();
      letters.push(letter);
    }
    tableData.push(letters);
  }
  console.log(tableData);
}
