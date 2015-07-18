export default function context(newContexts) {
  return function contextDecorator(Component) {
    if (!Component.contextTypes) {
      Component.contextTypes = {};
    }

    Component.contextTypes = { ...Component.contextTypes, ...newContexts };

    return Component;
  };
}
