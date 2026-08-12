const fs = require('fs');

// We'll mock localStorage to test lib/db.ts logic
global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {}
};

const store = {};
global.localStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, val) => { store[key] = val; },
  removeItem: (key) => { delete store[key]; }
};

// We can just simulate the unshift bug here.
const fallback = [ { id: 'w-1' } ];

function getItem(key) {
  const raw = localStorage.getItem(`gendeng_db_${key}`) || localStorage.getItem(`gendeng_cms_${key}`);
  return raw ? JSON.parse(raw) : fallback;
}

function setItem(key, value) {
  localStorage.setItem(`gendeng_db_${key}`, JSON.stringify(value));
  localStorage.setItem(`gendeng_cms_${key}`, JSON.stringify(value));
}

function saveWargaDB(item) {
  const list = getItem("warga");
  let record;
  if (item.id) {
    // update
  } else {
    record = { ...item, id: `w-999` };
    list.unshift(record);
  }
  setItem("warga", list);
  return record;
}

function deleteWargaDB(id) {
  const list = getItem("warga").filter(w => w.id !== id);
  setItem("warga", list);
}

// simulate delete
console.log("Before delete:", store);
deleteWargaDB('w-1');
console.log("After delete:", store);

// simulate create
try {
  saveWargaDB({ title: 'kkn uii' });
  console.log("After add:", store);
} catch (e) {
  console.error("ADD FAILED:", e.message);
}
