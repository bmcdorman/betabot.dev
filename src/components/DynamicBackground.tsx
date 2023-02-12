import * as React from 'react';

import { styled } from 'styletron-react';
import Triangle from '@/math/Triangle';
import Vector2 from '@/math/Vector2';
import Vector3 from '@/math/Vector3';
import resizeListener, { ResizeListener } from '@/ui/util/resizeListener';
import Hsl from '@/math/Hsl';
import Animation from '@/animation/Animation';
import SineInOut from '@/animation/SineInOut';

const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  '@supports(-webkit-fill-available)': {
    minHeight: '-webkit-fill-available',
  },
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,
});

const InnerContainer = styled('div', {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
});

const Svg = styled('svg', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});


const BASE_HSL = new Hsl(281, 1, 0.22);

const ANIMATION_DURATION = 5000;

const PATH_COLORS = {
  '/projects': new Hsl(281 + 30, 1, 0.22),
  '/about': new Hsl(281 + 60, 1, 0.22),
  '/contact': new Hsl(281 + 90, 1, 0.22)
};

const pathColor = (path: string) => {
  return PATH_COLORS[path] || BASE_HSL;
};


class DynamicBackground extends React.PureComponent<DynamicBackground.Props, DynamicBackground.State> {
  constructor(props: DynamicBackground.Props) {
    super(props);

    const vertices: Vector2[] = [
      // top left triangle
      new Vector2(0, 0),
      new Vector2(0, 1),
      new Vector2(1, 0),

      // bottom right triangle
      new Vector2(1, 0),
      new Vector2(0, 1),
      new Vector2(1, 1),
    ];

    let triangles: Triangle<number>[] = [{
      a: 0,
      b: 1,
      c: 2,
    }, {
      a: 3,
      b: 4,
      c: 5,
    }];

    // subdivide triangles
    const subdivide = (vertices: Vector2[], triangles: Triangle<number>[]): Triangle<number>[] => {
      const ret: Triangle<number>[] = [];
      for (const t of triangles) {
        const vA = vertices[t.a].midpoint(vertices[t.b]);
        const vB = vertices[t.b].midpoint(vertices[t.c]);
        const vC = vertices[t.c].midpoint(vertices[t.a]);

        const a = vertices.length;
        const b = a + 1;
        const c = a + 2;

        vertices.push(vA, vB, vC);

        ret.push({ a: t.a, b: a, c });
        ret.push({ a, b: t.b, c: b });
        ret.push({ a: c, b, c: t.c });
        ret.push({ a, b, c });
      }

      return ret;
    };

    const subdivisions = 3;
    for (let i = 0; i < subdivisions; i++) {
      triangles = subdivide(vertices, triangles);
    }

    // merge vertices within a certain epsilon
    const epsilon = 0.0001;
    const mergedTriangles: Triangle<number>[] = [];
    for (const t of triangles) {
      const a = vertices.findIndex(v => v.distance(vertices[t.a]) < epsilon);
      const b = vertices.findIndex(v => v.distance(vertices[t.b]) < epsilon);
      const c = vertices.findIndex(v => v.distance(vertices[t.c]) < epsilon);

      mergedTriangles.push({ a, b, c });
    }

    // Remove duplicate vertices
    const uniqueVertices: Vector2[] = [];
    const uniqueTriangles: Triangle<number>[] = [];

    for (const t of mergedTriangles) {
      const a = uniqueVertices.findIndex(v => v.distance(vertices[t.a]) < epsilon);
      const b = uniqueVertices.findIndex(v => v.distance(vertices[t.b]) < epsilon);
      const c = uniqueVertices.findIndex(v => v.distance(vertices[t.c]) < epsilon);

      if (a === -1) {
        uniqueVertices.push(vertices[t.a]);
        t.a = uniqueVertices.length - 1;
      } else {
        t.a = a;
      }

      if (b === -1) {
        uniqueVertices.push(vertices[t.b]);
        t.b = uniqueVertices.length - 1;
      } else {
        t.b = b;
      }

      if (c === -1) {
        uniqueVertices.push(vertices[t.c]);
        t.c = uniqueVertices.length - 1;
      } else {
        t.c = c;
      }

      uniqueTriangles.push(t);
    }


    

    const startVertices = uniqueVertices.map(({ x, y }) => new Vector3(x, y, Math.random()));

    

    const jiggle = 1 / (2 ** (subdivisions + 1)) * 0.5;

    const currentVertices = [ ...startVertices ];
    
    // "jiggle" the interior vertices
    for (let i = 0; i < currentVertices.length; i++) {
      const { x, y, z } = currentVertices[i];
      if (x === 0 || x === 1 || y === 0 || y === 1) continue;

      // Determine the smallest safe jiggle distance based on subdivision level
      

      currentVertices[i] = new Vector3(
        x + (Math.random() * jiggle * 2) - jiggle,
        y + (Math.random() * jiggle * 2) - jiggle,
        z
      );
    }

    const color = pathColor(window.location.pathname);
    const colorAnimation: Animation<Hsl, SineInOut<Hsl>> = new Animation(new SineInOut(color, color), 1);

    this.state = {
      startVertices,
      currentVertices,
      velocities: uniqueVertices.map(() => new Vector3(
        Math.random() * 0.01 - 0.005,
        Math.random() * 0.01 - 0.005,
        Math.random() * 0.05 - 0.025,
      )),
      maxDelta: new Vector3(jiggle, jiggle, 1),
      triangles: uniqueTriangles,
      size: Vector2.ZERO,
      currentPath: window.location.pathname,
      colorAnimation,
    };
  }
  
