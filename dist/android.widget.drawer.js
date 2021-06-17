/* android.widget.drawer
   https://github.com/anpham6/squared */

this.android = this.android || {};
this.android.widget = this.android.widget || {};
this.android.widget.drawer = (function () {
    'use strict';

    const Resource = android.base.Resource;
    const { NODE_RESOURCE } = squared.base.lib.constant;
    const { CONTAINER_NODE, SUPPORT_TAGNAME, SUPPORT_TAGNAME_X } = android.lib.constant;
    const { cloneObject, iterateArray } = squared.lib.util;
    const { createThemeAttribute, createViewAttribute, removeFileExtension } = android.lib.util;
    const { assignEmptyValue } = squared.base.lib.util;
    class Drawer extends squared.base.ExtensionUI {
        constructor(name, framework, options) {
            super(name, framework, options);
            this.documentBase = true;
            this.require({ name: "android.external" /* EXTERNAL */, leading: true });
            this.require({ name: "android.widget.menu" /* MENU */ });
            this.require({ name: "android.widget.coordinator" /* COORDINATOR */ });
        }
        beforeInsertNode(element, sessionId) {
            if (this.included(element)) {
                const application = this.application;
                iterateArray(element.children, (item) => {
                    if (item.tagName === 'NAV') {
                        const use = application.getDatasetName('use', item);
                        if (!Drawer.includes(use, "android.external" /* EXTERNAL */)) {
                            application.setDatasetName('use', item, (use ? use + ', ' : '') + "android.external" /* EXTERNAL */);
                        }
                    }
                });
                application.addRootElement(sessionId, element);
                return true;
            }
            return false;
        }
        processNode(node, parent) {
            const options = createViewAttribute(this.options.self);
            const resourceId = node.localSettings.resourceId;
            if (Drawer.findNestedElement(node, "android.widget.menu" /* MENU */)) {
                assignEmptyValue(options, 'android', 'fitsSystemWindows', 'true');
                this.setStyleTheme(resourceId, node.api);
            }
            else {
                const navigationViewOptions = createViewAttribute(this.options.navigationView);
                assignEmptyValue(navigationViewOptions, 'android', 'layout_gravity', node.localizeString('left'));
                const navView = node.item(-1);
                navView.mergeGravity('layout_gravity', navigationViewOptions.android.layout_gravity);
                navView.setLayoutHeight('match_parent');
                navView.positioned = true;
            }
            node.documentRoot = true;
            node.renderExclude = false;
            const controlName = node.api < 29 /* Q */ ? SUPPORT_TAGNAME.DRAWER : SUPPORT_TAGNAME_X.DRAWER;
            node.setControlType(controlName, 14 /* BLOCK */);
            node.exclude({ resource: 4 /* FONT_STYLE */ });
            node.apply(Resource.formatOptions(resourceId, options, this.application.extensionManager.valueAsBoolean("android.resource.strings" /* RESOURCE_STRINGS */, 'numberAsResource')));
            node.render(parent);
            node.setLayoutWidth('match_parent');
            node.setLayoutHeight('match_parent');
            return {
                output: {
                    type: 1 /* XML */,
                    node,
                    controlName
                },
                complete: true,
                include: true,
                remove: true
            };
        }
        afterParseDocument(sessionId) {
            var _a, _b;
            for (const node of this.subscribers.values(sessionId)) {
                const systemName = node.localSettings.systemName;
                const options = createViewAttribute(this.options.navigationView);
                const menu = (_a = Drawer.findNestedElement(node, "android.widget.menu" /* MENU */)) === null || _a === void 0 ? void 0 : _a.dataset['filename' + systemName];
                const headerLayout = (_b = Drawer.findNestedElement(node, "android.external" /* EXTERNAL */)) === null || _b === void 0 ? void 0 : _b.dataset['filename' + systemName];
                const app = options.app || (options.app = {});
                if (menu) {
                    assignEmptyValue(app, 'menu', `@menu/${removeFileExtension(menu)}`);
                }
                if (headerLayout) {
                    assignEmptyValue(app, 'headerLayout', `@layout/${removeFileExtension(headerLayout)}`);
                }
                if (menu || headerLayout) {
                    const controller = this.controller;
                    assignEmptyValue(options, 'android', 'id', `@+id/${node.controlId}_navigation`);
                    assignEmptyValue(options, 'android', 'fitsSystemWindows', 'true');
                    assignEmptyValue(options, 'android', 'layout_gravity', node.localizeString('left'));
                    controller.addAfterInsideTemplate(node, controller.renderNodeStatic(node.sessionId, {
                        controlName: node.api < 29 /* Q */ ? SUPPORT_TAGNAME.NAVIGATION_VIEW : SUPPORT_TAGNAME_X.NAVIGATION_VIEW,
                        width: 'wrap_content',
                        height: 'match_parent'
                    }, Resource.formatOptions(node.localSettings.resourceId, options, this.application.extensionManager.valueAsBoolean("android.resource.strings" /* RESOURCE_STRINGS */, 'numberAsResource'))));
                }
            }
        }
        postOptimize(node) {
            for (const parent of node.ascend()) {
                if (!parent.hasHeight) {
                    parent.setLayoutHeight('match_parent');
                }
            }
        }
        setStyleTheme(resourceId, api) {
            const { manifestThemeName, manifestParentThemeName } = this.application.userSettings;
            const options = createThemeAttribute(this.options.resource);
            assignEmptyValue(options, 'name', manifestThemeName);
            assignEmptyValue(options, 'parent', manifestParentThemeName);
            assignEmptyValue(options.items, 'android:windowTranslucentStatus', 'true');
            Resource.addTheme(resourceId, options);
            if (api >= 21 /* LOLLIPOP */) {
                const themeOptions = createThemeAttribute(cloneObject(options));
                const items = {};
                assignEmptyValue(themeOptions.output || (themeOptions.output = {}), 'pathname', 'res/values-v21');
                assignEmptyValue(items, 'android:windowDrawsSystemBarBackgrounds', 'true');
                assignEmptyValue(items, 'android:statusBarColor', '@android:color/transparent');
                themeOptions.items = items;
                Resource.addTheme(resourceId, themeOptions);
            }
        }
    }

    const drawer = new Drawer("android.widget.drawer" /* DRAWER */, 2 /* ANDROID */);
    if (squared) {
        squared.add(drawer);
    }

    return drawer;

}());
