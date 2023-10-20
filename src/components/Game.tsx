import { Stage, Container, Sprite, Text } from '@pixi/react';
import { HomeBase } from './HomeBase';

export function Game() {

    const stageProps = {
        width: window.innerWidth, 
        height: window.innerHeight, 
        options: {
            backgroundAlpha: 0, 
            antialias: true,
        }
    }
    const baseHeightPercentage = 0.175;
    const baseProps = {
        width: stageProps.width,
        height: stageProps.height * baseHeightPercentage,
        x: 0,
        y: stageProps.height * (1 - baseHeightPercentage),
    }

    return (

    <Stage {...stageProps } > 
        <HomeBase {...baseProps} />
    </Stage>

    )
}