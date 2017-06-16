import React from 'react';
import { render } from 'react-dom';

/**
 * @description stateless functional component
 * @param {Object} props
 * @constructor Dot
 */
const ComponentFN = (props) =>
  <span key={props.index}>{props.hi}</span>;

/**
 * @description Stateful Component
 */
class Component extends React.Component {
  render() {
    return <span>{this.props.hi}</span>;
  }
}

/**
 * Organism
 */
class Main extends React.Component {
  render() {
    //create an array of 500 elements and fill them with zeros
    //Map this array with a function that calls each component in it's way
    const hi = new Array(100).fill(0).map((key, index) => {
      if(this.props.kind == 'functionalComponentAsFunction') {
        //call the functional component as a function
        return ComponentFN({hi: 'hi', index});
      } else if(this.props.kind == 'functionalComponentAsReactElement') {
        //call the functional component as a React Element
        return <ComponentFN key={index} hi="hi"/>;
      } else if(this.props.kind == 'classicalComponent') {
        //call the Class created component as a React Element
        return <Component key={index} hi="hi"/>
      }
    });
    //create a div and ouput the created elements
    return <div>{hi}</div>
  }
}

//Benchmarking variables
let classicalComponentTotalTime, functionalComponentAsElement, functionallyCalledComponent;
/**
 * @description Run is called as many times as the benchmark defines. Internally it calls 500 times every component for each render.
 * It calculates in total how much time it took to render for the amount of times it was asked to run.
 */
const run = (index) => {
  ['classicalComponent', 'functionalComponentAsReactElement', 'functionalComponentAsFunction'].forEach(kind => {
    const prevTime = performance.now();
  
    render(
      (<Main her={index} kind={kind}/>), document.getElementById(kind)
    );
      
    const timeToCompletion = Math.round(performance.now() - prevTime);

    if(kind == 'functionalComponentAsFunction') {
      functionallyCalledComponent = functionallyCalledComponent + timeToCompletion
    } else if(kind == 'functionalComponentAsReactElement') {
      functionalComponentAsElement = functionalComponentAsElement + timeToCompletion
    } else if(kind == 'classicalComponent') {
      classicalComponentTotalTime = classicalComponentTotalTime + timeToCompletion
    }
    
    });
    console.log('Components Rendered ');
};

//resets the timers on each run
//calls run as many times as defined
window.benchmark = ( count = 10 ) => {
  classicalComponentTotalTime = functionalComponentAsElement = functionallyCalledComponent = 0;
  console.log(`Running %c${ count } %ctimes ...`, 'font-weight: bold', 'font-weight: normal');
  const countArrayed = new Array(count).fill(0);
  countArrayed.forEach((key, index) => run(index));
  console.log(`Class component                        took ${ classicalComponentTotalTime }ms`);
  console.log(`Functional component mounted           took ${ functionalComponentAsElement }ms %c${Math.round(( 1-functionalComponentAsElement/classicalComponentTotalTime) * 100 ) }% %c`, 'color:green', 'color:black');
  console.log(`Functional invoked component           took ${ functionallyCalledComponent }ms %c${Math.round(( 1-functionallyCalledComponent/classicalComponentTotalTime) * 100 ) }% %c`, 'color:green', 'color:black');
  console.log(`%c🎉`, 'font-size: 100px')
};
