// For testing

import { handleError, handleResponse } from "./apiUtils";

export async function getMyTechnologies() {
  return new Promise<any>((resolve, reject) => {
    const data = require("./test-data/GetMyTechnologies.json");
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

export async function getUserDetails() {
  return new Promise<any>((resolve, reject) => {
    const data = require("./test-data/GetUserDetails.json");
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

export async function getTechnologyList() {
  return new Promise<any>((resolve, reject) => {
    const data = require("./test-data/GetTechnologyViewInfo.json");
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

export async function getGroupsAndViews() {
  return new Promise<any>((resolve, reject) => {
    const data = require("./test-data/GetGroupAndViewInfo.json");
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

export async function getSolutionFiltersAndBrowseByRoles() {
  return new Promise<any>((resolve, reject) => {
    const data = require("./test-data/GetSolutionListMetadata.json");
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

export async function getFavouriteSearchList() {
  return new Promise<any>((resolve, reject) => {
    const data = require("./test-data/GetFavSearchList.json");
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

// Actual api's

export async function getTechnologyListDetails(group: string, view: string) {
  return fetch(
    "https://localhost:3000/api/TechnologyView/GetTechnologyViewInfo?groupName=" +
      group +
      "&viewName=" +
      view,
    {
      method: "GET",
      redirect: "follow",
    }
  )
    .then(handleResponse)
    .catch(handleError);
}
