import * as React from 'React';
import Indicator from './Indicator';
import Throttle from 'lodash.throttle';
import './components.scss';

interface IContainerProps {
  indicator?: boolean;
  defaultEntrance?: number; // Define the default entrance index default 0
  totalPage: number; // Total scroll page
  onChangePage?: Function;
}

interface IContainerState {
  currentPage: number;
}

export default class Container extends React.PureComponent<IContainerProps, IContainerState> {
  containerRef: React.RefObject<HTMLDivElement> = React.createRef();
  private containerHeight: number = 0;
  constructor(props: IContainerProps) {
    super(props);
    this.state = {
      currentPage: props.defaultEntrance ? props.defaultEntrance : 0
    }

    this.initResizeResponder();
    this.handleWheel = this.handleWheel.bind(this);
  }

  render() {
    let { indicator } = this.props;
    return (
      <div className="RLS-root-container"
        onWheel={this.handleWheel}
        ref={this.containerRef}
      >
        <div className="RLS-swipe-container" style={{
          top: `-${this.containerHeight * this.state.currentPage}px`
        }}>
          {this.props.children}
          {indicator ? <Indicator /> : null}
        </div>
      </div>
    )
  }

  initResizeResponder(): void {
    window.addEventListener('resize', () => {
      this.containerHeight = this.containerRef.current ? this.containerRef.current.offsetHeight : 0;
    }, false);
  }

  componentDidMount() {
    this.containerHeight = this.containerRef.current ? this.containerRef.current.offsetHeight : 0;
  }

  private handleWheel = Throttle((event: React.WheelEvent) => {
    let { currentPage } = this.state;
    switch (this.calculateDirection()) {
      case 'down':
        if (currentPage < this.props.totalPage - 1) {
          this.setState({
            currentPage: currentPage++
          });
        }
      case 'up':
        if (currentPage !== 0) {
          this.setState({
            currentPage: currentPage--
          });
        }
    }
  }, 500, {trailing: false});

  calculateDirection(): string {
    return 'down';
  }
}