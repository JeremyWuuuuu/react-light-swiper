import * as react from 'React';

interface IDotProps { };

interface IDotState { };

export default class Dot extends react.PureComponent<IDotProps, IDotState> {
  constructor(props: IDotProps) {
    super(props);
  }

  render() {
    return (
      <div>
        I am the dot component
      </div>
    )
  }
}