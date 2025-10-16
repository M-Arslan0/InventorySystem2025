import ledgerBookModel from "../model/ledgerBookModel.js";

const ledgerEntryUtil = async (ledgerDebitEntry, ledgerCreditEntry, session) => {
  try {
    // 🔹 Always insert as an array + session
    const [ledgerBookEntry] = await ledgerBookModel.create([ledgerDebitEntry, ledgerCreditEntry], { session, ordered: true });
    if (!ledgerBookEntry) {
      throw new Error("Failed to create ledger entry");
    }

    return ledgerBookEntry; // ✅ return created entry
  } catch (error) {
    console.error("❌ Error in add ledger Entry:", error);
    throw error; // let the controller handle transaction rollback
  }
};

export default ledgerEntryUtil;
