import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';
import rock from '../assets/rock.png';
import paper from '../assets/paper.png';
import scissors from '../assets/scissors.png';

export const PixiTest = () =>
{
  const blurFilter = useMemo(() => new BlurFilter(4), []);
const stageProps = {
    width: window.innerWidth, 
    height: window.innerHeight, 
    options: {
        backgroundAlpha: 0, 
        antialias: true,
    }
}
  return (
    <Stage {...stageProps} >
        <Sprite
        image={rock}
        anchor={{ x: 0.5,y: 0.5 }}
        x={10}
        y={10}
        width={30}
        height={30}
      />

<Sprite
        image={paper}
        anchor={{ x: 0.5,y: 0.5 }}
        x={20}
        y={20}
        width={30}
        height={30}
      />

<Sprite
        image={scissors}
        anchor={{ x: 0.5,y: 0.5 }}
        x={30}
        y={30}
        width={30}
        height={30}
      />

      <Container x={400} y={330}>
        <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]} />
      </Container>
    </Stage>
  );
};