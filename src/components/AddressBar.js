import React from "react";

function addressBar(props) {
  const { tx, account } = props;
  return (
    <p
      className={
        tx
          ? "is-hidden"
          : "panel-heading has-text-centered is-clipped is-size-7"
      }
    >
      Account:
      <strong>{account}</strong>
    </p>
  );
}

export default addressBar;
