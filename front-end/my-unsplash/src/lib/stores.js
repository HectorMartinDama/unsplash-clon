import { writable } from "svelte/store";

export const user = writable({ email: ''});
export const isLoggedIn = writable(false);