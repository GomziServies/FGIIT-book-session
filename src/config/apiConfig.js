const hostname = window.location.hostname.trim();

let baseUrl = "http://localhost:82";
let fwgBaseUrl = "http://localhost:82";
let razorpayMerchantId = "rzp_test_sb4SYqLcmeDGqi";
let environment = "development";

if (hostname === "demo-session.fggroup.in" || hostname === "www.demo-session.fggroup.in") {
  baseUrl = "https://api.fggroup.in";
  fwgBaseUrl = 'https://app-api.fggroup.in';
  environment = 'production'
  razorpayMerchantId = "rzp_live_WxBhDlHqqY0CYX";
} else if (hostname === "test.fgiit.com") {
  baseUrl = "https://dev-api.fgiit.com";
  fwgBaseUrl = 'https://fg-app-dev-api.fgiit.com';
} else {
  //  baseUrl = "https://dev-api.fggroup.in";
  baseUrl = 'http://localhost:80';
  // fwgBaseUrl = 'https://fg-app-dev-api.fggroup.in';
  fwgBaseUrl = 'http://localhost:82';
}

const apiConfig = {
  BASE_URL: baseUrl,
  FWG_BASE_URL: fwgBaseUrl,
  RAZORPAY_MERCHANT_ID: razorpayMerchantId,
  environment
};

export default apiConfig;
