# android-extensions 2.1

&nbsp;&nbsp;&nbsp;&gt; git clone https://github.com/anpham6/squared-apache  
&nbsp;&nbsp;&nbsp;&gt; cd squared-apache  
&nbsp;&nbsp;&nbsp;&gt; squared.settings.yml (configure)  
&nbsp;&nbsp;&nbsp;&gt; gradlew run

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

See /android/widget/*.html for usage instructions in the squared-apache <https://github.com/anpham6/squared-apache> project.

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