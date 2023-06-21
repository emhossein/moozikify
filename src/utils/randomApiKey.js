import Chance from "chance";

const randomApiKey = () => {
  const chance = new Chance();
  return chance.pickone([
    process.env.RAPID_KEY1,
    process.env.RAPID_KEY2,
    process.env.RAPID_KEY3,
    process.env.RAPID_KEY4,
  ]);
};

export default randomApiKey;
