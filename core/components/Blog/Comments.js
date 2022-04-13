import React, { Component } from "react";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.commentBox = React.createRef();
  }

  componentDidMount() {
    let scriptEl = document.createElement("script");
    scriptEl.setAttribute(
      "src",
      "https://telegram.org/js/telegram-widget.js?18"
    );

    scriptEl.setAttribute("async", true);
    scriptEl.setAttribute(
      "data-telegram-discussion",
      `${this.props.telegramdiscussurl}`
    );

    scriptEl.setAttribute("data-colorful", "1");
    scriptEl.setAttribute("data-comments-limit", "7");
    scriptEl.setAttribute("data-color", "F646A4");
    // scriptEl.setAttribute("data-dark-color", "ffffff");
    this.commentBox.current.appendChild(scriptEl);
  }

  render() {
    return (
      <div style={{ width: "100%" }} id="comments">
        <div ref={this.commentBox}></div>
      </div>
    );
  }
}
