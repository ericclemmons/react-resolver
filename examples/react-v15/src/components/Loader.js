import React from "react";

export default class Loader extends React.Component {
  static displayName = "Loader"

  render() {
    return (
      <div className="spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />

        <style dangerouslySetInnerHTML={{ __html: `
          .spinner {
            margin: 4em auto 0;
            width: 70px;
            text-align: center;
          }
          .spinner > div {
            width: 18px;
            height: 18px;
            background-color: #333;
            border-radius: 100%;
            display: inline-block;
            -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
            animation: sk-bouncedelay 1.4s infinite ease-in-out both;
          }
          .spinner .bounce1 {
            -webkit-animation-delay: -0.32s;
            animation-delay: -0.32s;
          }
          .spinner .bounce2 {
            -webkit-animation-delay: -0.16s;
            animation-delay: -0.16s;
          }
          @-webkit-keyframes sk-bouncedelay {
            0%, 80%, 100% { -webkit-transform: scale(0) }
            40% { -webkit-transform: scale(1.0) }
          }
          @keyframes sk-bouncedelay {
            0%, 80%, 100% {
              -webkit-transform: scale(0);
              transform: scale(0);
            } 40% {
              -webkit-transform: scale(1.0);
              transform: scale(1.0);
            }
          }
        ` }} />
      </div>
    );
  }
}
