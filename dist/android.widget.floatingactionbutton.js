/* android.widget.floatingactionbutton
   https://github.com/anpham6/squared */

this.android = this.android || {};
this.android.widget = this.android.widget || {};
this.android.widget.floatingactionbutton = (function () {
    'use strict';

    const Resource = android.base.Resource;
    const { NODE_PROCEDURE, NODE_RESOURCE } = squared.base.lib.constant;
    const { CONTAINER_NODE, SUPPORT_TAGNAME, SUPPORT_TAGNAME_X } = android.lib.constant;
    const { createViewOptions, parseColor } = android.lib.util;
    const { assignEmptyValue } = squared.base.lib.util;
    const SUPPORTED_INPUT = [
        'button',
        'file',
        'image',
        'reset',
        'search',
        'submit'
    ];
    const PREFIX_DIALOG = 'ic_dialog_';
    class FloatingActionButton extends squared.base.ExtensionUI {
        is(node) {
            const element = node.element;
            return super.is(node) && (element.tagName !== 'INPUT' || SUPPORTED_INPUT.includes(element.type));
        }
        condition(node) {
            return this.included(node.element);
        }
        processNode(node, parent) {
            const options = createViewOptions(this.options, node.elementId);
            const { element, target } = node;
            const resourceId = node.localSettings.resourceId;
            const backgroundColor = node.css('backgroundColor');
            let colorName;
            if (backgroundColor !== 'none') {
                const colorData = parseColor(backgroundColor);
                if (colorData) {
                    colorName = Resource.addColor(resourceId, colorData);
                }
            }
            assignEmptyValue(options, 'android', 'backgroundTint', colorName ? `@color/${colorName}` : '?attr/colorAccent');
            if (!node.hasProcedure(8 /* ACCESSIBILITY */)) {
                assignEmptyValue(options, 'android', 'focusable', 'false');
            }
            let src;
            switch (element.tagName) {
                case 'IMG':
                    src = this.resource.addImageSrc(resourceId, element, PREFIX_DIALOG);
                    break;
                case 'INPUT':
                    if (element.type === 'image') {
                        src = this.resource.addImageSrc(resourceId, element, PREFIX_DIALOG);
                        break;
                    }
                case 'BUTTON':
                    src = this.resource.addImageSrc(resourceId, node.backgroundImage, PREFIX_DIALOG);
                    break;
            }
            if (src) {
                assignEmptyValue(options.app || (options.app = {}), 'srcCompat', `@drawable/${src}`);
            }
            const controlName = node.api < 29 /* Q */ ? SUPPORT_TAGNAME.FLOATING_ACTION_BUTTON : SUPPORT_TAGNAME_X.FLOATING_ACTION_BUTTON;
            node.setControlType(controlName, 9 /* BUTTON */);
            node.exclude({ resource: 1 /* BOX_STYLE */ | 28 /* ASSET */ });
            Resource.formatOptions(resourceId, options, this.application.extensionManager.valueAsBoolean("android.resource.strings" /* RESOURCE_STRINGS */, 'numberAsResource'));
            if (!node.pageFlow) {
                const offsetParent = this.application.resolveTarget(node.sessionId, target) || parent;
                if (node.autoMargin.leftRight) {
                    node.mergeGravity('layout_gravity', 'center_horizontal');
                }
                else if (node.hasUnit('left')) {
                    node.mergeGravity('layout_gravity', node.localizeString('left'));
                    node.modifyBox(8 /* MARGIN_LEFT */, offsetParent.getAbsolutePaddingOffset(128 /* PADDING_LEFT */, node.left));
                }
                else if (node.hasUnit('right')) {
                    node.mergeGravity('layout_gravity', node.localizeString('right'));
                    node.modifyBox(2 /* MARGIN_RIGHT */, offsetParent.getAbsolutePaddingOffset(32 /* PADDING_RIGHT */, node.right));
                }
                if (node.autoMargin.topBottom) {
                    node.mergeGravity('layout_gravity', 'center_vertical');
                }
                else if (node.hasUnit('top')) {
                    node.app('layout_dodgeInsetEdges', 'top');
                    node.mergeGravity('layout_gravity', 'top');
                    node.modifyBox(1 /* MARGIN_TOP */, offsetParent.getAbsolutePaddingOffset(16 /* PADDING_TOP */, node.top));
                }
                else if (node.hasUnit('bottom')) {
                    node.mergeGravity('layout_gravity', 'bottom');
                    node.modifyBox(4 /* MARGIN_BOTTOM */, offsetParent.getAbsolutePaddingOffset(64 /* PADDING_BOTTOM */, node.bottom));
                }
                node.positioned = true;
            }
            else if (target) {
                const box = node.documentParent.box;
                const linear = node.linear;
                const horizontalBias = node.getHorizontalBias();
                const verticalBias = node.getVerticalBias();
                if (horizontalBias < 0.5) {
                    node.mergeGravity('layout_gravity', node.localizeString('left'));
                    node.modifyBox(8 /* MARGIN_LEFT */, linear.left - box.left);
                }
                else if (horizontalBias > 0.5) {
                    node.mergeGravity('layout_gravity', node.localizeString('right'));
                    node.modifyBox(2 /* MARGIN_RIGHT */, box.right - linear.right);
                }
                else {
                    node.mergeGravity('layout_gravity', 'center_horizontal');
                }
                if (verticalBias < 0.5) {
                    node.app('layout_dodgeInsetEdges', 'top');
                    node.mergeGravity('layout_gravity', 'top');
                    node.modifyBox(1 /* MARGIN_TOP */, linear.top - box.top);
                }
                else if (verticalBias > 0.5) {
                    node.mergeGravity('layout_gravity', 'bottom');
                    node.modifyBox(4 /* MARGIN_BOTTOM */, box.bottom - linear.bottom);
                }
                else {
                    node.mergeGravity('layout_gravity', 'center_vertical');
                }
                node.positioned = true;
            }
            if (target) {
                const layoutGravity = node.android('layout_gravity');
                let anchor = parent.documentId;
                if (parent.controlName === (node.api < 29 /* Q */ ? SUPPORT_TAGNAME.TOOLBAR : SUPPORT_TAGNAME_X.TOOLBAR)) {
                    const value = parent.data("android.widget.toolbar" /* TOOLBAR */, 'outerParent');
                    if (value) {
                        anchor = value;
                    }
                }
                if (layoutGravity) {
                    node.app('layout_anchorGravity', layoutGravity);
                    node.delete('android', 'layout_gravity');
                }
                node.app('layout_anchor', anchor);
                node.exclude({ procedure: 4 /* ALIGNMENT */ });
            }
            node.render(parent);
            node.apply(options);
            return {
                output: {
                    type: 1 /* XML */,
                    node,
                    controlName
                },
                complete: true
            };
        }
    }

    const fab = new FloatingActionButton("android.widget.floatingactionbutton" /* FAB */, 2 /* ANDROID */, { tagNames: ['BUTTON', 'INPUT', 'IMG'] });
    if (squared) {
        squared.add(fab);
    }

    return fab;

}());
