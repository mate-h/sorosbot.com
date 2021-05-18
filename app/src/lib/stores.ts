import { browser } from "$app/env";
import { writable } from "svelte/store"

export const navItems = [
  {
    name: 'Console',
    path: '/console'
  },
  {
    name: 'Code',
    path: '/console/code'
  },
  {
    name: 'Docker',
    path: '/console/docker'
  },
  {
    name: 'Freqtrade UI',
    path: 'https://freqtrade.sorosbot.com',
    tab: true
  }
]

function persistable(name, def=undefined) {
  let defaultVal = def;
  if (browser) {
    defaultVal = localStorage.getItem(name);
    if (defaultVal) defaultVal = JSON.parse(defaultVal);
  }
  const store = writable(defaultVal);
  store.subscribe(val => {
    if (val) localStorage.setItem(name, JSON.stringify(val));
  });
  return store;
}

export const user = persistable('user');