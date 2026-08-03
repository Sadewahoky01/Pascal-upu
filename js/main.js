// main.js - Main Application Controller

import { initPABForm } from './pab.js';
import { initShop } from './shop.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("🌲 MAPALA PASCAL UPU - App Loaded Successfully");
    initPABForm();
    initShop();
});
