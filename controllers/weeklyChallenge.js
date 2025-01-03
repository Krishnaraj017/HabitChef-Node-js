import { where } from "sequelize";

export const getActiveChallenges = async (req, res) => {
  try {
    const today = new Date();
    const activeContests = await WeeklyContest.findAll({
      where: {
        startDate: {
          [Op.lte]: today,
        },
        endDate: {
          [Op.gte]: today,
        },
        attribure: [
          "id",
          "name",
          "startDate",
          "endDate",
          "description",
          "image",
        ],
      },
    });
    res.status(200).json({
      message: "Active contests fetched successfully",
      WeeklyContests: activeContests,
    });
  } catch (e) {
    console.error("Error fetching active contests:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createClan = async (req, res) => {
  const { clanName, createBy } = req.body;
  if (!clanName || !createBy) {
    return res
      .status(400)
      .json({ message: "Clan name and creator ID are required" });
  }
  try {
    const existingClan = await clan.findOne({ where: { name: clanName } });
    if (existingClan) {
      return res.status(400).json({ message: "Clan name already exists" });
    }
    const clan = await clan.create({ name: clanName, createBy });
    res.status(201).json({
      message: "Clan created successfully",
      clan,
    });
  } catch (e) {
    console.error("Error creating clan:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const joinClan = async (req, res) => {
  const { userId, clanId } = req.body;

  if (!userId || !clanId) {
    return res
      .status(400)
      .json({ message: "User ID and Clan ID are required" });
  }

  try {
    // Check if the user is already in the clan
    const existingMember = await ClanMember.findOne({
      where: { userId, clanId },
    });
    if (existingMember) {
      return res
        .status(400)
        .json({ message: "User is already a member of this clan" });
    }

    // Add user to the clan
    const clanMember = await ClanMember.create({ userId, clanId });

    res.status(201).json({
      message: "Joined clan successfully",
      member: clanMember,
    });
  } catch (error) {
    console.error("Error joining clan:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
