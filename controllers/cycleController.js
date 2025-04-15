// cycleController.js
const Cycle = require("../models/Cycle");

async function getNextPeriodAndPhase(userId) {
  try {
    const cycleData = await Cycle.findOne({ userId }).sort({ _id: -1 });

    if (!cycleData) return null;

    const nextPeriod = calculateNextPeriod(cycleData.periods, cycleData.cycleLength);
    const currentPhase = determineCurrentPhase(nextPeriod, cycleData.cycleLength);

    return { nextPeriod, currentPhase };
  } catch (error ) {
    throw new Error("Error retrieving cycle data");
  }
}

module.exports = { getNextPeriodAndPhase };
