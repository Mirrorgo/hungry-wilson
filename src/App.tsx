import { Divider, Stack, Typography, styled } from "@mui/material";
import backgroundImage from "./assets/background.png";
import monsterMeat from "./assets/monster_meat.png";

function App() {
  return (
    <>
      <Typography variant="h4" component="h2">
        烹饪锅
      </Typography>
      <Stack direction="row" spacing={2}>
        <Ingredient
          alt="The house from the offer."
          src={monsterMeat}
        ></Ingredient>
        <Ingredient></Ingredient>
        <Ingredient></Ingredient>
        <Ingredient></Ingredient>
      </Stack>
      <Typography variant="h4" component="h2">
        产物
      </Typography>
      <Divider />
      类型
    </>
  );
}

const Ingredient = styled("img")({
  background: `url(${backgroundImage})`,
  height: "68px",
  width: "68px",
});

export default App;
