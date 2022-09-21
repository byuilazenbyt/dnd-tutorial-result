import React from 'react'

export default class Title extends React.Component {
  render = () => {
    return (
      <h5 className={'mx-2 py-2 text-uppercase'}>{this.props.children}</h5>
    );
  }
}