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
  if (bestOf >= MAX_BEST_OF || bestOf < 1){
    alert("Fjöldi leikja utan marka");
    return false;
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

console.assert(isValidBestOf(1) === true, '1 er valid best of');
console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
console.assert(isValidBestOf(9) === true, '9 er valid best of');

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
  else{
    return "Óþekkt";
  }
}
console.assert(playAsText('1') === 'Skæri', '1 táknar skæri');
console.assert(playAsText('2') === 'Blað', '2 táknar blað');
console.assert(playAsText('3') === 'Steinn', '3 táknar steinn');
console.assert(playAsText('foo') === 'Óþekkt', 'Annað er óþekkt');

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
  // TODO útfæra
  if(player === "1" && computer === "2" || 
    player === "2" && computer === "3" ||
    player === "3" && computer === "1"){
      return 1;
    }
  else if(player === "2" && computer === "1" || 
      player === "3" && computer === "2" ||
      player === "1" && computer === "3"){
        return -1;
    }
  else if (player === "2" && computer === "2" || 
      player === "3" && computer === "3" ||
      player === "1" && computer === "1"){
    return 0;
  }
 
}
console.assert(checkGame('1', '2') === 1, 'Skæri vinnur blað');
console.assert(checkGame('2', '3') === 1, 'Blað vinnur stein');
console.assert(checkGame('3', '1') === 1, 'Steinn vinnur skæri');
console.assert(checkGame('1', '1') === 0, 'Skæri og skæri eru jafntefli');
console.assert(checkGame('1', '3') === -1, 'Skæri tapar fyrir stein');

/**
 * Spilar einn leik.
 * @return {boolean} -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function round() {
  // TODO útfæra
  // 1. Spyrja um hvað spilað, ef cancel, hætta
  let player = prompt("Skæri (1), steinn (2), blað(3)?");
  
  if (player === null){
    return null;
  }
  
  // 2. Ef ógilt, tölva vinnur
  // 3. Velja gildi fyrir tölvu með `Math.floor(Math.random() * 3) + 1` sem skilar heiltölu á [1, 3]
  let computer = toString(Math.floor(Math.random() * 3) + 1);
  // 4. Nota `checkGame()` til að finna hver vann
  // 5. Birta hver vann
  if (player > 3 || player < 1){
    return -1;
  }

  let roundResult = checkGame(player, computer);

  if (roundResult === 1){
    confirm(`Spilari valdi ${playAsText(player)} og tölvan valdi ${playAsText(computer)}. Spilari vann!`)
    return 1;
  }
  else if (roundResult === -1){
    confirm(`Spilari valdi ${playAsText(player)} og tölvan valdi ${playAsText(computer)}. Tölvan vann :(`);
    return 1;
  }
  else if(roundResult === 0){
    confirm(`Spilari valdi ${playAsText(player)} og tölvan valdi ${playAsText(computer)}. Jafntefli!`);
    return 0;
  }
  // 6. Skila hver vann
  //return checkGame(player, computer);
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Spilar leik og bætir útkomu (sigur eða tap) við í viðeigandi global breytu.
 */
function play() {

  const playerRounds = 0;
  const computerRounds = 0;
  
  // TODO útfæra
  // 1. Spyrja um fjölda leikja
  const bestOf = prompt("Besta af?");
  
  // 2. Staðfesta að fjöldi leikja sé gilt gildi
  // 3. Keyra fjölda leikja og spila umferð þar til sigurvegari er krýndur
  if (isValidBestOf(bestOf)){
    while (playerRounds < (bestOf/2+1) && computerRounds < (bestOf/2+1)){
      round();
      if (round() === 1) playerRounds++;
      else if (round() === -1) computerRounds++;
    }
  }
  
  
  // 4. Birta hvort spilari eða tölva vann
  if(playerRounds = (bestOf/2+1)){
    confirm("Spilari vann leikinn!");
    wins++;
  }
  else{
    confirm("Tölvan vann leikinn :(");
    losses++
  }
  
  playerRounds = 0;
  computerRounds = 0;

  play();

}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Birtir stöðu spilara.
 */
function games() {
  // TODO útfæra
  confirm(`Þú hefur spilað ${wins}${losses} leiki.\n Þú hefur unnið ${wins}, eða ${100*(wins/(wins+losses)).toFixed(2)} af heild.`);
}
// Hér getum við ekki skrifað test þar sem fallið les úr global state