  private listener_ = resizeListener(size => this.setState({ size }));

  componentDidMount() {
    this.tickHandle_ = window.requestAnimationFrame(this.tick_);
  }

  componentWillUnmount() {
    this.listener_.disconnect();
    window.cancelAnimationFrame(this.tickHandle_);
  }

  private ref_: HTMLDivElement;
  private bindContainerRef_ = (ref: HTMLDivElement) => {
    if (this.ref_) this.listener_.unobserve(this.ref_);
    this.ref_ = ref;
    if (this.ref_) this.listener_.observe(this.ref_);
  }

  private tickHandle_: number;
  private lastTick_ = Date.now();
  private tick_ = () => {
    const now = Date.now();
    const dt = Math.min((now - this.lastTick_) / 1000, 0.1);
    this.lastTick_ = now;

    const { startVertices, currentVertices, maxDelta, velocities, colorAnimation, currentPath } = this.state;

    // Move current vertices by velocities, bouncing at maxDelta
    let nextCurrentVertices = [ ...currentVertices ];
    let nextVelocities = [ ...velocities ];

    for (let i = 0; i < currentVertices.length; i++) {
      if (currentVertices[i].x === 0 || currentVertices[i].y === 0) continue;
      if (currentVertices[i].x === 1 || currentVertices[i].y === 1) continue;
      
      const delta = nextVelocities[i].multiplyScalar(dt);
      nextCurrentVertices[i] = currentVertices[i].add(delta);

      if (Math.abs(startVertices[i].x - nextCurrentVertices[i].x) > maxDelta.x) {
        nextVelocities[i].x *= -1;
      }
      if (Math.abs(startVertices[i].y - nextCurrentVertices[i].y) > maxDelta.y) {
        nextVelocities[i].y *= -1;
      }
      if (Math.abs(startVertices[i].z - nextCurrentVertices[i].z) > maxDelta.z) {
        nextVelocities[i].z *= -1;
      }
    }

    let nextColorAnimation = colorAnimation;

    const path = window.location.pathname;
    if (path !== currentPath) {
      const color = pathColor(path);
      nextColorAnimation = new Animation(new SineInOut(colorAnimation.value, color), ANIMATION_DURATION);
    }

    this.setState({
      currentVertices: nextCurrentVertices,
      velocities: nextVelocities,
      colorAnimation: nextColorAnimation,
      currentPath: path,
    });

    this.tickHandle_ = window.requestAnimationFrame(this.tick_);
  };
  
  render() {
    const { state } = this;
    const { currentVertices, triangles, size, colorAnimation } = state;
    const { x, y } = size;
    return (
      <Container>
        <InnerContainer ref={this.bindContainerRef_}>
          <Svg viewBox={`0 0 ${x} ${y}`} preserveAspectRatio="none">
            {triangles.map(({ a, b, c }, i) => {
              const size3 = { x, y, z: Math.max(x, y)};

              const vA = currentVertices[a].multiply(size3);
              const vB = currentVertices[b].multiply(size3);
              const vC = currentVertices[c].multiply(size3);
              
              // compute normal
              const vAB = vB.subtract(vA);
              const vAC = vC.subtract(vA);
              const normal = vAB.cross(vAC).normalize();


              const rgb = colorAnimation.value.toRgb().toVector3().add(normal.multiplyScalar(10));

              const red = Math.round(Math.max(0, Math.min(255, rgb.x)));
              const green = Math.round(Math.max(0, Math.min(255, rgb.y)));
              const blue = Math.round(Math.max(0, Math.min(255, rgb.z)));

              const aX = Math.round(vA.x * 10) / 10;
              const aY = Math.round(vA.y * 10) / 10;

              const bX = Math.round(vB.x * 10) / 10;
              const bY = Math.round(vB.y * 10) / 10;

              const cX = Math.round(vC.x * 10) / 10;
              const cY = Math.round(vC.y * 10) / 10;

              return (
                <polygon
                  key={i}
                  points={`${aX},${aY} ${bX},${bY} ${cX},${cY}`}
                  fill={`rgb(${red}, ${green}, ${blue})`}
                  stroke={`rgb(${red}, ${green}, ${blue})`}
                />
              );
            })}
          </Svg>
        </InnerContainer>
      </Container>
    );
  }
}

namespace DynamicBackground {
  

  export interface Props {
    
  }

  export interface State {
    startVertices: Vector3[];
    currentVertices: Vector3[];
    maxDelta: Vector3;
    velocities: Vector3[];
    triangles: Triangle<number>[];
    size: Vector2;
    currentPath: string;
    colorAnimation: Animation<Hsl, SineInOut<Hsl>>;
  }
}

export default DynamicBackground;

