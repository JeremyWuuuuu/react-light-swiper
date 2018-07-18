import * as React from 'React';

interface IPageProps { };

interface IPageState {
  height: number;
 };

export default class Page extends React.PureComponent<IPageProps, IPageState> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {
      height: window.innerHeight
    }
  }

  render() {
    let pageStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      maxHeight: '100%'
    }
    return (
      <div style={pageStyle} className="RLS-page-container">
        {this.props.children}
      </div>
    )
  }
}