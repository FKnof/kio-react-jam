import * as PIXI from "pixi.js";
import { characterAssets } from "../assets/AssetLoader/Character";
import { environmentAssets } from "../assets/AssetLoader/Environment";
import { backgroundAssets } from "../assets/AssetLoader/Background";
import { healthbarAssets } from "../assets/AssetLoader/Healthbar";
import { collisionAssets } from "../assets/AssetLoader/collisions";
import { actionLineAssets } from "../assets/AssetLoader/ActionLines";

export const textures = {
  characterTextures: { ...characterAssets },
  environmentTextures: { ...environmentAssets },
  backgroundTextures: { ...backgroundAssets },
  healthbarTextures: { ...healthbarAssets },
  collisionTextures: { ...collisionAssets },
  actionLineTextures: { ...actionLineAssets },
};
