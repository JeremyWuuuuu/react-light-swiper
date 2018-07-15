import * as React from 'React';

interface IIndicatorProps { };

interface IIndicatorState { };

export default class Indicator extends React.PureComponent<IIndicatorProps, IIndicatorState> {
  constructor(props: IIndicatorProps) {
    super(props);
  }

  render() {
    return (
      <>
        I am the indicator
      </>
    )
  }
}