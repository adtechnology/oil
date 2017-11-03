import { OIL_CONFIG } from './constants.js';
import { deActivatePowerOptIn } from './poi.js';
import { registerMessageListener } from './utils.js';
import { getConfiguration } from './config.js';
import { logInfo } from './log.js';
import { removeSubscriberCookies } from './cookies.js';

let config = null;

/**
 * Opt-Out Handler
 * ATTENTION: THIS WORKS FOR SOI ONLY RIGHT NOW. THERE IS NO OPT-OUT FOR POI YET, NEW STORY!
 *
 * @param event
 * @return none
 */
function receiveOptOutMessage(event) {
  if (!config) {
    config = getConfiguration();
  }

  if (config) {
    let optOutEventName = config[OIL_CONFIG.ATTR_OPT_OUT_EVENT_NAME];
    if (event && event.data && typeof(event.data.indexOf) !== 'undefined') {
      if (event.data.indexOf(optOutEventName) !== -1) {
        logInfo('OptOut Received.');
        // Update Oil cookie
        removeSubscriberCookies();
        // delete POI too if exists
        deActivatePowerOptIn();
      }
    }
  }
}

/**
 * Registers the optout event listener
 * @function
 * @return
 */
export function registerOptOutListener() {
  logInfo('registerOptOutListener');
  registerMessageListener(receiveOptOutMessage);
}
