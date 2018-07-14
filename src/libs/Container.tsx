import * as react from 'React';

interface IContainerProps {

}

interface IContainerState {

}

export default class Container extends react.PureComponent<IContainerProps, IContainerState> {
  constructor(props: IContainerProps) {
    super(props);
  }

  render() {
    return (
      <>
      I am the Container;
      </>
    )
  }
}