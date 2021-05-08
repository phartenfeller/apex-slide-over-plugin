/* global apex */

// create the webcomponent as a child of the regionid
// and move the existing rest into it as a slot
const initAPEXRegion = ({ regionId, title, width, direction }) => {
  let mustResize = true;
  console.log({ regionId, title, width });
  try {
    const region = document.querySelector(`#${regionId}`);
    const { parentNode } = region;

    // add slot attribute to use inside slideover web component
    region.slot = 'content';

    // create web component instance
    const ele = document.createElement('slide-over');
    ele.header = title;
    ele.open = 'false';
    ele.width = width;
    ele.direction = direction;
    ele.appendChild(region);

    // move slotted apex plug-in region inside the web component
    parentNode.appendChild(ele);
  } catch (e) {
    console.error(`Cannot setup Slideover Plug-In\n${e}`);
  }

  // resize interactive grids that otherwise look out of place
  const resize = () => {
    document
      // find all subregions of the slideover
      .querySelectorAll(`#${regionId} div[role="region"]`)
      .forEach((e) => {
        const { id } = e;
        try {
          const subregion = apex.region(id);
          if (typeof subregion.call !== 'undefined') {
            subregion.call('resize');
          }
        } catch (_) {
          // do nothing when region does not support resize
        }
      });
  };

  apex.jQuery(window).on('apexwindowresized', () => {
    mustResize = true;
  });

  apex.region.create(regionId, {
    type: 'Slideover',
    open() {
      if (mustResize) {
        resize();
        mustResize = false;
      }
      // set property "open" of web component
      document.querySelector(`#${regionId}`).closest('slide-over').open =
        'true';
    },
    close() {
      document.querySelector(`#${regionId}`).closest('slide-over').open =
        'false';
    },
    // needed for check if region can be opened / closed
    widgetFullName: 'Slideover-Widget',
  });
};

if (!window.hartenfeller_dev) window.hartenfeller_dev = {};
if (!window.hartenfeller_dev.slideover_plugin)
  window.hartenfeller_dev.slideover_plugin = {};

window.hartenfeller_dev.slideover_plugin.initAPEXRegion = initAPEXRegion;
