export const getMasterData = {
  defaultLanguage: "en",
  languageDescription: {
    default: "en",
    data: [
      { lang: "english", code: "en", description: "" },
      { lang: "franch", code: "fr", description: "" },
    ],
  },
  plan: {
    type: [
      { name: "Plan", code: "01" },
      { name: "Scheme", code: "02" },
    ],
    products: [
      { code: "10", name: "Motor" },
      { code: "20", name: "Fire" },
      { code: "30", name: "Marine" },
      { code: "40", name: "Engineering" },
      { code: "50", name: "Miscellaneous and Accident" },
      { code: "60", name: "Liability" },
      { code: "70", name: "Bonds" },
      { code: "80", name: "Aviation" },
      { code: "90", name: "Package" },
      { code: "91", name: "Agriculture" },
    ],
  },
};

