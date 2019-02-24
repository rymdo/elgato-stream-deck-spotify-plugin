import React from 'react';
import ReactDOM from 'react-dom';
import { StreamDeckInterface } from './js/libs/streamdeck/streamdeck';
import { INTERFACE_TYPE_PROPERY_INSPECTOR } from './js/libs/streamdeck/defines';

export let propertyInspectorInterface = null;

global.connectSocket = (
  inPort,
  inPropertyInspectorUUID,
  inRegisterEvent,
  inInfo,
  inActionInfo
) => {
  console.log('(PROPERY_INSPECTOR) connectSocket');
  let newPropertyInspectorInterface = new StreamDeckInterface({
    interfaceType: INTERFACE_TYPE_PROPERY_INSPECTOR,
    port: inPort,
    uuid: inPropertyInspectorUUID,
    registerEvent: inRegisterEvent,
    info: inInfo,
    actionInfo: inActionInfo,
  });
  newPropertyInspectorInterface
    .connect()
    .then(() => {
      console.log('(PROPERY_INSPECTOR) StreamDeckInterface connect success.');
      propertyInspectorInterface = newPropertyInspectorInterface;
    })
    .catch(error => {
      console.error(error);
      propertyInspectorInterface = null;
    });
};

ReactDOM.render(
  <div>se.rymdo.streamdeck.plugin.spotify.pi</div>,
  document.getElementById('app_pi')
);

module.hot.accept();
