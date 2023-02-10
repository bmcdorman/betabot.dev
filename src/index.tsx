import * as React from 'react';
import { createRoot } from 'react-dom/client';

import Button from '@/ui/primitives/Button';
import Svg from '@/ui/primitives/Svg';
import Vector2 from '@/math/Vector2';
import { Client } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import Root from './components/Root';

import { BrowserRouter } from "react-router-dom";

const draw = (size: Vector2, ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, size.x, size.y);
};

const engine = new Client({
  prefix: '_st_',
});

const root = createRoot(document.getElementById('root'));

root.render(
  <StyletronProvider value={engine}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StyletronProvider>
);