import * as React from 'React';

interface IIndicatorProps { 
  totalPage: number;
  className?: string;
  activePage: number;
};

interface IIndicatorState { 

};

export default class Indicator extends React.PureComponent<IIndicatorProps, IIndicatorState> {
  constructor(props: IIndicatorProps) {
    super(props);
  }

  render() {
    let {className, totalPage} = this.props;
    let indicators = new Array(this.props.totalPage).map((indicator, index) => (
      <li className={
        'RLS-page-indicator' + 
        ` ${this.props.activePage === index ?
          'RLS-active-indicator' :
          ''}`} 
        key={index}>
        
      </li>
    ));
    return (
      <>
        <ul className={className ? className : ''}>
          {indicators}
        </ul>
      </>
    )
  }
}