document.getElementById('fetch-posts').addEventListener('click', fetchPosts);

function fetchPosts() {
    fetch('https://jsonplaceholder.typicode.com/users')
    
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = '';
            data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}
import React, { Component, PropTypes } from 'react';
import radium from 'radium';

// indeterminate Linear (type: indeterminateLinear)
const indeterminateLinearLong = radium.keyframes({
  '0%': {
    left: '-35%',
    right: '100%'
  },
  '60%': {
    left: '100%',
    right: '-90%'
  },
  '100%': {
    left: '100%',
    right: '-90%'
  }
});
const indeterminateLinearShort = radium.keyframes({
  '0%': {
    left: '-200%',
    right: '100%'
  },
  '60%': {
    left: '107%',
    right: '-8%'
  },
  '100%': {
    left: '107%',
    right: '-8%'
  }
});
const indeterminateLinear = {
  base: {
    backgroundColor: '#26a69a',
  },
  progress: {
    position: 'relative',
    height: '4px',
    display: 'block',
    width: '100%',
    backgroundColor: '#acece6',
    // borderRadius: '2px',
    backgroundClip: 'padding-box',
    // margin: '0.5rem 0 1rem 0',
    overflow: 'hidden',
    zIndex: '999'
  },
  before: {
    position: 'absolute',
    backgroundColor: 'yellow',
    top: '0',
    left: '0',
    bottom: '0',
    willChange: 'left, right',
    animation: 'indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
    animationName: indeterminateLinearLong
  },
  after: {
    position: 'absolute',
    backgroundColor: 'yellow',
    top: '0',
    left: '0',
    bottom: '0',
    willChange: 'left, right',
    animation: 'indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
    animationName: indeterminateLinearShort,
    animationDelay: '1.15s'
  }
};

// Indeterminate Cirular (type: indeterminateCircular (default))
const indeterminateCircularRotate = radium.keyframes({
  '100%': {
    transform: 'rotate(360deg)'
  },
});
const indeterminateCircularColor = radium.keyframes({
  '100%, 0%': {
    stroke: 'red'
  },
  '40%': {
    stroke: 'blue'
  },
  '60%': {
    stroke: 'green'
  },
  '80%, 90%': {
    stroke: 'yellow'
  }
});
const indeterminateCircularDash = radium.keyframes({
  '0%': {
    strokeDasharray: '1,200',
    strokeDashoffset: '0'
  },
  '50%': {
    strokeDasharray: '89,200',
    strokeDashoffset: '-35'
  },
  '100%': {
    strokeDasharray: '89,200',
    strokeDashoffset: '-124'
  },
});
const indeterminateCircular = {
  loader: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    left: '50%',
    top: '20%'
  },
  circular: {
    animation: 'x 2s linear infinite',
    animationName: indeterminateCircularRotate,
    height: '24px',
    position: 'relative',
    width: '24px'
  },
  path: {
    strokeDasharray: '1,200',
    strokeDashoffset: '0',
    animation: 'dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite',
    animationName: indeterminateCircularDash,
    strokeLinecap: 'round',
    stroke: 'red',
    strokeWidth: '2'
  }
}

class Loader extends Component {
  render() {
    const {
      type
    } = this.props;
    let loader = null;

    if ( type === 'indeterminateLinear' ) {
      loader = (
        <div style={ indeterminateLinear.progress }>
          <div style={ indeterminateLinear.before }></div>
          <div style={ indeterminateLinear.base }></div>
          <div style={ indeterminateLinear.after }></div>
        </div>
      );
    } else {
      loader = (
        <div>
          <div style={ indeterminateCircular.loader }>
            <svg style={ indeterminateCircular.circular } viewBox="25 25 50 50">
              <circle style={
                indeterminateCircular.path
              } cx="50" cy="50" r="20" fill="none" strokeMiterlimit="10"/>
            </svg>
          </div>
        </div>
      );
    }

    return (
      <div>{ loader }</div>
    );
  }
}

Loader.propTypes = {
  type: PropTypes.string,
};

export default radium(Loader);