import voucherModel from "../model/voucherModel.js";

const voucherEntryUtil = async (voucherData, session) => {
  try {
    // 🔹 Always insert as an array + session
    const [voucherEntry] = await voucherModel.create(
      [voucherData],
      { session }
    );

    if (!voucherEntry) {
      throw new Error("Failed to create ledger entry");
    }

    return voucherEntry; // ✅ return created entry

  } catch (error) {
    console.error("❌ Error in add ledger Entry:", error);
    throw error; // let the controller handle transaction rollback
  }
};

export default voucherEntryUtil;
