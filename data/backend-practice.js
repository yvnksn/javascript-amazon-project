// backend practice file.

const XHR = new XMLHttpRequest();

XHR.addEventListener("load", () => {
  const XHRresponse = XHR.response;
  console.log(XHRresponse);
});

XHR.open("GET", "https://supersimplebackend.dev/dev");
XHR.send();
