/* android.widget.coordinator
   https://github.com/anpham6/squared */

this.android = this.android || {};
this.android.widget = this.android.widget || {};
this.android.widget.coordinator = (function () {
    'use strict';

    const Resource = android.base.Resource;
    const { NODE_RESOURCE } = squared.base.lib.constant;
    const { CONTAINER_NODE, SUPPORT_TAGNAME, SUPPORT_TAGNAME_X } = android.lib.constant;
    const { getElementAsNode } = squared.lib.session;
    const { createViewOptions } = android.lib.util;
    class Coordinator extends squared.base.ExtensionUI {
        processNode(node, parent) {
            var _a;
            const options = createViewOptions(this.options, node.elementId);
            Resource.formatOptions(node.localSettings.resourceId, options, this.application.extensionManager.valueAsBoolean("android.resource.strings" /* RESOURCE_STRINGS */, 'numberAsResource'));
            const element = Coordinator.findNestedElement(node, "android.widget.toolbar" /* TOOLBAR */);
            if (element) {
                const toolbar = getElementAsNode(element, node.sessionId);
                if (toolbar) {
                    const data = (_a = this.application.extensionManager.get("android.widget.toolbar" /* TOOLBAR */)) === null || _a === void 0 ? void 0 : _a.options[toolbar.elementId];
                    if (data && 'collapsingToolbar' in data) {
                        node.android('fitsSystemWindows', 'true');
                    }
                }
            }
            const controlName = node.api < 29 /* Q */ ? SUPPORT_TAGNAME.COORDINATOR : SUPPORT_TAGNAME_X.COORDINATOR;
            node.setControlType(controlName, 14 /* BLOCK */);
            node.exclude({ resource: 28 /* ASSET */ });
            node.render(parent);
            node.renderExclude = false;
            return {
                output: {
                    type: 1 /* XML */,
                    node,
                    controlName
                }
            };
        }
        postOptimize(node) {
            if (node.documentRoot) {
                if (node.inlineWidth && node.find(item => item.rightAligned)) {
                    node.setLayoutWidth('match_parent', true);
                }
                if (node.inlineHeight && node.find(item => item.bottomAligned)) {
                    node.setLayoutHeight('match_parent', true);
                }
            }
        }
    }

    const coordinator = new Coordinator("android.widget.coordinator" /* COORDINATOR */, 2 /* ANDROID */);
    if (squared) {
        squared.add(coordinator);
    }

    return coordinator;

}());
