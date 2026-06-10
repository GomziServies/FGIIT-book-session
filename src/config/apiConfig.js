const hostname = window.location.hostname.trim();

let baseUrl = "http://localhost:82";
let fwgBaseUrl = "http://localhost:82";
let razorpayMerchantId = "rzp_test_sb4SYqLcmeDGqi";
let environment = "development";

if (hostname === "fgiit.com" || hostname === "www.fgiit.com") {
  baseUrl = "https://api.fgiit.com";
  fwgBaseUrl = 'https://app-api.fgiit.com';
  environment = 'production'
  razorpayMerchantId = "rzp_live_WxBhDlHqqY0CYX";
} else if (hostname === "test.fgiit.com") {
  baseUrl = "https://dev-api.fgiit.com";
  fwgBaseUrl = 'https://fg-app-dev-api.fgiit.com';
} else {
  baseUrl = "http://localhost:82";
  fwgBaseUrl = 'http://localhost:82';
}

const apiConfig = {
  BASE_URL: baseUrl,
  FWG_BASE_URL: fwgBaseUrl,
  RAZORPAY_MERCHANT_ID: razorpayMerchantId,
  environment
};

export default apiConfig;
