import chartOfAccountModel from "../model/chartOfAccountModel.js";

const chartOfAccountEntryUtil = async (accountData, session) => {
  try {
    // 🔹 Always insert as an array + session
    const [chartOfAccountEntry] = await chartOfAccountModel.create(
      [accountData],
      { session }
    );

    if (!chartOfAccountEntry) {
      throw new Error("Failed to create account entry");
    }

    return chartOfAccountEntry; // ✅ return created entry
  } catch (error) {
    console.error("❌ Error in add account Entry:", error);
    throw error; // let the controller handle transaction rollback
  }
};

export default chartOfAccountEntryUtil;
