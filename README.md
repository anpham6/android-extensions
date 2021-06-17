# android-extensions 3.1

Examples can be found in the "html/widget" directory.

```javascript
<script src="/dist/android.widget.coordinator.min.js"></script>
<script src="/dist/android.widget.menu.min.js"></script>
<script src="/dist/android.widget.toolbar.min.js"></script>
<script>
    // Configure an extension (optional)
    squared.apply('android.widget.toolbar', {
        element: {
            "toolbar-id": { // HTML DOM
                android: {
                    background: "?android:attr/windowBackground"
                },
                appBar: {
                    android: {
                        theme: '@style/ThemeOverlay.AppCompat.Dark.ActionBar'
                    }
                }
            }
        },
        'toolbar-example' // Save to Local Storage (optional)
    });

    // Load from Local Storage
    squared.apply('android.widget.toolbar', 'toolbar-example');
</script>
```

* android.constraint.guideline
* android.widget.bottomnavigation
* android.widget.coordinator
* android.widget.drawer
* android.widget.floatingactionbutton
* android.widget.menu
* android.widget.toolbar

### LICENSE

MIT