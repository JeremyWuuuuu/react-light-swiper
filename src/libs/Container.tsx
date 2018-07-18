import * as React from 'React';
import Indicator from './Indicator';
import Throttle from 'lodash.throttle';
import './components.scss';

interface IContainerProps {
  indicator?: boolean;
  defaultEntrance?: number; // Define the default entrance index default 0
  totalPage: number; // Total scroll page
  onChangePage?: Function;
  direction?: 'vertical' | 'horizontal'; // default to 'vertical'
}

interface IContainerState {
  currentPage: number;
  direction: 'vertical' | 'horizontal';
}

export default class Container extends React.PureComponent<IContainerProps, IContainerState> {
  containerRef: React.RefObject<HTMLDivElement> = React.createRef();
  private inTransition: boolean = false;
  private containerHeight: number = 0;
  constructor(props: IContainerProps) {
    super(props);
    this.state = {
      currentPage: props.defaultEntrance ? props.defaultEntrance : 0,
      direction: props.direction ? props.direction : 'vertical' 
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
      this.forceUpdate();
    }, false);
  }

  componentDidMount() {
    this.containerHeight = this.containerRef.current ? this.containerRef.current.offsetHeight : 0;
  }

  private handleWheel = Throttle((event: React.WheelEvent) => {
    // Suspend the function when in middle of transition;
    if (this.inTransition) {
      return;
    }
    let { currentPage } = this.state;
    let {deltaX: x, deltaY: y} = event;
    switch (this.calculateDirection(x, y)) {
      case 'down':
      case 'right':
        if (currentPage < this.props.totalPage - 1) {
          this.setState({
            currentPage: currentPage+=1
          }, () => {
            this.inTransition = false;
          });
          this.inTransition = true;
        }
        break;
      case 'up':
      case 'left':
        if (currentPage <= this.state.currentPage && currentPage !== 0) {
          this.setState({
            currentPage: currentPage-=1
          }, () => {
            this.inTransition = false;
          });
          this.inTransition = true;
        }
        break;
      default:
        throw new Error('Unsupported direction')
    }
    this.props.onChangePage && this.props.onChangePage();
  }, 1000, {trailing: false});

  calculateDirection(x: number, y: number): string | null {
    if (this.state.direction === 'horizontal') {
      return x > 0 ? 'left' : 'right'
    } else if (this.state.direction === 'vertical') {
      return y > 0 ? 'down' : 'up'
    }
    return null;
  }
}