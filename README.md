# android-extensions 2.4

```javascript
<script src="/dist/extensions/android.widget.coordinator.min.js"></script>
<script src="/dist/extensions/android.widget.menu.min.js"></script>
<script src="/dist/extensions/android.widget.toolbar.min.js"></script>
<script>
    // Configure an extension (optional)
    squared.apply('android.widget.toolbar', {
        settings: {
            'elementId': { // HTML DOM
                appBar: {
                    android: {
                        theme: '@style/ThemeOverlay.AppCompat.Dark.ActionBar'
                    }
                }
            }
        },
        saveAs: 'toolbar-example' // optional
    });
</script>
```

* android.external
* android.substitute
* android.constraint.guideline
* android.widget.coordinator
* android.widget.floatingactionbutton
* android.widget.menu
* android.widget.bottomnavigation
* android.widget.toolbar
* android.widget.drawer

### LICENSE

MIT