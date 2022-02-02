// CARS
let cars = document.querySelectorAll(
  ".content.shadowed.item.d-flex.flex-row.justify-content-around.cursor"
);

const raceTurn = async function () {
  // Start Race
  const raceBtn = document.querySelector(
    "#root > section > section > div > div > div > div > div.selected.content.mb-1.text-center.p-3.shadowed > div > div.mt-3 > div.custom-btn.btn-green"
  );
  raceBtn.click();

  // Wait for Check Result button
  while (
    !document.querySelector(
      "#root > section > section > div > div > div > div > div > div > div.mt-3 > div"
    ) ||
    document.querySelector(
      "#root > section > section > div > div > div > div > div > div > div.mt-3 > div"
    ).textContent == "START RACE!"
  ) {
    await new Promise((r) => setTimeout(r, Math.floor(Math.random() * 1000)));
  }

  // Check Result
  const resultButton = document.querySelector(
    "#root > section > section > div > div > div > div > div > div > div.mt-3 > div"
  );
  console.log(resultButton.textContent);
  resultButton.click();

  // Wait for Claim button
  while (
    !document.querySelector(
      "body > div:nth-child(7) > div > div.ant-modal-wrap.ant-modal-confirm-centered.ant-modal-centered > div > div.ant-modal-content > div > div > div.ant-modal-confirm-btns > button"
    )
  ) {
    await new Promise((r) => setTimeout(r, Math.floor(Math.random() * 1000)));
  }

  // Claim Reward
  const claimButton = document.querySelector(
    "body > div:nth-child(7) > div > div.ant-modal-wrap.ant-modal-confirm-centered.ant-modal-centered > div > div.ant-modal-content > div > div > div.ant-modal-confirm-btns > button"
  );
  await new Promise((r) => setTimeout(r, Math.floor(Math.random() * 1000)));
  claimButton.click();
};

const raceCar = async function (carIndex, racesLeft) {
  for (var i = 0; i < racesLeft; i++) {
    await raceTurn();

    // Select same car to race again if available
    if (i < racesLeft) {
      // Wait for possible car rerender
      await new Promise((r) => setTimeout(r, 500));

      // Update cars reference
      cars = document.querySelectorAll(
        ".content.shadowed.item.d-flex.flex-row.justify-content-around.cursor"
      );

      // Select Same car again
      cars[carIndex].click();

      // Wait for Car Selection
      await new Promise((r) => setTimeout(r, 500));
    }
  }
};

for (const [carIndex] of cars.entries()) {
  // Wait for possible car rerender
  await new Promise((r) => setTimeout(r, 500));

  // Update cars reference, it is destroyed between races, so we relly on index here
  cars = document.querySelectorAll(
    ".content.shadowed.item.d-flex.flex-row.justify-content-around.cursor"
  );

  // Select Car
  cars[carIndex].click();

  // Wait for Car Selection
  await new Promise((r) => setTimeout(r, 500));

  // Verify if the car can race
  const raceCounterInfo = document.querySelector(
    "#root > section > section > div > div > div > div > div.selected.content.mb-1.text-center.p-3.shadowed > div > div.d-flex.d-row > div:nth-child(2) > div:nth-child(4)"
  ).textContent;

  const barIndex = raceCounterInfo.indexOf("/");

  const totalRaces = parseInt(
    raceCounterInfo.slice(barIndex + 1, barIndex + 3)
  );
  const usedRaces = parseInt(raceCounterInfo.slice(barIndex - 2, barIndex));
  const racesLeft = totalRaces - usedRaces;

  const expired = document
    .querySelector(
      "#root > section > section > div > div > div > div > div.selected.content.mb-1.text-center.p-3.shadowed"
    )
    .textContent.includes("Expired");

  if (racesLeft && !expired) {
    // Start Race
    await raceCar(carIndex, racesLeft);
  }
}
