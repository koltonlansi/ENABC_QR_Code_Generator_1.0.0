import "/styles.css";
import QRCodeStyling from "qr-code-styling";
const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();
  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;
  const png = "png";

  console.log(url, size);

  // Validate url
  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size, png);
    }, 2000);
  }
};

//Generate QR Code
const generateQRCode = (url, size, png) => {
  //Pass QR settings into index.html
  const qrCodes = new QRCodeStyling({
    width: size,
    height: size,
    type: png,
    data: url,
    image: "/img/ENABC-Logo.png",
    qrOptions: {
      typeNumber: "8",
      mode: "Byte",
      errorCorrectionLevel: "Q"
    },
    dotsOptions: {
      type: "classy",
      gradient: {
        type: "radial",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#448ccb" },
          { offset: 1, color: "#7cc576" }
        ]
      }
    },
    backgroundOptions: {
      color: "#FFFFFF"
    },
    imageOptions: {
      crossOrigin: "anonymous",
      hideBackgroundDots: false,
      imageSize: 0.4,
      margin: 0
    },
    cornersSquareOptions: { color: "#7cc576" },
    cornersDotOptions: { color: "#448ccb" }
  });

  qrCodes.append(qr);
  setTimeout(() => {
    qrCodes.download({ name: "qr", extension: "png" });
  }, 2000);

  console.log(url, size);
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

const clearUI = () => {
  qr.innerHTML = "";
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
