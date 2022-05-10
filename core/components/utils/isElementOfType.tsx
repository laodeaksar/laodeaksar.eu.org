export function isElementOfType<P = {}>(
  element: unknown,
  ComponentType: React.ComponentType<P>
): element is React.ReactElement<P> {
  const reactElement = element as React.ReactElement;
   
    // @ts-ignore
    return reactElement?.type?.displayName === ComponentType.displayName
  );
}
