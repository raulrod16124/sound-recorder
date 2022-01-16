import "./styles.scss";

import React from "react";

function QR({ url }) {
  return (
    <div className="content-qr">
      <img
        className="qr-image"
        src={"https://qrtag.net/api/qr_4.svg?url=" + url}
        alt="qr-image"
      />
    </div>
  );
}

export default QR;
