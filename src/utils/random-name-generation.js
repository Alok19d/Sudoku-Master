
const gameNames = [
  'Shadow Quest', 'Pixel Raiders', 'Mystic Maze', 'Cyber Arena', 'Dragon Strike',
  'Neon Warriors', 'Galaxy Run', 'Rogue Legends', 'Turbo Racers', 'Battle Forge',
  'Phantom Knight', 'Quantum Dash', 'Skybound Saga', 'Inferno Quest', 'Mecha Mayhem'
];

function generateRandomNameAndUsername() {
  // Select a random name from the list
  const randomIndex = parseInt(Math.random()*15);
  const randomName = gameNames[randomIndex];

  // Generate a 4-digit random number
  const randomNumber = parseInt(Math.random()*100000);
  const randomUsername = randomName.split(' ').join('').toLowerCase() + randomNumber;

  return {fullname: randomName, username: randomUsername};
}

export{
  generateRandomNameAndUsername
}