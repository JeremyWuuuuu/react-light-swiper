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
  offset: number;
}

export default class Container extends React.PureComponent<IContainerProps, IContainerState> {
  containerRef: React.RefObject<HTMLDivElement> = React.createRef();
  private inTransition: boolean = false;
  private containerHeight: number = 0;
  constructor(props: IContainerProps) {
    super(props);

    this.state = {
      currentPage: props.defaultEntrance ? props.defaultEntrance : 0,
      direction: props.direction ? props.direction : 'vertical',
      offset: 0
    }

    this.initResizeResponder();
    this.handleWheel = this.handleWheel.bind(this);
  }

  componentDidMount() {
    this.containerHeight = this.containerRef.current ? this.containerRef.current.offsetHeight : 0;
    this.setState({
      offset: this.containerHeight * this.state.currentPage
    });
  }

  render() {
    let { indicator } = this.props;
    return (
      <div className="RLS-root-container"
        onWheel={this.handleWheel}
        ref={this.containerRef}
      >
        <div className="RLS-swipe-container" style={{
          top: `-${this.state.offset}px`
        }}>
          {this.props.children}
          {indicator ? <Indicator totalPage={this.props.totalPage} activePage={this.state.currentPage} /> : null}
        </div>
      </div>
    )
  }

  private initResizeResponder(): void {
    window.addEventListener('resize', () => {
      this.containerHeight = this.containerRef.current ? this.containerRef.current.offsetHeight : 0;
      this.setState({
        offset: this.state.currentPage * this.containerHeight
      });
    }, false);
  }

  private handleWheel = Throttle((event: React.WheelEvent) => {
    // Suspend the function when in middle of transition;
    if (this.inTransition) {
      return;
    }
    let { currentPage } = this.state;
    let { deltaX: x, deltaY: y } = event;
    switch (this.calculateDirection(x, y)) {
      case 'down':
      case 'right':
        if (currentPage < this.props.totalPage - 1) {
          this.goNextPage(currentPage += 1);
        }
        break;
      case 'up':
      case 'left':
        if (currentPage <= this.state.currentPage && currentPage !== 0) {
          this.goPrevPage(currentPage -= 1);
        }
        break;
      default:
        throw new Error('Unsupported direction')
    }
    this.props.onChangePage && this.props.onChangePage();
  }, 700, { trailing: false });

  private calculateDirection(x: number, y: number): string | null {
    if (this.state.direction === 'horizontal') {
      return x > 0 ? 'left' : 'right'
    } else if (this.state.direction === 'vertical') {
      return y > 0 ? 'down' : 'up'
    }
    return null;
  }

  private goNextPage = (nextPage: number) => {
    this.setState({
      currentPage: nextPage
    }, () => this.inTransition = false);
    let currentPosition: number = this.state.currentPage * this.containerHeight;
    let targetPosition: number = nextPage * this.containerHeight;
    this.inTransition = true;
    requestAnimationFrame(this.makeAnimation(currentPosition, targetPosition, 30));
  }

  private goPrevPage = (nextPage: number) => {
    this.setState({
      currentPage: nextPage
    }, () => this.inTransition = false);
    let currentPosition: number = this.state.currentPage * this.containerHeight;
    let targetPosition: number = nextPage * this.containerHeight;
    this.inTransition = true;
    requestAnimationFrame(this.makeAnimation(currentPosition, targetPosition, 30));
  }

  private makeAnimation = (currentPos: number, targetPos: number, step: number) => {

    let stepSize: number = (targetPos - currentPos) / step;

    let animation = () => {
      if (step > 0) {
        step--;
        currentPos += stepSize;
        this.setState({
          offset: currentPos
        });
        requestAnimationFrame(animation);
      }
    }
    return animation
  }
}