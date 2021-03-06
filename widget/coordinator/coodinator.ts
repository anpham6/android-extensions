import NODE_TEMPLATE = squared.base.lib.constant.NODE_TEMPLATE;
import BUILD_VERSION = android.lib.constant.BUILD_VERSION;

import { WIDGET_NAME } from '../lib/constant';

type View = android.base.View;

const Resource = android.base.Resource;

const { NODE_RESOURCE } = squared.base.lib.constant;
const { CONTAINER_NODE, SUPPORT_TAGNAME, SUPPORT_TAGNAME_X } = android.lib.constant;

const { getElementAsNode } = squared.lib.session;
const { createViewOptions } = android.lib.util;

export default class Coordinator<T extends View> extends squared.base.ExtensionUI<T> {
    public processNode(node: T, parent: T) {
        const options = createViewOptions(this.options, node.elementId);
        Resource.formatOptions(node.localSettings.resourceId, options, this.application.extensionManager.valueAsBoolean(internal.android.EXT_ANDROID.RESOURCE_STRINGS, 'numberAsResource'));
        const element = Coordinator.findNestedElement(node, WIDGET_NAME.TOOLBAR);
        if (element) {
            const toolbar = getElementAsNode<T>(element, node.sessionId);
            if (toolbar) {
                const data: Undef<StandardMap> = this.application.extensionManager.get(WIDGET_NAME.TOOLBAR)?.options[toolbar.elementId];
                if (data && 'collapsingToolbar' in data) {
                    node.android('fitsSystemWindows', 'true');
                }
            }
        }
        const controlName = node.api < BUILD_VERSION.Q ? SUPPORT_TAGNAME.COORDINATOR : SUPPORT_TAGNAME_X.COORDINATOR;
        node.setControlType(controlName, CONTAINER_NODE.BLOCK);
        node.exclude({ resource: NODE_RESOURCE.ASSET });
        node.render(parent);
        node.renderExclude = false;
        return {
            output: {
                type: NODE_TEMPLATE.XML,
                node,
                controlName
            } as NodeXmlTemplate<T>
        };
    }

    public postOptimize(node: T) {
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