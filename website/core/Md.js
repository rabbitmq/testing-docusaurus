// vim:sw=2:et:
/**
 * Copyright (c) 2020-present, Pivotal Software, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
import { readFileSync } from 'fs';

const renderMarkdown = require('../node_modules/docusaurus/lib/core/renderMarkdown.js');

class Md extends React.Component {
  content() {
    if (this.props.file) {
      var data = readFileSync(this.props.file, 'utf8');
      return renderMarkdown(data);
    } else {
      return React.Children.map(this.props.children, child => {
        if (typeof child === 'string') {
          return renderMarkdown(child);
        }

        return child;
      });
    }
  }

  render() {
    const Container = this.props.container;
    if (this.props.id && this.props.className) {
      return <Container
               id={this.props.id}
               className={this.props.className}
               dangerouslySetInnerHTML={{__html: this.content()}} />;
    } else if (this.props.id) {
      return <Container
               id={this.props.id}
               dangerouslySetInnerHTML={{__html: this.content()}} />;
    } else if (this.props.className) {
      return <Container
               className={this.props.className}
               dangerouslySetInnerHTML={{__html: this.content()}} />;
    } else {
      return <Container
               dangerouslySetInnerHTML={{__html: this.content()}} />;
    }
  }
}

Md.defaultProps = {
  container: 'div',
};

module.exports = Md;
