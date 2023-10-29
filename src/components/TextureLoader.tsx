import * as PIXI from "pixi.js";
import { characterAssets } from "../assets/AssetLoader/Character";
import { environmentAssets } from "../assets/AssetLoader/Environment";
import { backgroundAssets } from "../assets/AssetLoader/Background";
import { healthbarAssets } from "../assets/AssetLoader/Healthbar";
import { collisionAssets } from "../assets/AssetLoader/collisions";
import { actionLineAssets } from "../assets/AssetLoader/ActionLines";
export async function loadTextures() {
  try {
    PIXI.Assets.addBundle("characters", characterAssets);
    PIXI.Assets.addBundle("environment", environmentAssets);
    PIXI.Assets.addBundle("background", backgroundAssets);
    PIXI.Assets.addBundle("healthbar", healthbarAssets);
    PIXI.Assets.addBundle("collisions", collisionAssets);
    PIXI.Assets.addBundle("actionlines", actionLineAssets);
    // Add more bundles here...

    const characterTextures = await PIXI.Assets.loadBundle("characters");
    const environmentTextures = await PIXI.Assets.loadBundle("environment");
    const backgroundTextures = await PIXI.Assets.loadBundle("background");
    const healthbarTextures = await PIXI.Assets.loadBundle("healthbar");
    const collisionTextures = await PIXI.Assets.loadBundle("collisions");
    const actionLinesTextures = await PIXI.Assets.loadBundle("actionlines");
    // Load more textures here...

    return {
      characterTextures,
      environmentTextures,
      backgroundTextures,
      healthbarTextures,
      collisionTextures,
      actionLinesTextures,
      // Add more textures here...
    };
  } catch (err) {
    console.log(err);
    return {};
  }
}
