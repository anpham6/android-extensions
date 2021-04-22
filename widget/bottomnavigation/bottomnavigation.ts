import NODE_TEMPLATE = squared.base.lib.constant.NODE_TEMPLATE;
import BUILD_VERSION = android.lib.constant.BUILD_VERSION;

import { WIDGET_NAME } from '../lib/constant';

const Resource = android.base.Resource;

const { NODE_RESOURCE } = squared.base.lib.constant;
const { CONTAINER_NODE, SUPPORT_TAGNAME, SUPPORT_TAGNAME_X } = android.lib.constant;

const { capitalize, iterateArray } = squared.lib.util;
const { createThemeAttribute, createViewOptions, removeFileExtension } = android.lib.util;

const { assignEmptyValue } = squared.base.lib.util;

export default class BottomNavigation<T extends android.base.View> extends squared.base.ExtensionUI<T> {
    constructor(name: string, framework: number, options?: ExtensionUIOptions) {
        super(name, framework, options);
        this.require({ name: WIDGET_NAME.MENU });
    }

    public processNode(node: T, parent: T) {
        const options = createViewOptions(this.options, node.elementId);
        assignEmptyValue(options, 'android', 'background', '?android:attr/windowBackground');
        iterateArray(node.children, (item: T) => {
            item.hide();
            item.cascade((child: T) => child.hide());
        }, 5);
        const resourceId = node.localSettings.resourceId;
        const controlName = node.api < BUILD_VERSION.Q ? SUPPORT_TAGNAME.BOTTOM_NAVIGATION : SUPPORT_TAGNAME_X.BOTTOM_NAVIGATION;
        node.setControlType(controlName, CONTAINER_NODE.BLOCK);
        node.exclude({ resource: NODE_RESOURCE.ASSET });
        node.render(parent);
        node.apply(Resource.formatOptions(resourceId, options, this.application.extensionManager.valueAsBoolean(internal.android.EXT_ANDROID.RESOURCE_STRINGS, 'numberAsResource')));
        node.setLayoutWidth('match_parent');
        node.setLayoutHeight('wrap_content');
        node.cascade((item: T) => this.addDescendant(item));
        this.setStyleTheme(resourceId);
        return {
            output: {
                type: NODE_TEMPLATE.XML,
                node,
                controlName
            } as NodeXmlTemplate<T>,
            complete: true,
            include: true
        };
    }

    public postOptimize(node: T) {
        const renderParent = node.renderParent as T;
        if (renderParent.documentRoot) {
            if (renderParent.inlineWidth) {
                renderParent.setLayoutWidth('match_parent');
            }
            if (renderParent.inlineHeight) {
                renderParent.setLayoutHeight('match_parent');
            }
        }
        const menu = BottomNavigation.findNestedElement(node, WIDGET_NAME.MENU)?.dataset['filename' + capitalize(this.application.systemName)];
        if (menu) {
            const options = createViewOptions(this.options, node.elementId);
            const app = options.app ||= {};
            assignEmptyValue(app, 'menu', `@menu/${removeFileExtension(menu)}`);
            node.app('menu', app.menu);
        }
    }

    public setStyleTheme(resourceId: number) {
        const options = createThemeAttribute(this.options.resource);
        assignEmptyValue(options, 'name', this.application.userSettings.manifestThemeName);
        assignEmptyValue(options, 'parent', 'Theme.AppCompat.Light.DarkActionBar');
        Resource.addTheme(resourceId, options);
    }
}