/**
 * Skæri, blað, steinn.
 * Spilað gegnum console.
 */

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Global breyta sem heldur utan um heildar sigra */
let wins = 0;

/** Global breyta sem heldur utan um heildar töp */
let losses = 0;

/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
function isValidBestOf(bestOf) {
  if (bestOf === null){
    console.error("Spilari hætti við")
    process.exit(0);
  }
  else if (bestOf >= MAX_BEST_OF || bestOf < 1){
    console.error("Fjöldi leikja utan marka");
    process.exit(0);
  }
  else{
    if (bestOf % 2 === 0){
      alert(bestOf + " er ekki gildur best of");
      return false;
    }
    else{
      return true;
    }
    }
  }

function playAsText(play) {
  // TODO útfæra
  if (play === "1"){
    return "skæri";
  }
  else if (play === "2"){
    return "steinn";
  }
  else if (play === "3"){
    return "blað";
  }
  else if (play === null){
   process.exit(0);
  }
  else{
    return "Óþekkt";
  }
}

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
  // TODO útfæra
  if(player === '1' && computer === '2' || 
      player === '2' && computer === '3' ||
      player === '3' && computer === '1'){
      return 1;
    }
  else if(player === '2' && computer === '1' || 
      player === '3' && computer === '2' ||
      player === '1' && computer === '3'){
        return -1;
    }
  else if (player === '2' && computer === '2' || 
      player === '3' && computer === '3' ||
      player === '1' && computer === '1'){
    return 0;
  }
 
}

/**
 * Spilar einn leik.
 * @return {boolean} -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function round() {
  // 1. Spyrja um hvað spilað, ef cancel, hætta
  const player = prompt("Skæri (1), steinn (2), blað(3)?");
  console.log("input:" + player);
  
  if (player == null){
    process.exit(0);
  }
  else if (playAsText(player) === "Óþekkt"){
    return -1;
  }
  
  // 2. Ef ógilt, tölva vinnur
  // 3. Velja gildi fyrir tölvu með `Math.floor(Math.random() * 3) + 1` sem skilar heiltölu á [1, 3]
  const computer = (Math.floor(Math.random() * 3) + 1).toString();
  // 4. Nota `checkGame()` til að finna hver vann
  // 5. Birta hver vann

  let roundResult = checkGame(player, computer);

  if (roundResult === 1){
    confirm(`Spilari valdi ${playAsText(player)} og tölvan valdi ${playAsText(computer)}. Spilari vann!`)
  }
  else if (roundResult === -1){
    confirm(`Spilari valdi ${playAsText(player)} og tölvan valdi ${playAsText(computer)}. Tölvan vann :(`);
  }
  else if(roundResult === 0){
    confirm(`Spilari valdi ${playAsText(player)} og tölvan valdi ${playAsText(computer)}. Jafntefli!`);
  }
  // 6. Skila hver vann
  return roundResult;
}

/**
 * Spilar leik og bætir útkomu (sigur eða tap) við í viðeigandi global breytu.
 */
function play() {

  let playerRounds = 0;
  let computerRounds = 0;
  
  // 1. Spyrja um fjölda leikja
  const bestOf = prompt("Besta af?");
  
  // 2. Staðfesta að fjöldi leikja sé gilt gildi
  // 3. Keyra fjölda leikja og spila umferð þar til sigurvegari er krýndur
  if (isValidBestOf(bestOf)){
    while (playerRounds < Math.floor((bestOf/2+1)) && computerRounds < Math.floor((bestOf/2+1))){
      const result = round();
      if (result === 1){ 
        playerRounds++;
      }
      else if (result === -1){ 
        computerRounds++;
      }
      console.log("spilar:" + playerRounds);
      console.log("computer:" + computerRounds);
    }
  }
  
  // 4. Birta hvort spilari eða tölva vann
  if(playerRounds >= Math.floor((bestOf/2+1))){
    confirm("Spilari vann leikinn!");
    wins++;
  }
  else{
    confirm("Tölvan vann leikinn :(");
    losses++
  }
  
  playerRounds = 0;
  computerRounds = 0;
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Birtir stöðu spilara.
 */
function games() {
  if ((wins+losses) > 0){
  confirm(`Þú hefur spilað ${wins + losses} leiki.\n Þú hefur unnið ${wins}, eða ${100*(wins/(wins+losses)).toFixed(2)}% af heild.`);
}
else confirm("Þú hefur ekki spilað leik");
}
// Hér getum við ekki skrifað test þar sem fallið les úr global state
