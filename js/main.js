import React from 'react';
import { render } from 'react-dom';

/**
 * @description stateless component
 * @param {Object} props
 * @constructor Dot
 */
const Dot = (props) =>
  <span>{props.hi}</span>;

/**
 * @description Statefull Component
 */
class DotComponent extends React.Component {
  render() {
    return <span>{this.props.hi}</span>;
  }
}

/**
 * Organism
 */
class Main extends React.Component {
  render() {
    const dots = new Array(500).fill(0).map(x => {
      if(this.props.kind == 'stateless-functional-direct-call') {
        return Dot({hi: 'hi'});
      } else if(this.props.kind == 'stateless-functional-mounted') {
        return <Dot hi="hi"/>;
      } else if(this.props.kind == 'stateful') {
        return <DotComponent hi="hi"/>
      }
    });
    return React.createElement('div', {}, ...dots);
  }
}

//Benchmarking variables
let benchmarkCount, statefulTotalTime, statelessFunctionalMountedTotalTime, statelessFunctionalDirectCallTotalTime;
/**
 * @description Run is called as many times as the benchmark defines. Internally it calls 500 times every component for each render.
 * It calculates in total how much time it took to render for the amount of times it was asked to run.
 */
const run = () => {
  ['stateful', 'stateless-functional-mounted', 'stateless-functional-direct-call'].forEach(kind => {
    const prevTime = performance.now();
  
    render(
      (<Main kind={kind}/>), document.getElementById(kind)
    );
      
    const timeToCompletion = Math.round(performance.now() - prevTime);

    if(kind == 'stateless-functional-direct-call') {
      statelessFunctionalDirectCallTotalTime = statelessFunctionalDirectCallTotalTime + timeToCompletion
    } else if(kind == 'stateless-functional-mounted') {
      statelessFunctionalMountedTotalTime = statelessFunctionalMountedTotalTime + timeToCompletion
    } else if(kind == 'stateful') {
      statefulTotalTime = statefulTotalTime + timeToCompletion
    }
    
    });
    benchmarkCount = benchmarkCount + 1;
    console.log('.');
};

//resets the timers on each run
//calls run as many times as defined
window.benchmark = ( count = 10 ) => {
  benchmarkCount = statefulTotalTime = statelessFunctionalMountedTotalTime = statelessFunctionalDirectCallTotalTime = 0;
  console.log(`Running %c${ count } %ctimes ...`, 'font-weight: bold', 'font-weight: normal');
  const countArrayed = new Array(count).fill(0);
  countArrayed.forEach(x => run());
  console.log(`Class component                        took ${ statefulTotalTime }ms`);
  console.log(`Functional component mounted           took ${ statelessFunctionalMountedTotalTime }ms %c${Math.round(( 1-statelessFunctionalMountedTotalTime/statefulTotalTime) * 100 ) }% %c`, 'color:green', 'color:black');
  console.log(`Functional invoked component           took ${ statelessFunctionalDirectCallTotalTime }ms %c${Math.round(( 1-statelessFunctionalDirectCallTotalTime/statefulTotalTime) * 100 ) }% %c`, 'color:green', 'color:black');
  console.log(`%c🎉`, 'font-size: 100px')
};
