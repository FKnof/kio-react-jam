import * as PIXI from "pixi.js";
import { characterAssets } from "../assets/AssetLoader/Character";
import { environmentAssets } from "../assets/AssetLoader/Environment";
import { backgroundAssets } from "../assets/AssetLoader/Background";
import { healthbarAssets } from "../assets/AssetLoader/Healthbar";
import { collisionAssets } from "../assets/AssetLoader/collisions";
export async function loadTextures() {
  try {
    PIXI.Assets.addBundle("characters", characterAssets);
    PIXI.Assets.addBundle("environment", environmentAssets);
    PIXI.Assets.addBundle("background", backgroundAssets);
    PIXI.Assets.addBundle("healthbar", healthbarAssets);
    PIXI.Assets.addBundle("collisions", collisionAssets);
    // Add more bundles here...

    const characterTextures = await PIXI.Assets.loadBundle("characters");
    const environmentTextures = await PIXI.Assets.loadBundle("environment");
    const backgroundTextures = await PIXI.Assets.loadBundle("background");
    const healthbarTextures = await PIXI.Assets.loadBundle("healthbar");
    const collisionTextures = await PIXI.Assets.loadBundle("collisions");
    // Load more textures here...

    return {
      characterTextures,
      environmentTextures,
      backgroundTextures,
      healthbarTextures,
      collisionTextures,
      // Add more textures here...
    };
  } catch (err) {
    console.log(err);
    return {};
  }
}
