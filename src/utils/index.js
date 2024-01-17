// eslint-disable-next-line no-undef
// const address = require("rwanda");
import * as address from 'rwanda'


export const allProvinces = async () => {
  const provinces = address.Provinces();
  return provinces.map((pr) => ({ label: pr, value: pr }));
};
export const getAllDistricts = async (province) => {
  if (address.Districts(province)) {
    const districts = address.Districts(province);
    return districts.map((dist) => ({ label: dist, value: dist }));
  }
  return [];
};
export const getAllSectors = async (province, district) => {
  if (address.Sectors(province, district)) {
    const sectors = address.Sectors(province, district);
    return sectors.map((sec) => ({ label: sec, value: sec }));
  }
  return [];
};
export const getAllCells = async (province, district, sector) => {
  if (address.Cells(province, district, sector)) {
    const cells = address.Cells(province, district, sector);
    return cells.map((cell) => ({ label: cell, value: cell }));
  }
  return [];
};
export const getAllVillages = async (province, district, sector, cell) => {
  if (address.Villages(province, district, sector, cell)) {
    const villages = address.Villages(province, district, sector, cell);
    return villages.map((village) => ({ label: village, value: village }));
  }
  return [];
};