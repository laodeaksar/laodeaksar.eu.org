import { Children } from 'react';

import { CardBody, CardHeader, CardWrapper } from './Styles';
import { isHeaderElement } from './utils';
import type { CardComposition, CardProps } from './types';

function Card<T>(props: CardProps & CardComposition & T) {
  const { as: Component, children, glass, depth, title, ...rest } = props;

  const hasHeaderComponent = Children.toArray(children).some((child) =>
    isHeaderElement(child)
  );

  return (
    <CardWrapper as={Component} depth={depth} glass={glass} {...rest}>
      {hasHeaderComponent || !title ? null : <CardHeader>{title}</CardHeader>}
      {children}
    </CardWrapper>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.displayName = 'Card';

export default Card;
