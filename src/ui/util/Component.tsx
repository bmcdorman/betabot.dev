import * as React from 'react';

interface Component<P extends {}> {
  component: React.ComponentType<P>;
  props?: Partial<P>;
}

namespace Component {
  export const create = <P extends {}>(component: React.ComponentType<P>, props?: Partial<P>): Component<P> => ({
    component,
    props,
  });

  export const render = <P extends {}>(component: Component<P>, extraProps?: Partial<P>) => {
    const { component: Component, props } = component;
    return <Component {...(props || {}) as any} {...(extraProps || {}) as any} />;
  };

}

export default Component;