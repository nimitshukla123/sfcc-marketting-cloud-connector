'use strict';

/**
 * @type {dw.system.Site}
 */
const Site = require('dw/system/Site');
/**
 * @type {dw.template.Velocity}
 */
const velocity = require('dw/template/Velocity');

var analyticsEnabled = false;

(function(){
    var curSite = Site.current;
    analyticsEnabled = !!(curSite.getCustomPreferenceValue('mcEnableAnalytics') && curSite.getCustomPreferenceValue('mcMID'));
})();

/**
 * Registered hook for app.tracking.cachedTrackingLink
 */
function cachedTrackingLink() {
    var curSite = Site.current;
    var includeTrackingLink = !!(curSite.getCustomPreferenceValue('mcIncludeTrackingLink'));

    if (includeTrackingLink) {
        var mcMID = curSite.getCustomPreferenceValue('mcMID');
        var mcCollectJsUrl = curSite.getCustomPreferenceValue('mcCollectJsUrl').replace('MCMID', '{0}');
        var trackingLink = require('dw/util/StringUtils').format(
            mcCollectJsUrl,
            encodeURIComponent(mcMID)
        );
        var mcInject = "<!-- Marketing Cloud Analytics -->\n" +
            "<script type=\"text/javascript\" src=\"$trackingLink\"></script>\n" +
            "<!-- End Marketing Cloud Analytics -->\n";

        velocity.render(mcInject, {
            trackingLink: trackingLink
        });
    }
}

// Ensure MC Analytics hooks only fire if analytics are enabled
if (analyticsEnabled) {
    exports.cachedTrackingLink = cachedTrackingLink;
} else {
    exports.cachedTrackingLink = function(){};
}
