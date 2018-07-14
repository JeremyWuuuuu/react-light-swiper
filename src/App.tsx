import * as React from 'react';
import {render} from 'react-dom';
import ReactLightSwiper from './ReactLightSwiper';

export default function Render() {
  render(<ReactLightSwiper />, document.querySelector('#root'));
}