import axios from "axios";

export function platforms() {
  return axios.get("/api/platforms")
}

export function listAccount() {
  return axios.get("/api/account/all")
}

export function addAccount(account) {
  return axios.post("/api/account", account)
}

export function deleteAccount(id) {
  return axios.delete("/api/account/"+id);
}
