const construct = <T extends { type: unknown }>(type: T['type']) => (params: Omit<T, 'type'>): T => ({
  type,
  ...params,
}) as T;

export default construct;