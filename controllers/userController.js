/*const User = require("../models/Period");

const calculateMenstrualPhase = (lastPeriodDate) => {
    const cycleLength = 28;  // Assume average cycle length
    const ovulationDay = 14;

    const today = new Date();
    const lastPeriod = new Date(lastPeriodDate);
    const diffDays = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24)) % cycleLength;

    if (diffDays <= 5) return "Menstrual Phase";
    if (diffDays <= ovulationDay) return "Follicular Phase";
    if (diffDays <= ovulationDay + 5) return "Ovulation Phase";
    return "Luteal Phase";
};

exports.getMenstrualPhase = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);

        if (!user || !user.lastPeriodDate) {
            return res.status(400).json({ message: "Last period date not found. Please update your profile." });
        }

        const phase = calculateMenstrualPhase(user.lastPeriodDate);
        res.json({ phase });
    } catch (error) {
        res.status(500).json({ message: "Error calculating phase", error: error.message });
    }
};

exports.getNutritionRecommendation = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);

        if (!user || !user.lastPeriodDate) {
            return res.status(400).json({ message: "Last period date not found. Please update your profile." });
        }

        const phase = calculateMenstrualPhase(user.lastPeriodDate);

        const recommendations = {
            "Menstrual Phase": "Iron-rich foods (spinach, lentils), hydration, anti-inflammatory foods.",
            "Follicular Phase": "Protein, omega-3 (salmon, flaxseeds), complex carbs.",
            "Ovulation Phase": "Magnesium-rich foods (avocado, nuts), fiber, hydration.",
            "Luteal Phase": "Vitamin B6 (bananas, potatoes), low-sugar, high-protein diet."
        };

        res.json({ phase, nutrition: recommendations[phase] });
    } catch (error) {
        res.status(500).json({ message: "Error fetching nutrition data", error: error.message });
    }
};

exports.updateLastPeriodDate = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { lastPeriodDate } = req.body;

        if (!lastPeriodDate) {
            return res.status(400).json({ message: "Last period date is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.lastPeriodDate = new Date(lastPeriodDate);
        await user.save();

        res.json({ message: "Last period date updated successfully", lastPeriodDate: user.lastPeriodDate });
    } catch (error) {
        res.status(500).json({ message: "Error updating last period date", error: error.message });
    }
};
*/
