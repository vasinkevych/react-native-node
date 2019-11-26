import auth from '../services/Auth';
import { getBaseUrl } from '../utils';

export async function fetchTableData(query) {
  try {
    const token = auth.getIdToken();

    const response = await fetch(
      `${getBaseUrl()}/admin/api/execute-sql?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

export const filterTable = (tableData, pattern) => {
  if (!pattern) return tableData;
  if (tableData.length === 0) return tableData;

  const reg = new RegExp(`${pattern}`, 'gi');

  return tableData.reduce((acc, dataItem) => {
    const values = getValues({ ...dataItem, id: '', __typename: '' }).join('');
    console.log(values);
    if (reg.test(values)) {
      acc.push(dataItem);
    }
    return acc;
  }, []);
};

function getValues(targetObj) {
  let result = [];
  const tempObj = Object.assign({}, targetObj);
  Object.keys(tempObj).forEach(key => {
    if (Array.isArray(tempObj[key])) {
      result = result.concat(
        tempObj[key].reduce((acc, item) => {
          acc = acc.concat(getValues(item));
          return acc;
        }, [])
      );
    } else if (tempObj[key] instanceof Object) {
      result = result.concat(getValues(tempObj[key]));
    } else {
      result.push(tempObj[key]);
    }
  });
  return result;
}
