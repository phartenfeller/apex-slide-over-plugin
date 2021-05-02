/* global apex */

// create the webcomponent as a child of the regionid
// and move the existing rest into it as a slot
const initAPEXRegion = ({ regionId, title, width, direction }) => {
  console.log({ regionId, title, width });
  try {
    const region = document.querySelector(`#${regionId}`);
    const { parentNode } = region;
    region.slot = 'content';

    const regionClone = region.cloneNode(true);
    parentNode.removeChild(region);

    const ele = document.createElement('slide-over');
    ele.header = title;
    ele.open = 'false';
    ele.width = width;
    ele.direction = direction;
    ele.appendChild(regionClone);

    parentNode.appendChild(ele);
  } catch (e) {
    console.error(`Cannot setup Slideover Plug-In\n${e}`);
  }

  apex.region.create(regionId, {
    type: 'Slideover',
    open() {
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
