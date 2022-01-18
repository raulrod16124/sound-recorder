import "./styles.scss";

import React from "react";

function QR({ url }) {
  /* The QR component get the url of the recording as a prop.
  using the https://www.qrtag.net/api/ api with the /qr_4.svg?url=" + url params
  the api response with a qr of the recording */

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
