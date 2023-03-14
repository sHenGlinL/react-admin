import request from "@/utils/request"

export function getUserMenu() {
  return request({
    url: "./mock/menu.json",
    method: "get"
  });
}