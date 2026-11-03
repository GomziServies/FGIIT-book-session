/**
 * FG Group CRM tracking for this site: cookie banner, visitor tracker, and the link that makes an inquiry and the
 * visitor's browsing one lead. Site key 'fgiit-book-session' is registered in fg-api src/config/website-sources.js, which
 * sends this site's leads to the FGIIT section of the CRM. How it works: ./fg-crm-tracking.js
 */
import apiConfig from '../config/apiConfig';
import { publicAxiosInstance } from '../config/api';
import { initCrmTracking, attachToAxios } from './fg-crm-tracking';

initCrmTracking({
  apiBase: apiConfig.BASE_URL,
  siteKey: 'fgiit-book-session',
  brand: 'FGIIT',
  accent: '#9bc028',
  accentText: '#0f172a',
  profileKeys: ['user_info'],
});

// every POST /contact-inquiry carries the visitor id, so the inquiry joins the visitor's lead
attachToAxios(publicAxiosInstance);
