# Oracle APEX Slideover Plug-In

Region Plug-In for a slideover which can be opened and slides on left or right.

Features:

- Directions right and left
- Full width on phones
- No animations for reduced motion settings
- Stylable

Internet Explorer is not supported!
## How to open a slideover

Dynamic Action -> Open Region -> Select your region

Or with JavaScript:

```js
apex.region('regionStaticID').open();
apex.region('regionStaticID').close();
```

## Styling

### APEX 21.1

For APEX 21.1 it uses the CSS variables by universal theme. The slideover will fit nicely into your app.

You can still overwrite this with custom CSS. 

### Custom CSS

```css
/* Dark background to draw attention to the slideover */
slide-over::part(lay-over) {
  background-color: rgba(90, 41, 41, 0.6);
}

/* The layover itself */
slide-over::part(slide-over) {
  background-color: #ffffd2;
}

/* Header of the layover */
slide-over::part(slide-header-text) {
  font-weight: 300;
  color: purple;
}

/* Close button */
slide-over::part(close-button) {
  color: purple;
}

/* Set close button focus outline */
slide-over::part(close-button):focus {
  border-color: pink;
}
```
